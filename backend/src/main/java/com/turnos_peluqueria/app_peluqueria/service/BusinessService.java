package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.BusinessDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessService {

    @Autowired
    private BusinessRepository businessRepository;

    @Transactional
    public BusinessDTO createBusiness(BusinessDTO dto) {
        businessRepository.findByEmail(dto.getEmail()).ifPresent(b -> {
            throw new IllegalStateException("Ya existe un local registrado con este email.");
        });

        Business business = new Business();
        business.setName(dto.getName());
        business.setDescription(dto.getDescription());
        business.setEmail(dto.getEmail());
        business.setPhone(dto.getPhone());
        business.setAddress(dto.getAddress());
        business.setImageUrl(dto.getImageUrl());

        if (dto.getOpeningTime() != null)
            business.setOpeningTime(LocalTime.parse(dto.getOpeningTime()));
        if (dto.getClosingTime() != null)
            business.setClosingTime(LocalTime.parse(dto.getClosingTime()));

        Business saved = businessRepository.save(business);
        dto.setId(saved.getId());
        return dto;
    }

    @Transactional(readOnly = true)
    public List<BusinessDTO> getAllBusinesses() {
        List<Business> businesses = businessRepository.findAll();
        List<BusinessDTO> dtos = new ArrayList<>();

        for (Business b : businesses) {
            dtos.add(mapToDTO(b));
        }
        return dtos;
    }

    @Transactional(readOnly = true)
    public BusinessDTO getBusinessById(Long id) {
        Business b = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El local solicitado no existe."));
        return mapToDTO(b);
    }

    @Transactional
    public BusinessDTO updateBusiness(Long id, BusinessDTO dto) {
        Business b = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El local no existe."));

        b.setName(dto.getName());
        b.setDescription(dto.getDescription());
        b.setEmail(dto.getEmail());
        b.setPhone(dto.getPhone());
        b.setAddress(dto.getAddress());
        b.setImageUrl(dto.getImageUrl());

        if (dto.getOpeningTime() != null)
            b.setOpeningTime(LocalTime.parse(dto.getOpeningTime()));
        if (dto.getClosingTime() != null)
            b.setClosingTime(LocalTime.parse(dto.getClosingTime()));

        businessRepository.save(b);
        return dto;
    }

    @Transactional
    public void updateImageUrl(Long id, String imageUrl) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));
        business.setImageUrl(imageUrl);
        businessRepository.save(business);
    }

    // Reemplazá tu método auxiliar en
    // com.turnos_peluqueria.app_peluqueria.service.BusinessService
    private BusinessDTO mapToDTO(Business b) {
        BusinessDTO dto = new BusinessDTO();
        dto.setId(b.getId());
        dto.setName(b.getName());
        dto.setDescription(b.getDescription());
        dto.setEmail(b.getEmail());
        dto.setPhone(b.getPhone());
        dto.setAddress(b.getAddress());
        dto.setImageUrl(b.getImageUrl());

        if (b.getOpeningTime() != null)
            dto.setOpeningTime(b.getOpeningTime().toString());
        if (b.getClosingTime() != null)
            dto.setClosingTime(b.getClosingTime().toString());

        // 🌟 AGREGÁ ESTE MAPEO DE SUCURSALES:
        if (b.getBranches() != null) {
            List<com.turnos_peluqueria.app_peluqueria.dto.BranchDTO> branchDTOs = b.getBranches().stream()
                    .map(branch -> {
                        com.turnos_peluqueria.app_peluqueria.dto.BranchDTO bDto = new com.turnos_peluqueria.app_peluqueria.dto.BranchDTO();
                        bDto.setId(branch.getId());
                        bDto.setName(branch.getName());
                        bDto.setAddress(branch.getAddress());
                        bDto.setPhone(branch.getPhone());
                        bDto.setBusinessId(b.getId());
                        return bDto;
                    }).toList();
            dto.setBranches(branchDTOs);
        } else {
            dto.setBranches(new ArrayList<>());
        }

        return dto;
    }
}