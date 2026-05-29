package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.AppointmentDTO;
import com.turnos_peluqueria.app_peluqueria.entity.*;
import com.turnos_peluqueria.app_peluqueria.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // 1. CREAR UN TURNO (Flujo de reserva pública o desde panel)
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));
        User employee = userRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        Appointment appointment = new Appointment();
        appointment.setClientName(dto.getClientName());
        appointment.setClientPhone(dto.getClientPhone());
        appointment.setClientEmail(dto.getClientEmail());
        appointment.setDate(dto.getDate());
        appointment.setTime(dto.getTime());
        appointment.setObservations(dto.getObservations());
        
        // Estado inicial por defecto
        appointment.setStatus(dto.getStatus() != null ? dto.getStatus() : AppointmentStatus.PENDING);
        
        // Vinculamos los objetos de la base de datos
        appointment.setBusiness(business);
        appointment.setEmployee(employee);
        appointment.setService(service);

        Appointment saved = appointmentRepository.save(appointment);
        
        // Devolvemos el DTO completo
        dto.setId(saved.getId());
        return dto;
    }

    // 2. OBTENER TURNOS DE UN EMPLEADO ESPECÍFICO (Para la vista "MyAgenda.jsx" con privacidad)
    public List<AppointmentDTO> getAppointmentsByEmployee(Long employeeId) {
        List<Appointment> appointments = appointmentRepository.findByEmployeeId(employeeId);
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
            
            // Agregamos strings útiles para que el frontend los dibuje directo
            dto.setEmployeeName(app.getEmployee().getName());
            dto.setServiceName(app.getService().getName());
            dto.setServicePrice(app.getService().getPrice());

            dtos.add(dto);
        }
        return dtos;
    }

    // 3. ACTUALIZAR ESTADO U OBSERVACIONES (Para cuando cambian a CONFIRMED, CANCELLED, etc.)
    public AppointmentDTO updateStatusAndObservations(Long appointmentId, AppointmentStatus newStatus, String newObservations) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

        if (newStatus != null) {
            appointment.setStatus(newStatus);
        }
        if (newObservations != null) {
            appointment.setObservations(newObservations);
        }

        Appointment updated = appointmentRepository.save(appointment);
        
        // Preparamos respuesta básica estructurada
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(updated.getId());
        dto.setStatus(updated.getStatus());
        dto.setObservations(updated.getObservations());
        return dto;
    }
}