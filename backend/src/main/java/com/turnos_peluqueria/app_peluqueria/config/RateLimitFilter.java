package com.turnos_peluqueria.app_peluqueria.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// Frena fuerza bruta en el login y spam de reservas/cancelaciones desde una misma IP.
// Ventana fija por IP y regla. El equipo logueado no tiene límite (carga turnos desde el panel).
// ponytail: en memoria y por instancia; con varias instancias del backend pasar a Redis/Bucket4j
public class RateLimitFilter extends OncePerRequestFilter {

    record Rule(String method, String pattern, int max, long windowMillis) {}

    static final List<Rule> RULES = List.of(
            new Rule("POST", "/api/v1/auth/login", 10, 5 * 60_000),
            new Rule("POST", "/api/appointments", 10, 10 * 60_000),
            new Rule("POST", "/api/appointments/public/*/cancel", 20, 10 * 60_000),
            new Rule("GET", "/api/appointments/availability", 120, 60_000));

    private record Window(long start, int count) {}

    private static final AntPathMatcher MATCHER = new AntPathMatcher();
    private final Map<String, Window> hits = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        Rule rule = matching(request);
        if (rule != null && AuthUser.currentOrNull() == null && !allow(rule, request.getRemoteAddr(), System.currentTimeMillis())) {
            response.setStatus(429);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"message\":\"Demasiados intentos. Esperá unos minutos y volvé a probar.\"}");
            return;
        }
        chain.doFilter(request, response);
    }

    private static Rule matching(HttpServletRequest request) {
        String path = request.getRequestURI().substring(request.getContextPath().length());
        for (Rule r : RULES) {
            if (r.method().equals(request.getMethod()) && MATCHER.match(r.pattern(), path)) {
                return r;
            }
        }
        return null;
    }

    boolean allow(Rule rule, String ip, long now) {
        if (hits.size() > 50_000) {
            hits.values().removeIf(w -> now - w.start() > 60 * 60_000); // las ventanas más largas son de 10 min
        }
        Window w = hits.compute(rule.pattern() + "|" + ip, (k, old) -> old == null || now - old.start() >= rule.windowMillis()
                ? new Window(now, 1) : new Window(old.start(), old.count() + 1));
        return w.count() <= rule.max();
    }
}
