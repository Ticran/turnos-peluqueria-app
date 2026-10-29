package com.turnos_peluqueria.app_peluqueria.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ValidationTest {

    @Test
    void phones() {
        assertTrue(Validation.isPhone("+54 9 358 412-3456"));
        assertTrue(Validation.isPhone("3584123456"));
        assertFalse(Validation.isPhone("a"));
        assertFalse(Validation.isPhone("12345"));            // menos de 6 dígitos
        assertFalse(Validation.isPhone("1234567890123456")); // más de 15
        assertFalse(Validation.isPhone("358<script>"));
    }

    @Test
    void emails() {
        assertTrue("ana@gmail.com".matches(Validation.EMAIL));
        assertFalse("ana@gmail".matches(Validation.EMAIL));
        assertFalse("ana gomez@gmail.com".matches(Validation.EMAIL));
    }

    @Test
    void imageSignatures() {
        assertEquals("jpg", ImageService.sniff(new byte[] { (byte) 0xFF, (byte) 0xD8, (byte) 0xFF, 0 }));
        assertEquals("png", ImageService.sniff(new byte[] { (byte) 0x89, 'P', 'N', 'G' }));
        assertEquals("webp", ImageService.sniff("RIFF0000WEBP".getBytes()));
        assertNull(ImageService.sniff("<svg onload=alert(1)>".getBytes()));
    }
}
