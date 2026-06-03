package com.turnos_peluqueria.app_peluqueria.dto;

import lombok.Data;

@Data
public class ServiceDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Double price;
    private Integer durationInMinutes;
    private Boolean active;
    private Long businessId; // Solo el ID del negocio para no complicar el JSON
}