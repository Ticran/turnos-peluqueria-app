CREATE TABLE businesses (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    opening_time VARCHAR(10),
    closing_time VARCHAR(10)
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    business_id BIGINT NOT NULL,
    CONSTRAINT fk_users_business FOREIGN KEY (business_id) REFERENCES businesses(id)
);

CREATE TABLE services (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_in_minutes INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    business_id BIGINT NOT NULL,
    CONSTRAINT fk_services_business FOREIGN KEY (business_id) REFERENCES businesses(id)
);