package com.turnos_peluqueria.app_peluqueria.dto;

import lombok.Data;

@Data
public class BranchDTO {
    private Long id;
    private String name;
    private String address;
    private String phone;
    private Long businessId;
}