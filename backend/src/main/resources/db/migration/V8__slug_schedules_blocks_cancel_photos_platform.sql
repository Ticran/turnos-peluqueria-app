-- ===============================================================================
-- V8: URL por negocio, días cerrados, horarios por empleado, bloqueos/feriados,
--     cancelación por el cliente, recordatorios, fotos y dueño de la plataforma
-- ===============================================================================

-- 1. NEGOCIOS: slug para la URL pública (/mi-peluqueria) y días que no abre
ALTER TABLE businesses ADD COLUMN slug VARCHAR(80);
ALTER TABLE businesses ADD COLUMN closed_weekdays VARCHAR(20) NOT NULL DEFAULT '';  -- ISO: 1=lunes ... 7=domingo, ej "7" o "6,7"

UPDATE businesses
SET slug = trim(BOTH '-' FROM regexp_replace(
        lower(translate(name, 'áéíóúüñÁÉÍÓÚÜÑ', 'aeiouunaeiouun')), '[^a-z0-9]+', '-', 'g'));
UPDATE businesses SET slug = 'local' WHERE slug = '';
-- Si dos negocios generan el mismo slug, al repetido se le agrega su id
UPDATE businesses b SET slug = b.slug || '-' || b.id
WHERE b.id <> (SELECT min(x.id) FROM businesses x WHERE x.slug = b.slug);

ALTER TABLE businesses ALTER COLUMN slug SET NOT NULL;
ALTER TABLE businesses ADD CONSTRAINT uq_businesses_slug UNIQUE (slug);

-- 2. USUARIOS: foto y dueño de la plataforma (SUPER_ADMIN no pertenece a ningún negocio)
ALTER TABLE users ADD COLUMN photo_url VARCHAR(500);
ALTER TABLE users ALTER COLUMN business_id DROP NOT NULL;
ALTER TABLE users ADD CONSTRAINT chk_users_business
    CHECK (role = 'SUPER_ADMIN' OR business_id IS NOT NULL);

-- 3. TURNOS: link de cancelación para el cliente y control del recordatorio por email
ALTER TABLE appointments ADD COLUMN cancel_token UUID NOT NULL DEFAULT gen_random_uuid();
ALTER TABLE appointments ADD CONSTRAINT uq_appointments_cancel_token UNIQUE (cancel_token);
ALTER TABLE appointments ADD COLUMN reminder_sent_at TIMESTAMP WITH TIME ZONE;
CREATE INDEX idx_appointments_agenda ON appointments (business_id, user_id, date);

-- 4. HORARIOS SEMANALES POR EMPLEADO (sin filas = usa el horario del local)
CREATE TABLE employee_schedules (
    id BIGSERIAL PRIMARY KEY,
    business_id BIGINT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CHECK (start_time < end_time)
);
CREATE INDEX idx_employee_schedules_user ON employee_schedules (business_id, user_id);

-- 5. BLOQUEOS: vacaciones/descansos de un empleado, o feriados/cierres del local (user_id NULL)
CREATE TABLE time_blocks (
    id BIGSERIAL PRIMARY KEY,
    business_id BIGINT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (start_at < end_at)
);
CREATE INDEX idx_time_blocks_range ON time_blocks (business_id, start_at, end_at);

-- 6. DUEÑO DE LA PLATAFORMA: owner@plataforma.com / plataforma123 (cambiarla al entrar)
INSERT INTO users (name, email, password, role, is_active, business_id, branch_id)
VALUES ('Dueño de la plataforma', 'owner@plataforma.com',
        '$2a$10$5SEAFLd1n0v.PTwThVjeWeRbKZXekuHQBseMHLapDIy6JVH8q/WXO', 'SUPER_ADMIN', true, NULL, NULL)
ON CONFLICT (email) DO NOTHING;
