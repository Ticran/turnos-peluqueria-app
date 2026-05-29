package com.turnos_peluqueria.app_peluqueria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "businesses")
@Data // Lombok nos genera automáticamente los Getters, Setters y Constructor
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    
    @Column(nullable = false)
    private String email;
    
    private String phone;

    @Column(name = "opening_time")
    private String openingTime; // Ejemplo: "09:00"

    @Column(name = "closing_time")
    private String closingTime; // Ejemplo: "20:00"
}