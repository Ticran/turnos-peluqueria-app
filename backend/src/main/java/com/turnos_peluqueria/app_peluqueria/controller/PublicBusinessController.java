package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.BusinessDTO;
import com.turnos_peluqueria.app_peluqueria.service.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Público (sin login): directorio de locales y página de reservas por slug
@RestController
@RequestMapping("/api/public/businesses")
@RequiredArgsConstructor
public class PublicBusinessController {

    private final BusinessService businessService;

    @GetMapping
    public List<BusinessDTO> getActive() {
        return businessService.getActiveBusinesses();
    }

    @GetMapping("/{slug}")
    public BusinessDTO getBySlug(@PathVariable String slug) {
        return businessService.getActiveBySlug(slug);
    }
}
