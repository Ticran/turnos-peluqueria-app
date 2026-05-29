package com.turnos_peluqueria.app_peluqueria.dto;

import com.turnos_peluqueria.app_peluqueria.entity.AppointmentStatus;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentDTO {
    private Long id;
    
    // Datos del cliente
    private String clientName;
    private String clientPhone;
    private String clientEmail;
    
    // Fechas y horas (Spring Boot las convierte automáticamente desde texto "YYYY-MM-DD" y "HH:MM")
    private LocalDate date;
    private LocalTime time;
    
    private AppointmentStatus status; // PENDING, CONFIRMED, etc.
    private String observations;      // Notas del empleado

    // IDs para cuando el frontend nos manda datos (Crear o editar)
    private Long businessId;
    private Long employeeId;
    private Long serviceId;

    // Nombres adicionales para cuando le respondemos al frontend (Para que arme las tarjetas visuales)
    private String employeeName;
    private String serviceName;
    private Double servicePrice;
}