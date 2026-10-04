package com.turnos_peluqueria.app_peluqueria.service;

import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.entity.Branch;
import com.turnos_peluqueria.app_peluqueria.entity.Business;
import com.turnos_peluqueria.app_peluqueria.entity.Role;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import com.turnos_peluqueria.app_peluqueria.repository.BranchRepository;
import com.turnos_peluqueria.app_peluqueria.repository.BusinessRepository;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    // Panel ADMIN: todo el equipo activo
    @Transactional(readOnly = true)
    public List<UserDTO> getActiveUsers(Long businessId) {
        return userRepository.findByBusinessIdAndIsActiveTrueOrderByNameAsc(businessId).stream().map(this::toDto).toList();
    }

    // Público: profesionales que atienden en una sucursal. Sin email para no exponer datos del equipo
    @Transactional(readOnly = true)
    public List<UserDTO> getProfessionals(Long businessId, Long branchId) {
        return userRepository.findByBusinessIdAndIsActiveTrueOrderByNameAsc(businessId).stream()
                .filter(u -> u.getRole() == Role.EMPLOYEE)
                .filter(u -> u.getBranch() == null || u.getBranch().getId().equals(branchId))
                .map(u -> {
                    UserDTO dto = toDto(u);
                    dto.setEmail(null);
                    return dto;
                })
                .toList();
    }

    @Transactional
    public UserDTO createUser(Long businessId, UserDTO dto) {
        Business business = businessRepository.findById(businessId)
                .orElseThrow(() -> new IllegalArgumentException("Negocio no encontrado"));

        if (dto.getPassword() == null || dto.getPassword().length() < 6) {
            throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres.");
        }
        requireUniqueEmail(dto.getEmail());

        User user = new User();
        user.setBusiness(business);
        user.setEmail(dto.getEmail().trim().toLowerCase());
        user.setRole(dto.getRole() != null ? requireTenantRole(dto.getRole()) : Role.EMPLOYEE);
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        applyProfile(user, businessId, dto);
        return toDto(userRepository.save(user));
    }

    @Transactional
    public UserDTO updateUser(Long businessId, Long userId, UserDTO dto) {
        User user = userRepository.findByBusinessIdAndId(businessId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado en este negocio"));

        if (dto.getEmail() != null && !dto.getEmail().equalsIgnoreCase(user.getEmail())) {
            requireUniqueEmail(dto.getEmail());
            user.setEmail(dto.getEmail().trim().toLowerCase());
        }
        if (dto.getRole() != null) {
            user.setRole(requireTenantRole(dto.getRole()));
        }
        // Si el admin decide cambiarle la contraseña desde el panel
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            if (dto.getPassword().length() < 6) {
                throw new IllegalArgumentException("La contraseña debe tener al menos 6 caracteres.");
            }
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        applyProfile(user, businessId, dto);
        user.setUpdatedAt(OffsetDateTime.now());
        return toDto(user);
    }

    @Transactional
    public UserDTO updatePhoto(Long businessId, Long userId, String photoUrl) {
        User user = userRepository.findByBusinessIdAndId(businessId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        user.setPhotoUrl(photoUrl);
        return toDto(user);
    }

    // Soft Delete para dar de baja un empleado sin romper sus agendas pasadas
    @Transactional
    public void softDeleteUser(Long businessId, Long userId) {
        User user = userRepository.findByBusinessIdAndId(businessId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        user.setIsActive(false);
    }

    private void applyProfile(User user, Long businessId, UserDTO dto) {
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio.");
        }
        user.setName(dto.getName().trim());
        user.setSpecialty(dto.getSpecialty());

        // Sin sucursal elegida: la primera del negocio (users.branch_id no puede quedar null)
        Branch branch = dto.getBranchId() != null
                ? branchRepository.findByBusinessIdAndId(businessId, dto.getBranchId())
                        .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada en este negocio"))
                : user.getBranch() != null
                        ? user.getBranch()
                        : branchRepository.findByBusinessId(businessId).stream().findFirst()
                                .orElseThrow(() -> new IllegalArgumentException("El negocio no tiene sucursales. Creá una primero."));
        user.setBranch(branch);
    }

    // Un local solo crea ADMIN o EMPLOYEE: SUPER_ADMIN es exclusivo de la plataforma
    private static Role requireTenantRole(Role role) {
        if (role == Role.SUPER_ADMIN) {
            throw new IllegalArgumentException("Rol no permitido.");
        }
        return role;
    }

    private void requireUniqueEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("El email es obligatorio.");
        }
        if (userRepository.findByEmail(email.trim().toLowerCase()).isPresent()) {
            throw new IllegalStateException("Ya existe un usuario con ese email.");
        }
    }

    private UserDTO toDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setSpecialty(user.getSpecialty());
        dto.setRole(user.getRole());
        dto.setBusinessId(user.getBusiness().getId());
        dto.setBranchId(user.getBranch() != null ? user.getBranch().getId() : null);
        dto.setPhotoUrl(user.getPhotoUrl());
        return dto;
    }
}
