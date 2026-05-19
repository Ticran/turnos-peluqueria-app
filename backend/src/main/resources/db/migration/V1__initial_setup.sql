
CREATE TABLE business_config (
    id BIGSERIAL PRIMARY KEY,
    esta_abierto BOOLEAN NOT NULL DEFAULT TRUE,
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL
);

CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL, -- ADMIN, EMPLEADO
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE servicios (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    duracion_minutos INTEGER NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE empleado_servicio (
    empleado_id BIGINT NOT NULL,
    servicio_id BIGINT NOT NULL,
    PRIMARY KEY (empleado_id, servicio_id),
    CONSTRAINT fk_empleado FOREIGN KEY (empleado_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_servicio FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE
);

CREATE TABLE turnos (
    id BIGSERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(30) NOT NULL, -- PENDIENTE, ACEPTADO, RECHAZADO
    metodo_pago VARCHAR(30) NOT NULL, -- EFECTIVO, TRANSFERENCIA
    observaciones TEXT,
    cliente_nombre VARCHAR(100) NOT NULL,
    cliente_email VARCHAR(100) NOT NULL,
    empleado_id BIGINT NOT NULL,
    servicio_id BIGINT NOT NULL,
    CONSTRAINT fk_turno_empleado FOREIGN KEY (empleado_id) REFERENCES usuarios(id),
    CONSTRAINT fk_turno_servicio FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);