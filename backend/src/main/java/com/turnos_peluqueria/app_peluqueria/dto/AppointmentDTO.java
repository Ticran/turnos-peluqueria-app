package com.turnos_peluqueria.app_peluqueria.dto;

import com.turnos_peluqueria.app_peluqueria.entity.AppointmentStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class AppointmentDTO {
    private Long id;
    private String clientName;
    private String clientPhone;
    private String clientEmail;
    private LocalDate date;
    private LocalTime time;
    private AppointmentStatus status;
    private String observations;

    private Long branchId;
    private Long businessId;
    private Long employeeId;
    private Long serviceId;

    // Datos extra útiles para que el Frontend muestre en las tarjetas sin hacer más
    // consultas
    private String employeeName;
    private String serviceName;
    private BigDecimal servicePrice;
    private Integer serviceDuration;

    // Solo en la respuesta de la reserva y en la página pública del turno (/turno/{token})
    private UUID cancelToken;
    private String businessName;
    private String businessSlug;
    private String businessPhone;
    private String address;
}
