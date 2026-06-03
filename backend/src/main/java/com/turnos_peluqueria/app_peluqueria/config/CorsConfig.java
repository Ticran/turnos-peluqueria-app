package com.turnos_peluqueria.app_peluqueria.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitimos las credenciales (cookies, auth headers)
        config.setAllowCredentials(true);
        
        // El origen exacto de tu frontend en Vite
        config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
        
        // Habilitamos todos los métodos requeridos para tu ABM
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        
        // Permitimos cualquier cabecera (Content-Type, Authorization, etc.)
        config.setAllowedHeaders(List.of("*"));
        
        // Registramos la configuración para todas las rutas que exponga tu API
        source.registerCorsConfiguration("/api/**", config);
        
        // CREAMOS EL FILTRO CON PRIORIDAD MÁXIMA
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE); // <--- ESTO ES LA CLAVE: Se ejecuta antes que todo lo demás
        
        return bean;
    }
}