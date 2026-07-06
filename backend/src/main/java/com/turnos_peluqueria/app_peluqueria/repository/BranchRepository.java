package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

    // Devuelve todas las sucursales de un negocio específico
    List<Branch> findByBusinessId(Long businessId);

    // Busca una sucursal validando su negocio
    Optional<Branch> findByBusinessIdAndId(Long businessId, Long branchId);
}