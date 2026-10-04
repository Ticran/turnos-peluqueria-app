package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Branch;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.ServiceEntity;
import com.turnos_peluqueria.app_peluqueria.repository.BranchRepository;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import com.turnos_peluqueria.app_peluqueria.repository.ServiceEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceEntityService {

    private final ServiceEntityRepository serviceRepository;
    private final BusinessRepository businessRepository;
    private final BranchRepository branchRepository;

    @Transactional(readOnly = true)
    public List<ServiceDTO> getActiveServices(Long businessId) {
        return serviceRepository.findByBusinessIdAndActiveTrue(businessId).stream().map(this::toDto).toList();
    }

    // Servicios de una sucursal. Los que no tienen sucursal asignada se ofrecen en todas
    @Transactional(readOnly = true)
    public List<ServiceDTO> getActiveServices(Long businessId, Long branchId) {
        return serviceRepository.findByBusinessIdAndActiveTrue(businessId).stream()
                .filter(s -> s.getBranch() == null || s.getBranch().getId().equals(branchId))
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public ServiceDTO createService(Long businessId, ServiceDTO dto) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));

        ServiceEntity entity = new ServiceEntity();
        entity.setBusiness(business);
        entity.setActive(true);
        apply(entity, businessId, dto);
        return toDto(serviceRepository.save(entity));
    }

    @Transactional
    public ServiceDTO updateService(Long businessId, Long id, ServiceDTO dto) {
        ServiceEntity entity = serviceRepository.findByBusinessIdAndId(businessId, id)
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado en este negocio"));
        apply(entity, businessId, dto);
        entity.setUpdatedAt(OffsetDateTime.now());
        return toDto(entity);
    }

    @Transactional
    public void softDeleteService(Long businessId, Long id) {
        ServiceEntity entity = serviceRepository.findByBusinessIdAndId(businessId, id)
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));
        entity.setActive(false);
    }

    // Copia los campos editables validando datos y que la sucursal sea del mismo negocio
    private void apply(ServiceEntity entity, Long businessId, ServiceDTO dto) {
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("El nombre del servicio es obligatorio.");
        }
        if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo.");
        }
        if (dto.getDurationInMinutes() == null || dto.getDurationInMinutes() <= 0) {
            throw new IllegalArgumentException("La duración debe ser mayor a 0 minutos.");
        }
        Branch branch = branchRepository.findByBusinessIdAndId(businessId, dto.getBranchId())
                .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada en este negocio"));

        entity.setName(dto.getName().trim());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setDurationInMinutes(dto.getDurationInMinutes());
        entity.setBranch(branch);
    }

    private ServiceDTO toDto(ServiceEntity entity) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setPrice(entity.getPrice());
        dto.setDurationInMinutes(entity.getDurationInMinutes());
        dto.setActive(entity.getActive());
        dto.setBusinessId(entity.getBusiness().getId());
        dto.setBranchId(entity.getBranch() != null ? entity.getBranch().getId() : null);
        return dto;
    }
}
