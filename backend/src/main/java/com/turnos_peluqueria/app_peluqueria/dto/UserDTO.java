package com.turnos_peluqueria.app_peluqueria.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.turnos_peluqueria.app_peluqueria.entity.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    // Solo se recibe (al crear o cambiar contraseña); nunca se devuelve al frontend
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String specialty;
    private Role role;
    private Long businessId;
    private Long branchId;
    private String photoUrl;
}
