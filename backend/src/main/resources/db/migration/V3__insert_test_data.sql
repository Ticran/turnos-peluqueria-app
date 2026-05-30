-- 1. Insertamos el Negocio Base (Multi-tenant ID = 1)
INSERT INTO businesses (id, name, description, email, phone, opening_time, closing_time)
VALUES (1, 'Premium Barber & Style', 'Estudio de estilismo y barbería premium', 'contacto@premiumbarber.com', '+541123456789', '09:00', '20:00');

-- 2. Insertamos los Profesionales (Usuarios) vinculados al negocio 1
-- (Por ahora las contraseñas quedan simples en "123456")
INSERT INTO users (id, name, email, password, specialty, role, business_id)
VALUES 
(1, 'Lucas Gómez', 'lucas@barberia.com', '123456', 'Corte de Autor y Degradados', 'EMPLOYEE', 1),
(2, 'Sofía Rodríguez', 'sofia@barberia.com', '123456', 'Coloración y Estilismo Femenino', 'ADMIN', 1);

-- 3. Insertamos los Servicios del catálogo vinculados al negocio 1
INSERT INTO services (id, name, description, price, duration_in_minutes, active, business_id)
VALUES 
(1, 'Corte Caballero Premium', 'Incluye lavado, corte con tijera/máquina y peinado con cera', 1200.00, 30, TRUE, 1),
(2, 'Perfilado de Barba', 'Perfilado con navaja, toalla caliente y aceites hidratantes', 800.00, 20, TRUE, 1),
(3, 'Servicio Completo (Corte + Barba)', 'El combo definitivo para renovación total', 1800.00, 50, TRUE, 1);

-- 4. Insertamos un par de Turnos de prueba para arrancar con movimiento
-- Nota: Asegurate que las fechas estén en formato YYYY-MM-DD
INSERT INTO appointments (client_name, client_phone, client_email, date, time, status, observations, business_id, user_id, service_id)
VALUES 
('Carlos Pérez', '+541199998888', 'carlos@mail.com', '2026-06-01', '10:00:00', 'CONFIRMED', 'Cliente prefiere corte bajo en los laterales.', 1, 1, 1),
('Mariano López', '+541177776666', 'mariano@mail.com', '2026-06-01', '11:30:00', 'PENDING', 'Primera vez que viene, quiere asesoramiento de barba.', 1, 1, 2);