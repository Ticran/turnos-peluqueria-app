package com.turnos_peluqueria.app_peluqueria.dto;

import com.turnos_peluqueria.app_peluqueria.entity.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password; // Solo se usa al crear, no se devuelve al frontend
    private String specialty;
    private Role role;
    private Long businessId;
}