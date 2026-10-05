package com.turnos_peluqueria.app_peluqueria.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtUtil jwtUtil) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Spring reenvía los errores a /error: si estuviera protegido, un 403 llegaría como 401
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // Público: lo que necesita el cliente (sin cuenta) para reservar, ver o cancelar su turno
                        .requestMatchers(HttpMethod.GET,
                                "/uploads/**",
                                "/api/public/**",
                                "/api/services/business/**",
                                "/api/users/business/*/branch/*",
                                "/api/appointments/availability",
                                "/api/appointments/public/*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/appointments", "/api/appointments/public/*/cancel").permitAll()

                        // Dueño de la plataforma: alta, listado y suspensión de locales
                        .requestMatchers(HttpMethod.GET, "/api/admin/businesses").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/admin/businesses").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/admin/businesses/*/status").hasRole("SUPER_ADMIN")

                        // Cualquiera del equipo (el controller valida negocio y si es su propio recurso)
                        .requestMatchers(HttpMethod.GET, "/api/admin/businesses/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/users/*/business/*/photo").authenticated()
                        .requestMatchers("/api/schedules/**").authenticated()

                        // Solo ADMIN: catálogo, equipo y configuración del negocio
                        .requestMatchers("/api/services/**", "/api/users/**", "/api/admin/**").hasRole("ADMIN")

                        // Turnos: ADMIN y EMPLOYEE (el controller limita al empleado a sus turnos)
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173")); // Vite
        config.setAllowedHeaders(List.of("Origin", "Content-Type", "Accept", "Authorization"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
