package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.config.AuthUser;
import com.turnos_peluqueria.app_peluqueria.dto.BranchDTO;
import com.turnos_peluqueria.app_peluqueria.dto.BusinessDTO;
import com.turnos_peluqueria.app_peluqueria.dto.NewBusinessRequest;
import com.turnos_peluqueria.app_peluqueria.service.BusinessService;
import com.turnos_peluqueria.app_peluqueria.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/businesses")
@RequiredArgsConstructor
public class BusinessController {

    private final BusinessService businessService;
    private final ImageService imageService;

    // SUPER_ADMIN: alta de un local con su primera sucursal y su administrador
    @PostMapping
    public BusinessDTO create(@RequestBody NewBusinessRequest request) {
        return businessService.createBusinessWithOwner(request);
    }

    // SUPER_ADMIN: todos los locales de la plataforma
    @GetMapping
    public List<BusinessDTO> getAll() {
        return businessService.getAllBusinesses();
    }

    // SUPER_ADMIN: suspender o reactivar un local ({"status": "SUSPENDED" | "ACTIVE"})
    @PatchMapping("/{id}/status")
    public BusinessDTO setStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return businessService.setStatus(id, body.get("status"));
    }

    // Equipo del local: datos del negocio para el panel
    @GetMapping("/{id}")
    public BusinessDTO getById(@PathVariable Long id) {
        AuthUser.requireBusiness(id);
        return businessService.getBusinessById(id);
    }

    // ADMIN: datos del propio local desde Configuración
    @PutMapping("/{id}")
    public BusinessDTO update(@PathVariable Long id, @RequestBody BusinessDTO dto) {
        AuthUser.requireBusiness(id);
        return businessService.updateBusiness(id, dto);
    }

    @PostMapping("/{id}/branches")
    public BranchDTO createBranch(@PathVariable Long id, @RequestBody BranchDTO dto) {
        AuthUser.requireBusiness(id);
        return businessService.createBranch(id, dto);
    }

    @PutMapping("/{id}/branches/{branchId}")
    public BranchDTO updateBranch(@PathVariable Long id, @PathVariable Long branchId, @RequestBody BranchDTO dto) {
        AuthUser.requireBusiness(id);
        return businessService.updateBranch(id, branchId, dto);
    }

    // ADMIN: imagen de portada de la página de reservas
    @PostMapping("/{id}/upload-image")
    public BusinessDTO uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        AuthUser.requireBusiness(id);
        return businessService.updateImageUrl(id, imageService.uploadImage(file));
    }
}
