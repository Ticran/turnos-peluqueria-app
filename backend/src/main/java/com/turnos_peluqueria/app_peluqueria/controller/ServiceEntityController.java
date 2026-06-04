package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.service.ServiceEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceEntityController {

    @Autowired
    private ServiceEntityService serviceEntityService;

    @GetMapping("/business/{businessId}")
    public List<ServiceDTO> getByBusiness(@PathVariable Long businessId) {
        return serviceEntityService.getActiveServices(businessId);
    }

    @PostMapping
    public ServiceDTO create(@RequestBody ServiceDTO dto) {
        return serviceEntityService.createService(dto);
    }

    @PutMapping("/{id}/business/{businessId}")
    public ServiceDTO update(@PathVariable Long id, @PathVariable Long businessId, @RequestBody ServiceDTO dto) {
        return serviceEntityService.updateService(businessId, id, dto);
    }

    @DeleteMapping("/{id}/business/{businessId}")
    public void delete(@PathVariable Long id, @PathVariable Long businessId) {
        serviceEntityService.softDeleteService(businessId, id);
    }
}