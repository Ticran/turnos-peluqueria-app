package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.config.AuthUser;
import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.service.ServiceEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceEntityController {

    private final ServiceEntityService serviceEntityService;

    // Público: catálogo activo del negocio
    @GetMapping("/business/{businessId}")
    public List<ServiceDTO> getByBusiness(@PathVariable Long businessId) {
        return serviceEntityService.getActiveServices(businessId);
    }

    // Público: catálogo de una sucursal (página de reservas)
    @GetMapping("/business/{businessId}/branch/{branchId}")
    public List<ServiceDTO> getByBranch(@PathVariable Long businessId, @PathVariable Long branchId) {
        return serviceEntityService.getActiveServices(businessId, branchId);
    }

    // ADMIN: el negocio sale del token, no del body, para no poder crear servicios en otro negocio
    @PostMapping
    public ServiceDTO create(@RequestBody ServiceDTO dto) {
        return serviceEntityService.createService(AuthUser.current().businessId(), dto);
    }

    @PutMapping("/{id}/business/{businessId}")
    public ServiceDTO update(@PathVariable Long id, @PathVariable Long businessId, @RequestBody ServiceDTO dto) {
        AuthUser.requireBusiness(businessId);
        return serviceEntityService.updateService(businessId, id, dto);
    }

    @DeleteMapping("/{id}/business/{businessId}")
    public void delete(@PathVariable Long id, @PathVariable Long businessId) {
        AuthUser.requireBusiness(businessId);
        serviceEntityService.softDeleteService(businessId, id);
    }
}
