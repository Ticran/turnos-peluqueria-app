CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    client_email VARCHAR(255),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    observations TEXT,
    business_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    CONSTRAINT fk_appointments_business FOREIGN KEY (business_id) REFERENCES businesses(id),
    CONSTRAINT fk_appointments_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_appointments_service FOREIGN KEY (service_id) REFERENCES services(id)
);