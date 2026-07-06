package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Branch;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.ServiceEntity;
import com.turnos_peluqueria.app_peluqueria.repository.BranchRepository;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import com.turnos_peluqueria.app_peluqueria.repository.ServiceEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceEntityService {

    @Autowired
    private ServiceEntityRepository serviceRepository;

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Transactional(readOnly = true)
    public List<ServiceDTO> getActiveServices(Long businessId) {

        List<ServiceEntity> entities = serviceRepository.findByBusinessIdAndActiveTrue(businessId);
        List<ServiceDTO> dtos = new ArrayList<>();

        for (ServiceEntity entity : entities) {

            ServiceDTO dto = new ServiceDTO();

            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setCategory(entity.getCategory());
            dto.setPrice(entity.getPrice());
            dto.setDurationInMinutes(entity.getDurationInMinutes());
            dto.setActive(entity.getActive());
            dto.setBusinessId(entity.getBusiness().getId());
            dto.setBranchId(entity.getBranch().getId());

            dtos.add(dto);
        }

        return dtos;
    }

    @Transactional
    public ServiceDTO createService(ServiceDTO dto) {

        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));

        Branch branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        // Validar que la sucursal pertenezca al negocio
        if (!branch.getBusiness().getId().equals(business.getId())) {
            throw new RuntimeException("La sucursal no pertenece al negocio");
        }

        ServiceEntity entity = new ServiceEntity();

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setDurationInMinutes(dto.getDurationInMinutes());
        entity.setActive(true);
        entity.setBusiness(business);
        entity.setBranch(branch);

        ServiceEntity saved = serviceRepository.save(entity);

        dto.setId(saved.getId());

        return dto;
    }

    @Transactional
    public ServiceDTO updateService(Long businessId, Long id, ServiceDTO dto) {

        ServiceEntity entity = serviceRepository.findByBusinessIdAndId(businessId, id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado en este negocio"));

        Branch branch = branchRepository.findById(dto.getBranchId())
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada"));

        if (!branch.getBusiness().getId().equals(businessId)) {
            throw new RuntimeException("La sucursal no pertenece al negocio");
        }

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setDurationInMinutes(dto.getDurationInMinutes());
        entity.setBranch(branch);

        ServiceEntity saved = serviceRepository.save(entity);

        dto.setId(saved.getId());

        return dto;
    }

    @Transactional
    public void softDeleteService(Long businessId, Long id) {

        ServiceEntity entity = serviceRepository.findByBusinessIdAndId(businessId, id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        entity.setActive(false);

        serviceRepository.save(entity);
    }
}