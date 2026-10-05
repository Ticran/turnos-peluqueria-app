package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.LoginRequest;
import com.turnos_peluqueria.app_peluqueria.dto.AuthResponse;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import com.turnos_peluqueria.app_peluqueria.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        // Mismo mensaje para email inexistente y contraseña incorrecta: no revela qué emails existen
        User user = userRepository.findByEmail(request.email())
                .filter(u -> passwordEncoder.matches(request.password(), u.getPassword()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));

        if (!user.getIsActive()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuario deshabilitado");
        }
        if (user.getBusiness() != null && !user.getBusiness().isActive()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "El local está suspendido. Contactá a la plataforma.");
        }

        return new AuthResponse(
                jwtUtil.generateToken(user),
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getBusiness() != null ? user.getBusiness().getId() : null,
                user.getBranch() != null ? user.getBranch().getId() : null,
                user.getPhotoUrl());
    }
}
