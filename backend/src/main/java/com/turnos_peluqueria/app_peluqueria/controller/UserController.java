package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.config.AuthUser;
import com.turnos_peluqueria.app_peluqueria.dto.UserDTO;
import com.turnos_peluqueria.app_peluqueria.service.UserService;
import lombok.RequiredArgsConstructor;
import com.turnos_peluqueria.app_peluqueria.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ImageService imageService;

    // ADMIN: equipo completo del negocio
    @GetMapping("/business/{businessId}")
    public List<UserDTO> getByBusiness(@PathVariable Long businessId) {
        AuthUser.requireBusiness(businessId);
        return userService.getActiveUsers(businessId);
    }

    // Público: profesionales de una sucursal (página de reservas)
    @GetMapping("/business/{businessId}/branch/{branchId}")
    public List<UserDTO> getByBranch(@PathVariable Long businessId, @PathVariable Long branchId) {
        return userService.getProfessionals(businessId, branchId);
    }

    @PostMapping
    public UserDTO create(@RequestBody UserDTO userDTO) {
        return userService.createUser(AuthUser.current().businessId(), userDTO);
    }

    @PutMapping("/{id}/business/{businessId}")
    public UserDTO update(@PathVariable Long id, @PathVariable Long businessId, @RequestBody UserDTO dto) {
        AuthUser.requireBusiness(businessId);
        return userService.updateUser(businessId, id, dto);
    }

    // Foto de perfil: el ADMIN la cambia a cualquiera; el empleado solo la suya
    @PostMapping("/{id}/business/{businessId}/photo")
    public UserDTO uploadPhoto(@PathVariable Long id, @PathVariable Long businessId,
            @RequestParam("file") MultipartFile file) throws IOException {
        AuthUser user = AuthUser.requireBusiness(businessId);
        if (!user.isAdmin() && !user.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo podés cambiar tu propia foto.");
        }
        return userService.updatePhoto(businessId, id, imageService.uploadImage(file));
    }

    @DeleteMapping("/{id}/business/{businessId}")
    public void delete(@PathVariable Long id, @PathVariable Long businessId) {
        AuthUser user = AuthUser.requireBusiness(businessId);
        if (user.id().equals(id)) {
            throw new IllegalArgumentException("No podés darte de baja a vos mismo.");
        }
        userService.softDeleteUser(businessId, id);
    }
}
