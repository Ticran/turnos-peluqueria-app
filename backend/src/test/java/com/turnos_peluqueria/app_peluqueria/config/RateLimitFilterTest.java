package com.turnos_peluqueria.app_peluqueria.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RateLimitFilterTest {

    @Test
    void blocksAfterMaxAndResetsAfterWindow() {
        RateLimitFilter filter = new RateLimitFilter();
        RateLimitFilter.Rule login = RateLimitFilter.RULES.get(0);
        for (int i = 0; i < login.max(); i++) {
            assertTrue(filter.allow(login, "1.1.1.1", 1000));
        }
        assertFalse(filter.allow(login, "1.1.1.1", 1000));                         // pasó el máximo
        assertTrue(filter.allow(login, "2.2.2.2", 1000));                          // otra IP no se ve afectada
        assertTrue(filter.allow(login, "1.1.1.1", 1000 + login.windowMillis()));   // nueva ventana
    }
}
