package com.turnos_peluqueria.app_peluqueria.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;
import java.time.OffsetDateTime;

@Entity
@Table(name = "businesses")
@Data
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Column(name = "opening_time", nullable = false)
    private LocalTime openingTime;

    @Column(name = "closing_time", nullable = false)
    private LocalTime closingTime;

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    @Column(name = "address")
    private String address;
    @Column(name = "image_url")
    private String imageUrl;
}