package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BusinessRepository businessRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserDTO> getActiveEmployees(Long businessId) {
        List<User> users = userRepository.findByBusinessIdAndIsActiveTrue(businessId);
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

    @Transactional
    public UserDTO createUser(UserDTO dto) {
        Business business = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() -> new RuntimeException("Negocio no encontrado"));

        // Seguridad estricta: Corregido el "123456" de prueba
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria para dar de alta un usuario.");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setSpecialty(dto.getSpecialty());
        user.setRole(dto.getRole());
        user.setBusiness(business);
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        User saved = userRepository.save(user);
        dto.setId(saved.getId());
        return dto;
    }

    // Nuevo: Modificar perfil de empleado / administrador
    @Transactional
    public UserDTO updateUser(Long businessId, Long userId, UserDTO dto) {
        User user = userRepository.findByBusinessIdAndId(businessId, userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en este negocio"));

        user.setName(dto.getName());
        user.setSpecialty(dto.getSpecialty());
        user.setRole(dto.getRole());

        // Si el manager decide actualizarle la contraseña desde el panel
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        User saved = userRepository.save(user);
        dto.setId(saved.getId());
        return dto;
    }

    // Nuevo: Soft Delete para dar de baja un empleado sin romper sus agendas
    // pasadas
    @Transactional
    public void softDeleteUser(Long businessId, Long userId) {
        User user = userRepository.findByBusinessIdAndId(businessId, userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setIsActive(false);
        userRepository.save(user);
    }
}