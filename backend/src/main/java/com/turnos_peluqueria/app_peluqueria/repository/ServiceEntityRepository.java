package com.turnos_peluqueria.app_peluqueria.repository;

import com.turnos_peluqueria.app_peluqueria.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceEntityRepository extends JpaRepository<ServiceEntity, Long> {

    List<ServiceEntity> findByBusinessId(Long businessId);

    // NUEVO: Trae los servicios activos en el catálogo de la peluquería
    List<ServiceEntity> findByBusinessIdAndActiveTrue(Long businessId);

    // NUEVO: Busca un servicio validando que sea del negocio correcto
    Optional<ServiceEntity> findByBusinessIdAndId(Long businessId, Long id);
}