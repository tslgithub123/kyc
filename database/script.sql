-- Create Roles Table

DROP DATABASE new_kyc;
CREATE DATABASE new_kyc;
USE new_kyc;

CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Create Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Create User Roles Mapping Table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Insert Roles
 INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
 INSERT INTO roles (name) VALUES ('ROLE_ENVIRONMENT_OFFICER');
 INSERT INTO roles (name) VALUES ('ROLE_MANAGEMENT');
 INSERT INTO roles (name) VALUES ('ROLE_THIRD_PARTY');

-- Insert Users with dummy passwords
-- In a real application, passwords should be hashed
-- INSERT INTO users (username, password) VALUES ('admin', 'admin');
-- INSERT INTO users (username, password) VALUES ('env', 'env');
-- INSERT INTO users (username, password) VALUES ('manager', 'manager');
-- INSERT INTO users (username, password) VALUES ('thp', 'thp');

-- Map Users to Roles
-- INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin -> ROLE_ADMIN
-- INSERT INTO user_roles (user_id, role_id) VALUES (2, 2); -- Environment Officer -> ROLE_ENVIRONMENT_OFFICER
-- INSERT INTO user_roles (user_id, role_id) VALUES (3, 3); -- Manager -> ROLE_MANAGEMENT
-- INSERT INTO user_roles (user_id, role_id) VALUES (4, 4); -- Third Party -> ROLE_THIRD_PARTY
