package com.turnos_peluqueria.app_peluqueria.dto;

import java.time.LocalTime;

// Franja semanal de atención. dayOfWeek ISO: 1 = lunes ... 7 = domingo
public record ScheduleDTO(Integer dayOfWeek, LocalTime startTime, LocalTime endTime) {
}
