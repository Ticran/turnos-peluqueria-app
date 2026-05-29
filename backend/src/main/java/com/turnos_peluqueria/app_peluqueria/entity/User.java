package com.turnos_peluqueria.app_peluqueria.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // Para cuando conectemos el login real

    private String specialty; // Ejemplo: "Corte de Autor", "Coloración"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Relación Multi-tenant: Cada usuario pertenece a un negocio
    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;
}