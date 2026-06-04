package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.ServiceEntity;
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
            dtos.add(dto);
        }
        return dtos;
    }

    @Transactional
    public ServiceDTO createService(ServiceDTO dto) {
        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));

        ServiceEntity entity = new ServiceEntity();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setDurationInMinutes(dto.getDurationInMinutes());
        entity.setActive(true);
        entity.setBusiness(business);

        ServiceEntity saved = serviceRepository.save(entity);
        dto.setId(saved.getId());
        return dto;
    }

    @Transactional
    public ServiceDTO updateService(Long businessId, Long id, ServiceDTO dto) {
        ServiceEntity entity = serviceRepository.findByBusinessIdAndId(businessId, id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado en este negocio"));

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setPrice(dto.getPrice());
        entity.setDurationInMinutes(dto.getDurationInMinutes());

        ServiceEntity saved = serviceRepository.save(entity);
        dto.setId(saved.getId());
        return dto;
    }

    // Nuevo: Soft Delete profesional
    @Transactional
    public void softDeleteService(Long businessId, Long id) {
        ServiceEntity entity = serviceRepository.findByBusinessIdAndId(businessId, id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        entity.setActive(false); // Se apaga, no se destruye de la base de datos
        serviceRepository.save(entity);
    }
}