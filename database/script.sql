-- Drop and Create Database
DROP DATABASE IF EXISTS new_kyc;
CREATE DATABASE new_kyc;
USE new_kyc;

-- Create Roles Table
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Create Company Profile Table
CREATE TABLE company_profile (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    mpcbid BIGINT,
    branch VARCHAR(255),
    category VARCHAR(255),
    city VARCHAR(255),
    comp_name VARCHAR(255),
    cont_per_desig VARCHAR(255),
    cont_per_name VARCHAR(255),
    cont_per_no VARCHAR(255),
    country VARCHAR(255),
    district VARCHAR(255),
    email VARCHAR(255),
    fax VARCHAR(255),
    ind_primary VARCHAR(255),
    ind_secondary VARCHAR(255),
    industry_type VARCHAR(255),
    last_env VARCHAR(20),
    no_work_days INT,
    phone_no VARCHAR(255),
    pincode VARCHAR(255),
    plot_no VARCHAR(255),
    ro VARCHAR(255),
    sro VARCHAR(255),
    state VARCHAR(255),
    street VARCHAR(255),
    taluka VARCHAR(255),
    uan VARCHAR(255),
    village VARCHAR(255),
    website VARCHAR(255),
    working_hour INT,
    year_estb INT,
    comp_email VARCHAR(255)
);

-- Create Users Table with New Fields
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    enabled TINYINT(1),
    designation VARCHAR(45),
    company_profile_id BIGINT,
    failed_login_count INT NOT NULL,
    last_login_date DATETIME,
    locked BIT,
    CONSTRAINT FK_users_company_profile FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE SET NULL
);

-- Create User Roles Mapping Table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create Employee Data Table
CREATE TABLE emp_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    employee_name VARCHAR(500),
    gender VARCHAR(20),
    birthday VARCHAR(40),
    address VARCHAR(500),
    address2 VARCHAR(500),
    address3 VARCHAR(500),
    cont_per_desig VARCHAR(500),
    cont_per_no VARCHAR(500),
    email VARCHAR(500),
    company_id BIGINT,
    status VARCHAR(20) DEFAULT 'active' NOT NULL,
    email_status VARCHAR(20),
    profile_status VARCHAR(100),
    profile_pic VARCHAR(30),
    marital_status VARCHAR(255),
    CONSTRAINT FK_emp_data_company FOREIGN KEY (company_id) REFERENCES company_profile(id),
    CONSTRAINT FK_emp_data_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create Indexes for emp_data Table
CREATE INDEX idx_emp_data_company ON emp_data (company_id);
CREATE INDEX idx_emp_data_user ON emp_data (user_id);

-- Insert Roles
INSERT INTO roles (name) VALUES
('ROLE_SUPERADMIN'),
('ROLE_ADMIN'),
('ROLE_ENVIRONMENT_OFFICER'),
('ROLE_MANAGEMENT'),
('ROLE_THIRD_PARTY'),
('ROLE_MPCB');

-- Insert into Company Profile
INSERT INTO company_profile (comp_name, branch, category, city, country, state, email, phone_no)
VALUES
('Techknowgreen Ltd.', 'Main Branch', 'IT', 'Pune', 'India', 'Maharashtra', 'it@techknowgreen.com', '1234567890'),
('Techknowblue Ltd.', 'Main Branch', 'IT', 'Pune', 'India', 'Maharashtra', 'it@techknowblue.com', '1234567890');

-- Insert Users with all fields filled
INSERT INTO users (username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked)
VALUES
('superadmin', '$2a$10$Kx1SuyCHptaOh1qJ96Vqb.Z83EsDMNskCghg5RTPZDDq6a372MoNC', 1, 'Super Admin', 1, 0, NOW(), 0),
('mpcb', '$2a$10$Kx1SuyCHptaOh1qJ96Vqb.Z83EsDMNskCghg5RTPZDDq6a372MoNC', 1, 'MPCB', 1, 0, NOW(), 0),
('admin', '$2a$10$EpSzg7LgnWJnhmwTz7LpS.ag/QoKCMklUoFYactrDAY7XH3floeFy', 1, 'Administrator', 1, 0, NOW(), 0),
('env', '$2a$10$tZdWNzgjivHVMSYE08xcRenbu2TS/AGj57JOV1l.ZowrK3wOheLxa', 1, 'Environment Officer', 1, 0, NOW(), 0),
('man', '$2a$10$9mlMDltOWKW.avowJvbzXOr3100kYk90xbBrUfPoXG65UQoD29y6q', 1, 'Manager', 1, 0, NOW(), 0),
('thp', '$2a$10$Kx1SuyCHptaOh1qJ96Vqb.Z83EsDMNskCghg5RTPZDDq6a372MoNC', 1, 'Third Party', 1, 0, NOW(), 0);

-- Map Users to Roles
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), -- Super Admin -> ROLE_SUPERADMIN
(2, 6), -- MPCB -> ROLE_MPCB
(3, 2), -- Admin -> ROLE_ADMIN
(4, 3), -- Environment Officer -> ROLE_ENVIRONMENT_OFFICER
(5, 4), -- Manager -> ROLE_MANAGEMENT
(6, 5); -- Third Party -> ROLE_THIRD_PARTY

-- Insert Dummy Employee Data
INSERT INTO emp_data (user_id, employee_name, gender, birthday, address, address2, address3, cont_per_desig, cont_per_no, email, company_id, email_status, profile_status, profile_pic, marital_status)
VALUES
(1, 'John Doe', 'Male', '1990-01-01', '123 Main St', 'Apt 4B', 'City Center', 'Manager', '1234567890', 'john.doe@example.com', 1, 'verified', 'complete', 'john_doe.jpg', 'Single'),
(2, 'Jane Smith', 'Female', '1985-05-15', '456 Elm St', '', 'Downtown', 'Environment Officer', '0987654321', 'jane.smith@example.com', 1, 'verified', 'complete', 'jane_smith.jpg', 'Married'),
(3, 'Robert Brown', 'Male', '1988-12-20', '789 Oak St', '', 'Suburb', 'Manager', '1112223333', 'robert.brown@example.com', 1, 'unverified', 'incomplete', 'robert_brown.jpg', 'Single'),
(4, 'Emily White', 'Female', '1992-07-08', '321 Pine St', 'Suite 2A', 'Business Park', 'Third Party', '4445556666', 'emily.white@example.com', 1, 'verified', 'complete', 'emily_white.jpg', 'Single');
