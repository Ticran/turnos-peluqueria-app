package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.AppointmentDTO;
import com.turnos_peluqueria.app_peluqueria.entity.*;
import com.turnos_peluqueria.app_peluqueria.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentService {

    // ponytail: grilla fija de 30 min; volverla configurable por negocio si algún local la necesita distinta
    static final int SLOT_MINUTES = 30;

    private final AppointmentRepository appointmentRepository;
    private final BusinessRepository businessRepository;
    private final BranchRepository branchRepository;
    private final UserRepository userRepository;
    private final ServiceEntityRepository serviceRepository;
    private final ScheduleService scheduleService;
    private final EmailService emailService;

    // confirmedByStaff: lo carga el propio local (panel), así que nace confirmado
    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO dto, boolean confirmedByStaff) {
        if (dto.getBusinessId() == null || dto.getBranchId() == null || dto.getEmployeeId() == null
                || dto.getServiceId() == null || dto.getDate() == null || dto.getTime() == null
                || isBlank(dto.getClientName()) || isBlank(dto.getClientPhone())) {
            throw new IllegalArgumentException("Faltan datos: sucursal, profesional, servicio, fecha, hora, nombre y teléfono son obligatorios.");
        }

        Business business = businessRepository.findById(dto.getBusinessId())
                .filter(Business::isActive)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));

        Branch branch = branchRepository.findByBusinessIdAndId(dto.getBusinessId(), dto.getBranchId())
                .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada"));

        // Bloquea la fila del empleado hasta el fin de la transacción (ver UserRepository.findForUpdate)
        User employee = userRepository.findForUpdate(dto.getBusinessId(), dto.getEmployeeId())
                .filter(User::getIsActive)
                .orElseThrow(() -> new IllegalArgumentException("Profesional no encontrado"));

        ServiceEntity service = serviceRepository.findByBusinessIdAndId(dto.getBusinessId(), dto.getServiceId())
                .filter(ServiceEntity::getActive)
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));

        LocalTime start = dto.getTime();
        LocalTime end = start.plusMinutes(service.getDurationInMinutes());

        if (LocalDateTime.of(dto.getDate(), start).isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("No se puede reservar un turno en el pasado.");
        }
        List<LocalTime[]> ranges = scheduleService.workRanges(business, employee.getId(), dto.getDate());
        if (ranges.isEmpty()) {
            throw new IllegalArgumentException(business.isClosedOn(dto.getDate().getDayOfWeek())
                    ? "El local está cerrado ese día." : employee.getName() + " no atiende ese día.");
        }
        if (end.isBefore(start) || !fitsInRanges(ranges, start, end)) {
            throw new IllegalArgumentException(employee.getName() + " no atiende en ese horario.");
        }
        if (overlaps(busyIntervals(business.getId(), employee.getId(), dto.getDate()), start, end)) {
            throw new IllegalStateException("Ese horario ya no está disponible para " + employee.getName() + ".");
        }

        Appointment appointment = new Appointment();
        appointment.setClientName(dto.getClientName().trim());
        appointment.setClientPhone(dto.getClientPhone().trim());
        appointment.setClientEmail(isBlank(dto.getClientEmail()) ? null : dto.getClientEmail().trim());
        appointment.setDate(dto.getDate());
        appointment.setTime(start);
        appointment.setObservations(dto.getObservations());
        appointment.setBusiness(business);
        appointment.setBranch(branch);
        appointment.setEmployee(employee);
        appointment.setService(service);
        if (confirmedByStaff) {
            appointment.setStatus(AppointmentStatus.CONFIRMED);
        }

        Appointment saved = appointmentRepository.save(appointment);
        if (confirmedByStaff) {
            emailService.bookingConfirmed(saved);
        } else {
            emailService.bookingReceived(saved);
        }
        return toPublicDto(saved);
    }

    // Horarios de inicio libres para un profesional y servicio en un día ("09:00", "09:30", ...)
    @Transactional(readOnly = true)
    public List<String> getAvailability(Long businessId, Long employeeId, Long serviceId, LocalDate date) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));
        ServiceEntity service = serviceRepository.findByBusinessIdAndId(businessId, serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));

        LocalDate today = LocalDate.now();
        if (date.isBefore(today) || !business.isActive()) {
            return List.of();
        }
        LocalTime notBefore = date.equals(today) ? LocalTime.now() : null;

        return freeSlots(scheduleService.workRanges(business, employeeId, date), service.getDurationInMinutes(),
                busyIntervals(businessId, employeeId, date), notBefore)
                .stream().map(LocalTime::toString).toList();
    }

    // Turnos de un rango de fechas. employeeId == null trae los de todo el negocio
    @Transactional(readOnly = true)
    public List<AppointmentDTO> getAppointments(Long businessId, LocalDate from, LocalDate to, Long employeeId) {
        List<Appointment> appointments = employeeId == null
                ? appointmentRepository.findByBusinessIdAndDateBetweenOrderByDateAscTimeAsc(businessId, from, to)
                : appointmentRepository.findByBusinessIdAndEmployeeIdAndDateBetweenOrderByDateAscTimeAsc(businessId, employeeId, from, to);
        return appointments.stream().map(this::toDto).toList();
    }

    // Cambia estado y/o observaciones. onlyEmployeeId != null limita a turnos propios (rol EMPLOYEE)
    @Transactional
    public AppointmentDTO updateAppointment(Long businessId, Long appointmentId, AppointmentStatus newStatus,
            String observations, Long onlyEmployeeId) {
        Appointment appointment = appointmentRepository.findByBusinessIdAndId(businessId, appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Turno no encontrado"));

        if (onlyEmployeeId != null && !appointment.getEmployee().getId().equals(onlyEmployeeId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo podés modificar tus propios turnos.");
        }

        AppointmentStatus oldStatus = appointment.getStatus();
        // Reactivar un turno cancelado puede chocar con otro que se reservó en ese hueco
        if (oldStatus == AppointmentStatus.CANCELLED && newStatus != null && newStatus != AppointmentStatus.CANCELLED) {
            LocalTime start = appointment.getTime();
            LocalTime end = start.plusMinutes(appointment.getService().getDurationInMinutes());
            if (overlaps(busyIntervals(businessId, appointment.getEmployee().getId(), appointment.getDate()), start, end)) {
                throw new IllegalStateException("No se puede reactivar: el horario ya fue ocupado por otro turno.");
            }
        }

        if (newStatus != null) {
            appointment.setStatus(newStatus);
        }
        if (observations != null) {
            appointment.setObservations(observations);
        }
        appointment.setUpdatedAt(OffsetDateTime.now());

        if (newStatus != oldStatus && newStatus == AppointmentStatus.CONFIRMED) {
            emailService.bookingConfirmed(appointment);
        } else if (newStatus != oldStatus && newStatus == AppointmentStatus.CANCELLED) {
            emailService.bookingCancelledByBusiness(appointment);
        }
        return toDto(appointment);
    }

    // Página pública del turno: el cliente entra con el link que recibió al reservar
    @Transactional(readOnly = true)
    public AppointmentDTO getByToken(UUID token) {
        return toPublicDto(findByToken(token));
    }

    @Transactional
    public AppointmentDTO cancelByToken(UUID token) {
        Appointment appointment = findByToken(token);
        if (appointment.getStatus() != AppointmentStatus.PENDING && appointment.getStatus() != AppointmentStatus.CONFIRMED) {
            throw new IllegalStateException("Este turno ya no se puede cancelar.");
        }
        // ponytail: se puede cancelar hasta la hora del turno; sumar un mínimo de horas de anticipación si el local lo pide
        if (LocalDateTime.of(appointment.getDate(), appointment.getTime()).isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("El turno ya pasó.");
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointment.setUpdatedAt(OffsetDateTime.now());
        emailService.cancelledByClient(appointment);
        return toPublicDto(appointment);
    }

    // Cada hora: recordatorio por email de los turnos confirmados que empiezan en las próximas 24 hs
    @Scheduled(cron = "${app.reminder-cron:0 0 * * * *}")
    @Transactional
    public void sendReminders() {
        if (!emailService.isEnabled()) {
            return;
        }
        LocalDateTime now = LocalDateTime.now();
        List<Appointment> candidates = appointmentRepository
                .findByStatusAndReminderSentAtIsNullAndClientEmailIsNotNullAndDateBetween(
                        AppointmentStatus.CONFIRMED, now.toLocalDate(), now.toLocalDate().plusDays(1));
        for (Appointment a : candidates) {
            LocalDateTime start = LocalDateTime.of(a.getDate(), a.getTime());
            if (start.isAfter(now) && !start.isAfter(now.plusHours(24))) {
                emailService.reminder(a);
                a.setReminderSentAt(OffsetDateTime.now());
            }
        }
        log.info("Recordatorios revisados: {} candidatos", candidates.size());
    }

    private Appointment findByToken(UUID token) {
        return appointmentRepository.findByCancelToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turno no encontrado"));
    }

    // Ocupado = turnos no cancelados + bloqueos (del empleado o de todo el local)
    private List<LocalTime[]> busyIntervals(Long businessId, Long employeeId, LocalDate date) {
        List<LocalTime[]> busy = new ArrayList<>(scheduleService.blockedIntervals(businessId, employeeId, date));
        for (Appointment a : appointmentRepository.findByBusinessIdAndEmployeeIdAndDate(businessId, employeeId, date)) {
            if (a.getStatus() != AppointmentStatus.CANCELLED) {
                busy.add(new LocalTime[] { a.getTime(), a.getTime().plusMinutes(a.getService().getDurationInMinutes()) });
            }
        }
        return busy;
    }

    static boolean overlaps(List<LocalTime[]> busy, LocalTime start, LocalTime end) {
        for (LocalTime[] b : busy) {
            if (start.isBefore(b[1]) && end.isAfter(b[0])) {
                return true;
            }
        }
        return false;
    }

    static boolean fitsInRanges(List<LocalTime[]> ranges, LocalTime start, LocalTime end) {
        for (LocalTime[] r : ranges) {
            if (!start.isBefore(r[0]) && !end.isAfter(r[1])) {
                return true;
            }
        }
        return false;
    }

    // Recorre cada franja de atención cada SLOT_MINUTES y se queda con los inicios donde entra el servicio completo
    static List<LocalTime> freeSlots(List<LocalTime[]> ranges, int durationMinutes, List<LocalTime[]> busy,
            LocalTime notBefore) {
        List<LocalTime> free = new ArrayList<>();
        for (LocalTime[] range : ranges) {
            int closeMinute = range[1].toSecondOfDay() / 60;
            // Se itera en minutos (int) y no con LocalTime para no dar la vuelta a la medianoche
            for (int m = range[0].toSecondOfDay() / 60; m + durationMinutes <= closeMinute; m += SLOT_MINUTES) {
                LocalTime start = LocalTime.ofSecondOfDay(m * 60L);
                if (notBefore != null && start.isBefore(notBefore)) {
                    continue;
                }
                if (!overlaps(busy, start, start.plusMinutes(durationMinutes))) {
                    free.add(start);
                }
            }
        }
        return free;
    }

    private AppointmentDTO toDto(Appointment app) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(app.getId());
        dto.setClientName(app.getClientName());
        dto.setClientPhone(app.getClientPhone());
        dto.setClientEmail(app.getClientEmail());
        dto.setDate(app.getDate());
        dto.setTime(app.getTime());
        dto.setStatus(app.getStatus());
        dto.setObservations(app.getObservations());
        dto.setBusinessId(app.getBusiness().getId());
        dto.setBranchId(app.getBranch() != null ? app.getBranch().getId() : null);
        dto.setEmployeeId(app.getEmployee().getId());
        dto.setEmployeeName(app.getEmployee().getName());
        dto.setServiceId(app.getService().getId());
        dto.setServiceName(app.getService().getName());
        dto.setServicePrice(app.getService().getPrice());
        dto.setServiceDuration(app.getService().getDurationInMinutes());
        return dto;
    }

    // Para el cliente: suma el link de cancelación y los datos del local, sin observaciones internas
    private AppointmentDTO toPublicDto(Appointment app) {
        AppointmentDTO dto = toDto(app);
        dto.setObservations(null);
        dto.setCancelToken(app.getCancelToken());
        dto.setBusinessName(app.getBusiness().getName());
        dto.setBusinessSlug(app.getBusiness().getSlug());
        dto.setBusinessPhone(app.getBranch() != null && app.getBranch().getPhone() != null
                ? app.getBranch().getPhone() : app.getBusiness().getPhone());
        dto.setAddress(app.getBranch() != null && app.getBranch().getAddress() != null
                ? app.getBranch().getAddress() : app.getBusiness().getAddress());
        return dto;
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
