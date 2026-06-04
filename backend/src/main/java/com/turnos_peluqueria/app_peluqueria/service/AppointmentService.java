package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.AppointmentDTO;
import com.turnos_peluqueria.app_peluqueria.entity.*;
import com.turnos_peluqueria.app_peluqueria.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private BusinessRepository businessRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ServiceEntityRepository serviceRepository;

    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));

        User employee = userRepository.findByBusinessIdAndId(dto.getBusinessId(), dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado en este negocio"));

        ServiceEntity service = serviceRepository.findByBusinessIdAndId(dto.getBusinessId(), dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado en este negocio"));

        // VALIDACIÓN CRÍTICA: Control de solapamiento de horarios
        if (hasOverlap(dto.getBusinessId(), dto.getEmployeeId(), dto.getDate(), dto.getTime(),
                service.getDurationInMinutes())) {
            throw new IllegalStateException(
                    "El empleado no tiene disponibilidad en ese horario. Se superpone con otro turno.");
        }

        Appointment appointment = new Appointment();
        appointment.setClientName(dto.getClientName());
        appointment.setClientPhone(dto.getClientPhone());
        appointment.setClientEmail(dto.getClientEmail());
        appointment.setDate(dto.getDate());
        appointment.setTime(dto.getTime());
        appointment.setObservations(dto.getObservations());
        appointment.setStatus(AppointmentStatus.PENDING);

        appointment.setBusiness(business);
        appointment.setEmployee(employee);
        appointment.setService(service);

        Appointment saved = appointmentRepository.save(appointment);
        dto.setId(saved.getId());
        dto.setStatus(saved.getStatus());
        return dto;
    }

    // Corregido y mejorado: Ahora filtra opcionalmente por fecha para no colapsar
    // la app
    @Transactional(readOnly = true)
    public List<AppointmentDTO> getAppointmentsByEmployeeAndDate(Long businessId, Long employeeId, LocalDate date) {
        List<Appointment> appointments;
        if (date != null) {
            appointments = appointmentRepository.findByBusinessIdAndEmployeeIdAndDate(businessId, employeeId, date);
        } else {
            appointments = appointmentRepository.findByBusinessIdAndEmployeeId(businessId, employeeId);
        }
        return convertToDtoList(appointments);
    }

    // Nuevo: Agenda global diaria del negocio (Esencial para la
    // recepción/administrador)
    @Transactional(readOnly = true)
    public List<AppointmentDTO> getDailyAgenda(Long businessId, LocalDate date) {
        List<Appointment> appointments = appointmentRepository.findByBusinessIdAndDate(businessId, date);
        return convertToDtoList(appointments);
    }

    // Nuevo: Cancelación lógica formal
    @Transactional
    public void cancelAppointment(Long businessId, Long appointmentId) {
        Appointment appointment = appointmentRepository.findByBusinessIdAndId(businessId, appointmentId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    // Nuevo: Finalizar turno (Suma al historial de facturación del empleado)
    @Transactional
    public void completeAppointment(Long businessId, Long appointmentId) {
        Appointment appointment = appointmentRepository.findByBusinessIdAndId(businessId, appointmentId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);
    }

    // Nuevo: Registrar que el cliente no asistió
    @Transactional
    public void registerNoShow(Long businessId, Long appointmentId) {
        Appointment appointment = appointmentRepository.findByBusinessIdAndId(businessId, appointmentId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));
        appointment.setStatus(AppointmentStatus.NO_SHOW);
        appointmentRepository.save(appointment);
    }

    // ALGORITMO: Verifica si el nuevo turno choca con la agenda existente del
    // empleado
    private boolean hasOverlap(Long businessId, Long employeeId, LocalDate date, LocalTime targetStart,
            Integer durationMinutes) {
        List<Appointment> activeAppointments = appointmentRepository
                .findByBusinessIdAndEmployeeIdAndDateAndStatusNot(businessId, employeeId, date,
                        AppointmentStatus.CANCELLED);

        LocalTime targetEnd = targetStart.plusMinutes(durationMinutes);

        for (Appointment existing : activeAppointments) {
            LocalTime existingStart = existing.getTime();
            LocalTime existingEnd = existingStart.plusMinutes(existing.getService().getDurationInMinutes());

            // Si los rangos de tiempo se interceptan
            if (targetStart.isBefore(existingEnd) && targetEnd.isAfter(existingStart)) {
                return true;
            }
        }
        return false;
    }

    private List<AppointmentDTO> convertToDtoList(List<Appointment> appointments) {
        List<AppointmentDTO> dtos = new ArrayList<>();
        for (Appointment app : appointments) {
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
            dto.setEmployeeId(app.getEmployee().getId());
            dto.setServiceId(app.getService().getId());
            dto.setEmployeeName(app.getEmployee().getName());
            dto.setServiceName(app.getService().getName());
            dto.setServicePrice(app.getService().getPrice());
            dtos.add(dto);
        }
        return dtos;
    }
}