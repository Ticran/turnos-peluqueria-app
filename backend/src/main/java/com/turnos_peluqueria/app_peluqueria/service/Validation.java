package com.turnos_peluqueria.app_peluqueria.service;

// Formatos que se validan igual en todo el backend
final class Validation {

    // Algo@algo.algo, sin espacios. No pretende ser RFC 5322: solo frena errores de tipeo obvios
    static final String EMAIL = "[^@\\s]{1,64}@[^@\\s]+\\.[^@\\s]{2,}";

    private Validation() {
    }

    // "+54 9 358 412-3456" -> 6 a 15 dígitos, con + opcional al inicio y separadores comunes
    static boolean isPhone(String phone) {
        if (phone == null || phone.length() > 30 || !phone.matches("\\+?[0-9 ().-]+")) {
            return false;
        }
        long digits = phone.chars().filter(Character::isDigit).count();
        return digits >= 6 && digits <= 15;
    }
}
