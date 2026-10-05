-- ===============================================================================
-- V7: Datos de demo consistentes.
-- El hash de V6 no correspondía a ninguna contraseña, así que nadie podía loguearse.
-- Es idempotente: funciona tanto en bases donde V6 corrió con el admin como sin él.
--   admin@lumen.com    / admin123     (ADMIN)
--   mateo@lumen.com    / empleado123  (EMPLOYEE)
-- ===============================================================================

INSERT INTO users (name, email, password, specialty, role, is_active, business_id, branch_id)
SELECT 'Administrador Lumen', 'admin@lumen.com',
       '$2a$10$m7EfzLQAM.AAqCX06VSwYeHweE8xpcIxNo8YfDxw5q7752YEMWZHS',
       'Gestión General', 'ADMIN', true, b.id, br.id
FROM businesses b
JOIN branches br ON br.business_id = b.id
WHERE b.email = 'contacto@pelu.com'
ORDER BY br.id
LIMIT 1
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;

INSERT INTO users (name, email, password, specialty, role, is_active, business_id, branch_id)
SELECT 'Mateo Palacios', 'mateo@lumen.com',
       '$2a$10$YF3qINMnlwTKDUTsclAIbuPDf6KvAipGPR7hREe7BshSZvAnHMVZq',
       'Especialista en Degradados', 'EMPLOYEE', true, b.id, br.id
FROM businesses b
JOIN branches br ON br.business_id = b.id
WHERE b.email = 'contacto@pelu.com'
ORDER BY br.id
LIMIT 1
ON CONFLICT (email) DO NOTHING;

INSERT INTO services (name, description, category, price, duration_in_minutes, active, business_id, branch_id)
SELECT s.name, s.description, s.category, s.price, s.duration, true, b.id, br.id
FROM businesses b
JOIN LATERAL (SELECT id FROM branches WHERE business_id = b.id ORDER BY id LIMIT 1) br ON true
CROSS JOIN (VALUES
    ('Corte de Autor', 'Asesoramiento de imagen, corte adaptado y lavado.', 'Corte', 14000.00, 45),
    ('Perfilado de Barba', 'Diseño con navaja, aceites y toalla caliente.', 'Barba', 10000.00, 30),
    ('Combo Corte + Barba', 'Servicio completo de corte y barba.', 'Corte', 21000.00, 75)
) AS s(name, description, category, price, duration)
WHERE b.email = 'contacto@pelu.com'
  AND NOT EXISTS (SELECT 1 FROM services x WHERE x.business_id = b.id AND x.name = s.name);
