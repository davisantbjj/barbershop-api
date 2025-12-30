-- CREATE / RECREATE Barbershop database
-- Run: mysql -u root -p < create_barbershop_db.sql

DROP DATABASE IF EXISTS barbershop;
CREATE DATABASE barbershop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE barbershop;

-- ===============================
-- USERS
-- ===============================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'BARBEIRO', 'CLIENTE') NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================
-- BARBERS
-- ===============================
CREATE TABLE barbers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    especialidade VARCHAR(100),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_barbers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================
-- SERVICES
-- ===============================
CREATE TABLE services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    duracao_minutos INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================
-- APPOINTMENTS
-- ===============================
CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    barbeiro_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    data_hora DATETIME NOT NULL,
    status ENUM('AGENDADO', 'CANCELADO', 'CONCLUIDO') NOT NULL DEFAULT 'AGENDADO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointment_cliente FOREIGN KEY (cliente_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_appointment_barbeiro FOREIGN KEY (barbeiro_id) REFERENCES barbers(id) ON DELETE CASCADE,
    CONSTRAINT fk_appointment_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,

    CONSTRAINT uk_barbeiro_horario UNIQUE (barbeiro_id, data_hora)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================
-- INDEXES
-- ===============================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_appointments_data ON appointments(data_hora);

-- Optional sample admin user (senha = 'admin123' hashed not included)
-- INSERT INTO users (nome, email, senha, role) VALUES ('Admin','admin@example.com','<hashed_password>','ADMIN');
