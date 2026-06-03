package com.turnos_peluqueria.app_peluqueria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "services")
@Data
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    private String category;

    @Column(nullable = false, columnDefinition = "NUMERIC(10,2)")
    private Double price;

    @Column(nullable = false)
    private Integer durationInMinutes; // Ejemplo: 30, 60, 120

    @Column(nullable = false)
    private Boolean active = true;

    // Relación Multi-tenant: Cada servicio pertenece a un negocio específico
    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;
}