-- Drop and Create Database
DROP DATABASE new_kyc;
CREATE DATABASE new_kyc;
USE new_kyc;

-- Create Roles Table
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Create Company Profile Table
CREATE TABLE company_profile (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    mpcbid BIGINT NULL,
    branch VARCHAR(255) NULL,
    category VARCHAR(255) NULL,
    city VARCHAR(255) NULL,
    comp_name VARCHAR(255) NULL,
    cont_per_desig VARCHAR(255) NULL,
    cont_per_name VARCHAR(255) NULL,
    cont_per_no VARCHAR(255) NULL,
    country VARCHAR(255) NULL,
    district VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    fax VARCHAR(255) NULL,
    ind_primary VARCHAR(255) NULL,
    ind_secondary VARCHAR(255) NULL,
    industry_type VARCHAR(255) NULL,
    last_env VARCHAR(20) NULL,
    no_work_days INT NULL,
    phone_no VARCHAR(255) NULL,
    pincode VARCHAR(255) NULL,
    plot_no VARCHAR(255) NULL,
    ro VARCHAR(255) NULL,
    sro VARCHAR(255) NULL,
    state VARCHAR(255) NULL,
    street VARCHAR(255) NULL,
    taluka VARCHAR(255) NULL,
    uan VARCHAR(255) NULL,
    village VARCHAR(255) NULL,
    website VARCHAR(255) NULL,
    working_hour INT NULL,
    year_estb INT NULL,
    idustry_type VARCHAR(255) NULL,
    comp_email VARCHAR(255) NULL
);

-- Create Users Table with New Fields
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    enabled TINYINT(1) NULL,
    designation VARCHAR(45) NULL,
    company_profile_id BIGINT NULL,
    failed_login_count INT NOT NULL,
    last_login_date DATETIME NULL,
    locked BIT NULL,
    PRIMARY KEY (id, username),
    CONSTRAINT FKc9nollep0plgm5m7hr18ubvnn FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE SET NULL,
    CONSTRAINT users_company_profile_id FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE SET NULL
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

-- Insert into Company Profile
INSERT INTO company_profile (comp_name, branch, category, city, country, state, email, phone_no)
VALUES ('Techknowgreen Ltd.', 'Main Branch', 'IT', 'Pune', 'India', 'Maharashtra', 'it@techknowgreen.com', '1234567890');

-- Insert Users with all fields filled
INSERT INTO users (username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked)
VALUES ('admin', '$2a$10$EpSzg7LgnWJnhmwTz7LpS.ag/QoKCMklUoFYactrDAY7XH3floeFy', 1, 'Administrator', 1, 0, NOW(), 0);

INSERT INTO users (username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked)
VALUES ('env', '$2a$10$tZdWNzgjivHVMSYE08xcRenbu2TS/AGj57JOV1l.ZowrK3wOheLxa', 1, 'Environment Officer', 1, 0, NOW(), 0);

INSERT INTO users (username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked)
VALUES ('man', '$2a$10$9mlMDltOWKW.avowJvbzXOr3100kYk90xbBrUfPoXG65UQoD29y6q', 1, 'Manager', 1, 0, NOW(), 0);

INSERT INTO users (username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked)
VALUES ('thp', '$2a$10$Kx1SuyCHptaOh1qJ96Vqb.Z83EsDMNskCghg5RTPZDDq6a372MoNC', 1, 'Third Party', 1, 0, NOW(), 0);

-- Map Users to Roles
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin -> ROLE_ADMIN
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2); -- Environment Officer -> ROLE_ENVIRONMENT_OFFICER
INSERT INTO user_roles (user_id, role_id) VALUES (3, 3); -- Manager -> ROLE_MANAGEMENT
INSERT INTO user_roles (user_id, role_id) VALUES (4, 4); -- Third Party -> ROLE_THIRD_PARTY
