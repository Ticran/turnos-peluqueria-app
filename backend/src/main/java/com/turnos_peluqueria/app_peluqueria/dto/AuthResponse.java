package com.turnos_peluqueria.app_peluqueria.dto;

public record AuthResponse(
        String token,
        Long userId,
        String name,
        String email,
        String role,
        Long businessId,
        Long branchId) {
}