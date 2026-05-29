package com.turnos_peluqueria.app_peluqueria.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
@Data // Esta anotación de Lombok crea mágicamente los getters y setters (como .getClientName, .setDate, etc.)
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- DATOS DEL CLIENTE (Como no tienen cuenta, van directo en el turno) ---
    @Column(nullable = false)
    private String clientName;

    @Column(nullable = false)
    private String clientPhone;

    private String clientEmail;

    // --- DATOS DEL TURNO ---
    @Column(nullable = false)
    private LocalDate date; // Fecha del turno (Año-Mes-Día)

    @Column(nullable = false)
    private LocalTime time; // Hora del turno (Hora:Minutos)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.PENDING; // Arranca como PENDING (Pendiente)

    private String observations; // Notas o comentarios que deje el peluquero/barbero

    // --- RELACIONES (Las uniones con las otras tablas) ---
    
    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    private Business business; // Multi-tenant: A qué peluquería pertenece este turno

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User employee; // Qué profesional atiende al cliente

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceEntity service; // Qué servicio se va a realizar (Corte, barba, etc.)
}