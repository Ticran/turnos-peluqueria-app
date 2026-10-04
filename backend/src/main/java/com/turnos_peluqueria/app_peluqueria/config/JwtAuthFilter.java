package com.turnos_peluqueria.app_peluqueria.config;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// Lee "Authorization: Bearer <token>" y deja al usuario logueado en el SecurityContext.
// No es @Component a propósito: si Spring lo registrara también como filtro de servlet,
// correría antes que Spring Security y OncePerRequestFilter lo salteaba dentro de la cadena.
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            try {
                Claims claims = jwtUtil.extractAllClaims(header.substring(7));
                AuthUser user = new AuthUser(
                        ((Number) claims.get("userId")).longValue(),
                        claims.getSubject(),
                        claims.get("role", String.class),
                        claims.get("businessId") instanceof Number n ? n.longValue() : null); // null = SUPER_ADMIN
                var auth = new UsernamePasswordAuthenticationToken(
                        user, null, List.of(new SimpleGrantedAuthority("ROLE_" + user.role())));
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (RuntimeException e) {
                // Token inválido, vencido o viejo (sin userId): sigue como anónimo y la ruta decide
            }
        }
        chain.doFilter(request, response);
    }
}
