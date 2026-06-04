package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByBusinessId(Long businessId);

    // NUEVO: Trae solo los empleados activos de un local (ignora los dados de baja)
    List<User> findByBusinessIdAndIsActiveTrue(Long businessId);

    // NUEVO: Busca un empleado específico asegurándose de que pertenezca a ese
    // negocio
    Optional<User> findByBusinessIdAndId(Long businessId, Long id);
}