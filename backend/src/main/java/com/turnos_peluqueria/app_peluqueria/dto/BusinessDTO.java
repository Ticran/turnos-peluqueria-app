package com.turnos_peluqueria.app_peluqueria.dto;

import lombok.Data;

@Data
public class BusinessDTO {
    private Long id;
    private String name;
    private String description;
    private String email;
    private String phone;
    private String openingTime; // Ej: "09:00"
    private String closingTime; // Ej: "20:00"
    private String address;
    private String imageUrl;
}