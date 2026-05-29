package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.ServiceEntity;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import com.turnos_peluqueria.app_peluqueria.repository.ServiceEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceEntityService {

    @Autowired
    private ServiceEntityRepository serviceRepository;

    @Autowired
    private BusinessRepository businessRepository;

    // 1. OBTENER SERVICIOS POR NEGOCIO (Para mostrar en el catálogo de React)
    public List<ServiceDTO> getServicesByBusiness(Long businessId) {
        List<ServiceEntity> entities = serviceRepository.findByBusinessId(businessId);
        List<ServiceDTO> dtos = new ArrayList<>();

        // Pasamos los datos de las Entidades a DTOs de forma manual y simple
        for (ServiceEntity entity : entities) {
            ServiceDTO dto = new ServiceDTO();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setPrice(entity.getPrice());
            dto.setDurationInMinutes(entity.getDurationInMinutes());
            dto.setActive(entity.getActive());
            dto.setBusinessId(entity.getBusiness().getId());
            dtos.add(dto);
        }
        return dtos;
    }

    // 2. CREAR UN NUEVO SERVICIO (Desde el panel de Admin)
    public ServiceDTO createService(ServiceDTO dto) {
        // Buscamos si el negocio existe primero
        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));

        // Creamos la entidad y le pasamos los datos del DTO
        ServiceEntity entity = new ServiceEntity();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setDurationInMinutes(dto.getDurationInMinutes());
        entity.setActive(dto.getActive() != null ? dto.getActive() : true);
        entity.setBusiness(business); // Asignamos el negocio dueño de este servicio

        // Guardamos en la base de datos
        ServiceEntity savedEntity = serviceRepository.save(entity);

        // Devolvemos el DTO con el ID ya asignado por Postgres
        dto.setId(savedEntity.getId());
        return dto;
    }
}