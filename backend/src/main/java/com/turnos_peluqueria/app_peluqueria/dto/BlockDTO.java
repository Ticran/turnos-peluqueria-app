package com.turnos_peluqueria.app_peluqueria.dto;

import java.time.LocalDateTime;

// Bloqueo de agenda. employeeId null = todo el local (feriado, cierre)
public record BlockDTO(Long id, Long employeeId, LocalDateTime startAt, LocalDateTime endAt, String reason) {
}
