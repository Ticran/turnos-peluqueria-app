package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {

    // Esencial para validar si un negocio ya está registrado y para el Login
    Optional<Business> findByEmail(String email);
}