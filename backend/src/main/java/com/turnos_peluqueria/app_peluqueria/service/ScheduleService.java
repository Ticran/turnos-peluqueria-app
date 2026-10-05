package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.BlockDTO;
import com.turnos_peluqueria.app_peluqueria.dto.ScheduleDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.EmployeeSchedule;
import com.turnos_peluqueria.app_peluqueria.entity.TimeBlock;
import com.turnos_peluqueria.app_peluqueria.repository.EmployeeScheduleRepository;
import com.turnos_peluqueria.app_peluqueria.repository.TimeBlockRepository;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// Horarios semanales por empleado y bloqueos (vacaciones, descansos, feriados del local)
@Service
@RequiredArgsConstructor
public class ScheduleService {

    private static final LocalDateTime FAR_FUTURE = LocalDateTime.of(9999, 1, 1, 0, 0);

    private final EmployeeScheduleRepository scheduleRepository;
    private final TimeBlockRepository blockRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ScheduleDTO> getSchedule(Long businessId, Long employeeId) {
        return scheduleRepository.findByBusinessIdAndUserIdOrderByDayOfWeekAscStartTimeAsc(businessId, employeeId)
                .stream().map(s -> new ScheduleDTO((int) s.getDayOfWeek(), s.getStartTime(), s.getEndTime())).toList();
    }

    // Reemplaza todo el horario semanal. Lista vacía = vuelve a usar el horario del local
    @Transactional
    public List<ScheduleDTO> replaceSchedule(Long businessId, Long employeeId, List<ScheduleDTO> ranges) {
        requireEmployee(businessId, employeeId);
        List<ScheduleDTO> sorted = new ArrayList<>(ranges);
        sorted.sort(Comparator.comparing(ScheduleDTO::dayOfWeek).thenComparing(ScheduleDTO::startTime));
        for (int i = 0; i < sorted.size(); i++) {
            ScheduleDTO r = sorted.get(i);
            if (r.dayOfWeek() == null || r.dayOfWeek() < 1 || r.dayOfWeek() > 7 || r.startTime() == null
                    || r.endTime() == null || !r.startTime().isBefore(r.endTime())) {
                throw new IllegalArgumentException("Cada franja necesita un día y una hora de inicio anterior a la de fin.");
            }
            ScheduleDTO prev = i > 0 ? sorted.get(i - 1) : null;
            if (prev != null && prev.dayOfWeek().equals(r.dayOfWeek()) && r.startTime().isBefore(prev.endTime())) {
                throw new IllegalArgumentException("Hay franjas que se superponen el mismo día.");
            }
        }

        scheduleRepository.deleteByBusinessIdAndUserId(businessId, employeeId);
        scheduleRepository.flush();
        for (ScheduleDTO r : sorted) {
            EmployeeSchedule s = new EmployeeSchedule();
            s.setBusinessId(businessId);
            s.setUserId(employeeId);
            s.setDayOfWeek(r.dayOfWeek().shortValue());
            s.setStartTime(r.startTime());
            s.setEndTime(r.endTime());
            scheduleRepository.save(s);
        }
        return getSchedule(businessId, employeeId);
    }

    // Bloqueos vigentes. employeeId null = solo los del local; con empleado = los suyos + los del local
    @Transactional(readOnly = true)
    public List<BlockDTO> getUpcomingBlocks(Long businessId, Long employeeId) {
        List<TimeBlock> blocks = employeeId == null
                ? blockRepository.findByBusinessIdAndUserIdIsNullAndEndAtAfterOrderByStartAt(businessId, LocalDateTime.now())
                : blockRepository.findOverlapping(businessId, employeeId, LocalDateTime.now(), FAR_FUTURE);
        return blocks.stream().map(ScheduleService::toDto).toList();
    }

    @Transactional
    public BlockDTO createBlock(Long businessId, BlockDTO dto) {
        if (dto.startAt() == null || dto.endAt() == null || !dto.startAt().isBefore(dto.endAt())) {
            throw new IllegalArgumentException("El inicio del bloqueo debe ser anterior al fin.");
        }
        if (dto.employeeId() != null) {
            requireEmployee(businessId, dto.employeeId());
        }
        TimeBlock block = new TimeBlock();
        block.setBusinessId(businessId);
        block.setUserId(dto.employeeId());
        block.setStartAt(dto.startAt());
        block.setEndAt(dto.endAt());
        block.setReason(dto.reason());
        return toDto(blockRepository.save(block));
    }

    // onlyEmployeeId != null: un empleado solo borra sus propios bloqueos (no los del local)
    @Transactional
    public void deleteBlock(Long businessId, Long blockId, Long onlyEmployeeId) {
        TimeBlock block = blockRepository.findByBusinessIdAndId(businessId, blockId)
                .orElseThrow(() -> new IllegalArgumentException("Bloqueo no encontrado"));
        if (onlyEmployeeId != null && !onlyEmployeeId.equals(block.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo podés borrar tus propios bloqueos.");
        }
        blockRepository.delete(block);
    }

    // Franjas en las que atiende el empleado ese día, recortadas al horario del local
    @Transactional(readOnly = true)
    public List<LocalTime[]> workRanges(Business business, Long employeeId, LocalDate date) {
        if (business.isClosedOn(date.getDayOfWeek())) {
            return List.of();
        }
        List<EmployeeSchedule> schedule = scheduleRepository
                .findByBusinessIdAndUserIdOrderByDayOfWeekAscStartTimeAsc(business.getId(), employeeId);
        List<LocalTime[]> ranges = schedule.isEmpty()
                ? List.<LocalTime[]>of(new LocalTime[] { business.getOpeningTime(), business.getClosingTime() })
                : schedule.stream()
                        .filter(s -> s.getDayOfWeek() == date.getDayOfWeek().getValue())
                        .map(s -> new LocalTime[] { s.getStartTime(), s.getEndTime() })
                        .toList();
        return clip(ranges, business.getOpeningTime(), business.getClosingTime());
    }

    // Partes de ese día ocupadas por bloqueos del empleado o del local
    @Transactional(readOnly = true)
    public List<LocalTime[]> blockedIntervals(Long businessId, Long employeeId, LocalDate date) {
        LocalDateTime dayStart = date.atStartOfDay();
        LocalDateTime dayEnd = dayStart.plusDays(1);
        List<LocalTime[]> result = new ArrayList<>();
        for (TimeBlock b : blockRepository.findOverlapping(businessId, employeeId, dayStart, dayEnd)) {
            LocalTime start = b.getStartAt().isAfter(dayStart) ? b.getStartAt().toLocalTime() : LocalTime.MIN;
            LocalTime end = b.getEndAt().isBefore(dayEnd) ? b.getEndAt().toLocalTime() : LocalTime.MAX;
            result.add(new LocalTime[] { start, end });
        }
        return result;
    }

    static List<LocalTime[]> clip(List<LocalTime[]> ranges, LocalTime open, LocalTime close) {
        List<LocalTime[]> result = new ArrayList<>();
        for (LocalTime[] r : ranges) {
            LocalTime start = r[0].isBefore(open) ? open : r[0];
            LocalTime end = r[1].isAfter(close) ? close : r[1];
            if (start.isBefore(end)) {
                result.add(new LocalTime[] { start, end });
            }
        }
        return result;
    }

    private void requireEmployee(Long businessId, Long employeeId) {
        userRepository.findByBusinessIdAndId(businessId, employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Profesional no encontrado en este negocio"));
    }

    private static BlockDTO toDto(TimeBlock b) {
        return new BlockDTO(b.getId(), b.getUserId(), b.getStartAt(), b.getEndAt(), b.getReason());
    }
}
