package com.turnos_peluqueria.app_peluqueria.dto;

import lombok.Data;
import java.util.List;

@Data
public class BusinessDTO {
    private Long id;
    private String name;
    private String slug; // URL pública: /{slug}
    private String description;
    private String email;
    private String phone;
    private String openingTime; // Ej: "09:00"
    private String closingTime; // Ej: "20:00"
    private List<Integer> closedWeekdays; // ISO: 1 = lunes ... 7 = domingo
    private String address;
    private String imageUrl;
    private String status; // ACTIVE | SUSPENDED
    private List<BranchDTO> branches;
}
