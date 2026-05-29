package com.turnos_peluqueria.app_peluqueria.dto;

import com.turnos_peluqueria.app_peluqueria.entity.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String specialty;
    private Role role;       // Puede ser ADMIN o EMPLOYEE
    private Long businessId; // Asociado al negocio
}