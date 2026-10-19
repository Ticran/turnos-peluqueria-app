package com.turnos_peluqueria.app_peluqueria.config;

import com.turnos_peluqueria.app_peluqueria.entity.Role;
import com.turnos_peluqueria.app_peluqueria.entity.User;
import com.turnos_peluqueria.app_peluqueria.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Crea el dueño de la plataforma (SUPER_ADMIN) al arrancar si todavía no hay ninguno.
// En producción no hay usuarios de demo (ver V9): se definen PLATFORM_OWNER_EMAIL y PLATFORM_OWNER_PASSWORD
@Slf4j
@Component
public class PlatformOwnerBootstrap implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String email;
    private final String password;

    public PlatformOwnerBootstrap(UserRepository userRepository, PasswordEncoder passwordEncoder,
            @Value("${app.platform-owner.email:}") String email,
            @Value("${app.platform-owner.password:}") String password) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.email = email;
        this.password = password;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.existsByRole(Role.SUPER_ADMIN)) {
            return;
        }
        if (email.isBlank() || password.length() < 12) {
            log.warn("No hay dueño de la plataforma. Definí PLATFORM_OWNER_EMAIL y PLATFORM_OWNER_PASSWORD (mínimo 12 caracteres) y reiniciá.");
            return;
        }
        User owner = new User();
        owner.setName("Dueño de la plataforma");
        owner.setEmail(email.trim().toLowerCase());
        owner.setPassword(passwordEncoder.encode(password));
        owner.setRole(Role.SUPER_ADMIN);
        userRepository.save(owner);
        log.info("Dueño de la plataforma creado: {}", owner.getEmail());
    }
}
