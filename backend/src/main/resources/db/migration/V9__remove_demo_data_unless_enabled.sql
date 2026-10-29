-- ===============================================================================
-- V9: V6, V7 y V8 cargan datos de demo con contraseñas públicas (están en el README):
--   owner@plataforma.com (SUPER_ADMIN), admin@lumen.com, mateo@lumen.com y "Mi Peluquería Ideal".
-- Salvo que se active app.demo-data=true (solo en local), se borran acá para que
-- nunca existan en producción. El dueño de la plataforma se crea desde
-- PLATFORM_OWNER_EMAIL / PLATFORM_OWNER_PASSWORD (ver PlatformOwnerBootstrap).
-- ===============================================================================
DO $$
BEGIN
    IF '${demo_data}' <> 'true' THEN
        DELETE FROM appointments
        WHERE business_id IN (SELECT id FROM businesses WHERE email = 'contacto@pelu.com');
        -- Cascada: sucursales, usuarios, servicios, horarios y bloqueos del local demo
        DELETE FROM businesses WHERE email = 'contacto@pelu.com';
        DELETE FROM users WHERE email IN ('owner@plataforma.com', 'admin@lumen.com', 'mateo@lumen.com');
    END IF;
END $$;
