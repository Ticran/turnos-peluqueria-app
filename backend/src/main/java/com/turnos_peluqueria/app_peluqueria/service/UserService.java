package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRepository businessRepository;

    // 1. OBTENER EMPLEADOS POR NEGOCIO (Para asignarlos en los turnos de React)
    public List<UserDTO> getUsersByBusiness(Long businessId) {
        List<User> users = userRepository.findByBusinessId(businessId);
        List<UserDTO> dtos = new ArrayList<>();

        for (User user : users) {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setSpecialty(user.getSpecialty());
            dto.setRole(user.getRole());
            dto.setBusinessId(user.getBusiness().getId());
            dtos.add(dto);
        }
        return dtos;
    }

    // 2. CREAR UN NUEVO EMPLEADO/ADMIN
    public UserDTO createUser(UserDTO dto) {
        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setSpecialty(dto.getSpecialty());
        user.setRole(dto.getRole());
        user.setBusiness(business);
        
        // Contraseña por defecto simple para el MVP por ahora
        user.setPassword("123456"); 

        User savedUser = userRepository.save(user);

        dto.setId(savedUser.getId());
        return dto;
    }
}