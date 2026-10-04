package com.turnos_peluqueria.app_peluqueria.config;

import com.turnos_peluqueria.app_peluqueria.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private static final long EXPIRATION_TIME = 86400000; // 24 Horas en milisegundos

    private final SecretKey secretKey;

    // En producción definir la variable de entorno JWT_SECRET (mínimo 32 caracteres)
    public JwtUtil(@Value("${jwt.secret:lumen_studio_super_secret_jwt_key_2026_saas_platform}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole().name());
        if (user.getBusiness() != null) {
            claims.put("businessId", user.getBusiness().getId());
        }
        if (user.getBranch() != null) {
            claims.put("branchId", user.getBranch().getId());
        }

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    // Lanza JwtException si el token es inválido o está vencido
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
