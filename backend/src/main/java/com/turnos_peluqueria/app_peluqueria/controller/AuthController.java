package com.turnos_peluqueria.app_peluqueria.controller;

import com.turnos_peluqueria.app_peluqueria.dto.LoginRequest;
import com.turnos_peluqueria.app_peluqueria.dto.AuthResponse;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import com.turnos_peluqueria.app_peluqueria.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; //
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) { //[cite: 26]
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        if (!user.getIsActive()) { //[cite: 26]
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuario deshabilitado");
        }

        String token = jwtUtil.generateToken(user);

        AuthResponse response = new AuthResponse(
                token,
                user.getId(), //[cite: 26]
                user.getName(), //[cite: 26]
                user.getEmail(), //[cite: 26]
                user.getRole().name(), //[cite: 26]
                user.getBusiness().getId(), //[cite: 26]
                user.getBranch().getId() //[cite: 26]
        );

        return ResponseEntity.ok(response);
    }
}