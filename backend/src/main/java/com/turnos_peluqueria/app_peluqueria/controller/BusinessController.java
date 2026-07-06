package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.BusinessDTO;
import com.turnos_peluqueria.app_peluqueria.service.BusinessService;
import com.turnos_peluqueria.app_peluqueria.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/businesses")
@CrossOrigin(origins = "*")
public class BusinessController {

    @Autowired
    private BusinessService businessService;
    @Autowired
    private ImageService imageService;

    // POST: Crear un nuevo local (Asignación automática de ID de suscripción)
    @PostMapping
    public BusinessDTO create(@RequestBody BusinessDTO dto) {
        return businessService.createBusiness(dto);
    }

    // GET: Listar todos los locales de la plataforma para auditoría de ustedes
    @GetMapping
    public List<BusinessDTO> getAll() {
        return businessService.getAllBusinesses();
    }

    // GET: Obtener la configuración o datos de un local específico
    @GetMapping("/{id}")
    public BusinessDTO getById(@PathVariable Long id) {
        System.out.println("====== LLEGÓ AL CONTROLADOR ======");
        return businessService.getBusinessById(id);
    }

    // PUT: Actualizar datos de un local desde el panel general
    @PutMapping("/{id}")
    public BusinessDTO update(@PathVariable Long id, @RequestBody BusinessDTO dto) {
        return businessService.updateBusiness(id, dto);
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = imageService.uploadImage(file);
            // BUSCAR TU NEGOCIO EN LA DB Y GUARDAR ESTA URL
            businessService.updateImageUrl(id, imageUrl);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al subir imagen");
        }
    }
    
}