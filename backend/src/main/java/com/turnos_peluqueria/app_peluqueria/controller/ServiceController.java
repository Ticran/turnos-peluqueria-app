package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.ServiceDTO;
import com.turnos_peluqueria.app_peluqueria.service.ServiceEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*") // Permite que tu React en local (ej. localhost:5173) se conecte sin problemas de CORS
public class ServiceController {

    @Autowired
    private ServiceEntityService serviceEntityService;

    // GET: http://localhost:8080/api/services/business/1
    // Trae todos los servicios del negocio con ID 1
    @GetMapping("/business/{businessId}")
    public List<ServiceDTO> getAllByBusiness(@PathVariable Long businessId) {
        return serviceEntityService.getServicesByBusiness(businessId);
    }

    // POST: http://localhost:8080/api/services
    // Recibe un JSON con el nuevo servicio y lo guarda
    @PostMapping
    public ServiceDTO create(@RequestBody ServiceDTO serviceDTO) {
        return serviceEntityService.createService(serviceDTO);
    }

    // PUT: http://localhost:8080/api/services/{id}
    // Recibe el ID en la URL y el JSON modificado en el cuerpo para actualizarlo
    @PutMapping("/{id}")
    public ServiceDTO update(@PathVariable Long id, @RequestBody ServiceDTO serviceDTO) {
        return serviceEntityService.updateService(id, serviceDTO);
    }
}