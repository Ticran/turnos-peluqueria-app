-- ===============================================================================
-- 1. INSERTAR EL NEGOCIO INICIAL (Campos exactos de V1, V3, V4)
-- ===============================================================================
INSERT INTO businesses (
    name, 
    description, 
    email, 
    phone, 
    opening_time, 
    closing_time, 
    status, 
    address, 
    image_url, 
    created_at, 
    updated_at
)
VALUES (
    'Mi Peluquería Ideal', 
    'El mejor servicio de estilismo y barbería.', 
    'contacto@pelu.com', 
    '123456789', 
    '09:00:00', 
    '20:00:00', 
    'ACTIVE', 
    'Calle Falsa 123', 
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=500', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- ===============================================================================
-- 2. INSERTAR LA SUCURSAL INICIAL (Campos exactos de V5)
-- Usa la secuencia interna businesses_id_seq de forma nativa
-- ===============================================================================
INSERT INTO branches (
    name, 
    address, 
    phone, 
    business_id, 
    created_at, 
    updated_at
)
VALUES (
    'Sucursal Central', 
    'Av. Siempre Viva 742', 
    '987654321', 
    currval('businesses_id_seq'), 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- ===============================================================================
-- 3. INSERTAR EL USUARIO ADMINISTRADOR INICIAL
-- La contraseña es 'admin123' encriptada con BCrypt
-- ===============================================================================
INSERT INTO users (
    name, 
    email, 
    password, 
    specialty, 
    role, 
    is_active, 
    business_id, 
    branch_id, 
    created_at, 
    updated_at
)
VALUES (
    'Administrador Lumen', 
    'admin@lumen.com', 
    '$2a$10$wMvE6T25C08L671bL1wO7uxfG4A6MEnI0vP8kG5mD5.Nl9ZJ828uO', -- Clave encriptada de 'password' o 'admin123'
    'Gestión General', 
    'ADMIN', 
    true, 
    currval('businesses_id_seq'), 
    currval('branches_id_seq'), 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);