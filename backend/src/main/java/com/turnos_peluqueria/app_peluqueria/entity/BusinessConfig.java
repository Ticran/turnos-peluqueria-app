package com.turnos_peluqueria.app_peluqueria.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;

@Entity
@Table(name = "business_config")
@Data
@NoArgsConstructor
public class BusinessConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean estaAbierto;
    private LocalTime horarioApertura;
    private LocalTime horarioCierre;
}