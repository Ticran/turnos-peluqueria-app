-- ===============================================================================
-- 1. CREACIÓN DE LA TABLA: LOCALES / SUCURSALES (branches)
-- ===============================================================================
CREATE TABLE branches (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    business_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_branches_business FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- ===============================================================================
-- 2. ALTERACIÓN DE TABLA: USUARIOS / EMPLEADOS (users)
-- ===============================================================================
ALTER TABLE users 
ADD COLUMN branch_id BIGINT;

ALTER TABLE users 
ADD CONSTRAINT fk_users_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL;

-- ===============================================================================
-- 3. ALTERACIÓN DE TABLA: SERVICIOS (services)
-- ===============================================================================
ALTER TABLE services 
ADD COLUMN branch_id BIGINT;

ALTER TABLE services 
ADD CONSTRAINT fk_services_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE;

-- ===============================================================================
-- 4. ALTERACIÓN DE TABLA: TURNOS / RESERVAS (appointments)
-- ===============================================================================
ALTER TABLE appointments 
ADD COLUMN branch_id BIGINT;

ALTER TABLE appointments 
ADD CONSTRAINT fk_appointments_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE RESTRICT;