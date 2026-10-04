package com.turnos_peluqueria.app_peluqueria.config;

import com.turnos_peluqueria.app_peluqueria.service.ImageService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Sirve en /uploads/** las fotos guardadas en disco local (cuando no se usa Cloudinary)
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final ImageService imageService;

    public WebConfig(ImageService imageService) {
        this.imageService = imageService;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(imageService.getUploadDir().toUri().toString());
    }
}
