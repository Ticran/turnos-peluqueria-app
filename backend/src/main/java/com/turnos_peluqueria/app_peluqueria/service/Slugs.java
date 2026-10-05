package com.turnos_peluqueria.app_peluqueria.service;

import java.text.Normalizer;
import java.util.Set;

// Convierte el nombre del local en la parte de la URL: "Peluquería Ñandú" -> "peluqueria-nandu"
public final class Slugs {

    // Rutas del frontend que no pueden ser el slug de un negocio
    static final Set<String> RESERVED = Set.of("login", "dashboard", "plataforma", "turno", "api", "admin", "uploads");

    private Slugs() {
    }

    public static String toSlug(String text) {
        String ascii = Normalizer.normalize(text == null ? "" : text, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        String slug = ascii.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
        return slug.length() > 80 ? slug.substring(0, 80).replaceAll("-$", "") : slug;
    }

    public static void validate(String slug) {
        if (slug == null || slug.length() > 80 || !slug.matches("[a-z0-9]+(-[a-z0-9]+)*")) {
            throw new IllegalArgumentException("La dirección web solo puede tener minúsculas, números y guiones (ej: mi-peluqueria).");
        }
        if (RESERVED.contains(slug)) {
            throw new IllegalArgumentException("La dirección \"" + slug + "\" está reservada. Elegí otra.");
        }
    }
}
