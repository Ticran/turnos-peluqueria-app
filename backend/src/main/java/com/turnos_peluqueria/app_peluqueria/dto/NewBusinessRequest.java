package com.turnos_peluqueria.app_peluqueria.dto;

// Alta de un negocio desde el panel de la plataforma: el local, su primera sucursal y su administrador
public record NewBusinessRequest(
        BusinessDTO business,
        String branchName,
        String adminName,
        String adminEmail,
        String adminPassword) {
}
