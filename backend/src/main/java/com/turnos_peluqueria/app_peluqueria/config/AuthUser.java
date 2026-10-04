package com.turnos_peluqueria.app_peluqueria.config;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

// Usuario logueado, armado a partir del JWT en cada request
public record AuthUser(Long id, String email, String role, Long businessId) {

    public boolean isAdmin() {
        return "ADMIN".equals(role);
    }

    public boolean isSuperAdmin() {
        return "SUPER_ADMIN".equals(role);
    }

    // Usuario logueado o null (para endpoints públicos que se comportan distinto si entra alguien del local)
    public static AuthUser currentOrNull() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getPrincipal() instanceof AuthUser user ? user : null;
    }

    public static AuthUser current() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof AuthUser user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sesión requerida");
        }
        return user;
    }

    // Aislamiento multi-tenant: corta si el usuario intenta operar sobre otro negocio
    public static AuthUser requireBusiness(Long businessId) {
        AuthUser user = current();
        if (!Objects.equals(user.businessId(), businessId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tenés acceso a este negocio");
        }
        return user;
    }
}
