-- Connect to the database
\c new_kyc;

-- UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Role Table
CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE contact_person (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255)
);

-- Create Company Profile Table
CREATE TABLE company_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_person_id UUID,
    mpcbid BIGINT UNIQUE,
    branch VARCHAR(255),
    category VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    fax VARCHAR(255),
    last_environment VARCHAR(20),
    work_day INT,
    phone_number VARCHAR(255),
    website VARCHAR(255),
    working_hour INT,
    year_established INT,
    FOREIGN KEY (contact_person_id) REFERENCES contact_person(id)
);

-- Create Address Table
CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_profile_id UUID NOT NULL,
    street VARCHAR(255),
    line2 VARCHAR(255),
    line3 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    district VARCHAR(255),
    country VARCHAR(255),
    pincode VARCHAR(20),
    village VARCHAR(255),
    taluka VARCHAR(255),
    plot_number VARCHAR(255),
    ro VARCHAR(255),
    sro VARCHAR(255),
    FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE CASCADE
);

-- enums
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE unit_type AS ENUM ('length', 'weight', 'count', 'other');
-- CREATE TYPE resource_type AS ENUM ('raw_material', 'product', 'byproduct', 'fuel','waste','other');

-- Create User Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    enabled BOOLEAN,
    designation VARCHAR(45),
    company_profile_id UUID,
    failed_login_count INT CHECK (failed_login_count >= 0),
    last_login_date TIMESTAMPTZ,
    locked BOOLEAN,
    status user_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),      -- Add created_at
    updated_at TIMESTAMPTZ DEFAULT NOW(),      -- Add updated_at
    FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE SET NULL
);


-- Create User Role Mapping Table
CREATE TABLE user_role (
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

-- Create Industry Tables for Normalization
CREATE TABLE industry_primary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE industry_secondary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE industry_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE industry_category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Industry Link Table (Denormalized)
CREATE TABLE industry_link (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_profile_id UUID NOT NULL,
    primary_industry_id UUID,
    secondary_industry_id UUID,
    industry_type_id UUID,
    industry_category_id UUID,
    FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE CASCADE,
    FOREIGN KEY (primary_industry_id) REFERENCES industry_primary(id) ON DELETE SET NULL,
    FOREIGN KEY (secondary_industry_id) REFERENCES industry_secondary(id) ON DELETE SET NULL,
    FOREIGN KEY (industry_type_id) REFERENCES industry_type(id) ON DELETE SET NULL,
    FOREIGN KEY (industry_category_id) REFERENCES industry_category(id) ON DELETE SET NULL
);

-- Create Employee Table
CREATE TABLE employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID,
    user_id UUID NOT NULL,
    address_id UUID,
    contact_person_id UUID,
    name VARCHAR(500),
    gender VARCHAR(20),
    birthday DATE,
    email VARCHAR(500),
    status user_status DEFAULT 'active',
    email_status VARCHAR(20),
    profile_status VARCHAR(100),
    profile_picture VARCHAR(30),
    marital_status VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES company_profile(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE SET NULL,
    FOREIGN KEY (contact_person_id) REFERENCES contact_person(id)
);

-- Create Email Template Table
CREATE TABLE email_template (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);

-- Create Email Record Table
CREATE TABLE email (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    sent_date TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE unit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    symbol VARCHAR(10),
    unit_type unit_type,
    conversion_factor NUMERIC(10, 5)
);

-- CREATE TABLE resource (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     unit_id UUID,
--     name VARCHAR(255) NOT NULL,
--     quantity NUMERIC(10, 2),
--     resource_type resource_type,
--     FOREIGN KEY (unit_id) REFERENCES unit(id)
-- ) PARTITION BY LIST (resource_type);

-- -- Partition for 'raw_material' resources
-- CREATE TABLE resource_raw_material PARTITION OF resource
--     FOR VALUES IN ('raw_material');

-- -- Partition for 'product' resources
-- CREATE TABLE resource_product PARTITION OF resource
--     FOR VALUES IN ('product');

-- -- Partition for 'byproduct' resources
-- CREATE TABLE resource_byproduct PARTITION OF resource
--     FOR VALUES IN ('byproduct');

-- -- Partition for 'fuel' resources
-- CREATE TABLE resource_fuel PARTITION OF resource
--     FOR VALUES IN ('fuel');

-- -- Partition for 'waste' resources
-- CREATE TABLE resource_waste PARTITION OF resource
--     FOR VALUES IN ('waste');

-- -- Partition for 'other' resources
-- CREATE TABLE resource_other PARTITION OF resource
--     FOR VALUES IN ('other');



-- Indexes
CREATE INDEX idx_employee_company ON employee (company_id);
CREATE INDEX idx_employee_user ON employee (user_id);
CREATE INDEX idx_company_profile_name ON company_profile (name);
CREATE INDEX idx_employee_email ON employee (email);
CREATE INDEX idx_address_company ON address (company_profile_id);

-- Insert Role
INSERT INTO role (name) VALUES
('ROLE_SUPERADMIN'),
('ROLE_ADMIN'),
('ROLE_ENVIRONMENT_OFFICER'),
('ROLE_MANAGEMENT'),
('ROLE_THIRD_PARTY'),
('ROLE_MPCB');

-- Insert into Industry Primary
INSERT INTO industry_primary (name) VALUES
('GREEN'),
('ORANGE'),
('RED'),
('WHITE');

-- Insert into Industry Secondary
INSERT INTO industry_secondary (name) VALUES
('LSI'),
('MSI'),
('SSI');

-- Insert into Industry Type
INSERT INTO industry_type (name) VALUES
('Aatta-chakkies'),
('Apparel making'),
('Candles');

-- Insert into Industry Category
INSERT INTO industry_category (name) VALUES
('Construction - Residential'),
('Construction - Commercial - Offices');

-- Insert into Company Profile
INSERT INTO company_profile (contact_person_id, name, branch, category, email, phone_number)
VALUES 
((SELECT id FROM contact_person WHERE name = 'Dhananjay Yelwande'), 'Techknowgreen Ltd.', 'Main Branch', 'IT', 'it@techknowgreen.com', '1234567890'),
((SELECT id FROM contact_person WHERE name = 'Dhananjay Yelwande'), 'Techknowblue Ltd.', 'Main Branch', 'IT', 'it@techknowblue.com', '1234567890');

-- Insert into Address
INSERT INTO address (company_profile_id, street, line2, line3, city, state, district, country, pincode, village, taluka, plot_number, ro, sro)
VALUES
((SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), '123 Main St', 'Apt 4B', 'City Center', 'Pune', 'Maharashtra', 'Pune', 'India', '411001', 'Village A', 'Taluka A', 'Plot 1', 'RO1', 'SRO1'),
((SELECT id FROM company_profile WHERE name = 'Techknowblue Ltd.'), '456 Elm St', NULL, 'Downtown', 'Pune', 'Maharashtra', 'Pune', 'India', '411002', 'Village B', 'Taluka B', 'Plot 2', 'RO2', 'SRO2');

-- Insert Users
INSERT INTO users (username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked)
VALUES
('superadmin', '$2a$12$WZfY6W.y0iEHSs/xgVztxud3ry/Hto9OhVDx8rlv7WhLJdYVfLw0i', TRUE, 'Super Admin', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE),
('mpcb', '$2a$12$ve87lQVb5uTYFnkQCkt5wej3UfjUWT4rJcrVKj6KKF/jm9zz.ETU2', TRUE, 'MPCB', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE),
('admin', '$2a$10$EpSzg7LgnWJnhmwTz7LpS.ag/QoKCMklUoFYactrDAY7XH3floeFy', TRUE, 'Administrator', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE),
('env', '$2a$10$tZdWNzgjivHVMSYE08xcRenbu2TS/AGj57JOV1l.ZowrK3wOheLxa', TRUE, 'Environment Officer', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE),
('man', '$2a$10$9mlMDltOWKW.avowJvbzXOr3100kYk90xbBrUfPoXG65UQoD29y6q', TRUE, 'Manager', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE),
('thp', '$2a$10$Kx1SuyCHptaOh1qJ96Vqb.Z83EsDMNskCghg5RTPZDDq6a372MoNC', TRUE, 'Third Party', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE);

-- Insert User Role Mappings
INSERT INTO user_role (user_id, role_id)
SELECT (SELECT id FROM users WHERE username = 'superadmin'), (SELECT id FROM role WHERE name = 'ROLE_SUPERADMIN')
UNION ALL
SELECT (SELECT id FROM users WHERE username = 'mpcb'), (SELECT id FROM role WHERE name = 'ROLE_MPCB')
UNION ALL
SELECT (SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM role WHERE name = 'ROLE_ADMIN')
UNION ALL
SELECT (SELECT id FROM users WHERE username = 'env'), (SELECT id FROM role WHERE name = 'ROLE_ENVIRONMENT_OFFICER')
UNION ALL
SELECT (SELECT id FROM users WHERE username = 'man'), (SELECT id FROM role WHERE name = 'ROLE_MANAGEMENT')
UNION ALL
SELECT (SELECT id FROM users WHERE username = 'thp'), (SELECT id FROM role WHERE name = 'ROLE_THIRD_PARTY');

INSERT INTO contact_person(id, name, designation, phone, email)
VALUES (uuid_generate_v4(), 'Dhananjay Yelwande', 'SWE', '9657212458', 'yelwandedhananjay@gmail.com');

-- Insert Dummy Employee Data
INSERT INTO employee (company_id, user_id, address_id, contact_person_id, name, gender, birthday, email, status, email_status, profile_status, profile_picture, marital_status)
VALUES (
(SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
(SELECT id FROM users WHERE username = 'superadmin'), 
(SELECT id FROM address WHERE company_profile_id = (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.') LIMIT 1), 
(SELECT id FROM contact_person WHERE name = 'Dhananjay Yelwande'), 
'John Doe', 'Male', '1990-01-01', 'john.doe@example.com', 'active', 'verified', 'complete', 'john_doe.jpg', 'Single');


    
-- Insert Industry Links
INSERT INTO industry_link (company_profile_id, primary_industry_id, secondary_industry_id, industry_type_id, industry_category_id)
VALUES
((SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), (SELECT id FROM industry_primary WHERE name = 'GREEN'), (SELECT id FROM industry_secondary WHERE name = 'LSI'), (SELECT id FROM industry_type WHERE name = 'Aatta-chakkies'), (SELECT id FROM industry_category WHERE name = 'Construction - Residential')),
((SELECT id FROM company_profile WHERE name = 'Techknowblue Ltd.'), (SELECT id FROM industry_primary WHERE name = 'ORANGE'), (SELECT id FROM industry_secondary WHERE name = 'MSI'), (SELECT id FROM industry_type WHERE name = 'Candles'), (SELECT id FROM industry_category WHERE name = 'Construction - Commercial - Offices'));

-- Insert Email Templates
INSERT INTO email_template (name, subject, body) VALUES
('Account Creation', 'Welcome to Our Platform, {firstName}!', 
'Dear {firstName} {lastName},<br><br>' ||
'I hope this email finds you well.<br><br>' ||
'Thank you for creating an account with us. We are excited to have you on board! Below are the details of your account:<br>' ||
'- **Username**: {username}<br>' ||
'- **Email**: {email}<br>' ||
'- **Registration Date**: {registrationDate}<br><br>' ||
'If you have any questions or need assistance, please feel free to reach out to us.<br><br>' ||
'Best regards,<br>' ||
'<img src="{logoUrl}" alt="{companyName} Logo" style="width:150px; height:auto;"/><br>' ||
'{senderName},<br>' ||
'{senderPosition},<br>' ||
'{senderPhone}<br><br>' ||
'{companyName}<br>' ||
'{companyAddress}<br>' ||
'TEL: {companyPhone}'),

('Password Reset', 'Reset Your Password', 
'Dear {firstName},<br><br>' ||
'We received a request to reset your password. Click the link below to reset it:<br>' ||
'<a href="{resetLink}">Reset Password</a><br><br>' ||
'If you did not request this, please ignore this email.<br><br>' ||
'Best regards,<br>' ||
'<img src="{logoUrl}" alt="{companyName} Logo" style="width:150px; height:auto;"/><br>' ||
'{senderName},<br>' ||
'{senderPosition},<br>' ||
'{senderPhone}<br><br>' ||
'{companyName}<br>' ||
'{companyAddress}<br>' ||
'TEL: {companyPhone}'),

('Email Verification', 'Verify Your Email Address', 
'Dear {firstName},<br><br>' ||
'Thank you for signing up! Please verify your email address by clicking the link below:<br>' ||
'<a href="{verificationLink}">Verify Email</a><br><br>' ||
'Best regards,<br>' ||
'<img src="{logoUrl}" alt="{companyName} Logo" style="width:150px; height:auto;"/><br>' ||
'{senderName},<br>' ||
'{senderPosition},<br>' ||
'{senderPhone}<br><br>' ||
'{companyName}<br>' ||
'{companyAddress}<br>' ||
'TEL: {companyPhone}'),

('Account Deactivation', 'Your Account has been Deactivated', 
'Dear {firstName},<br><br>' ||
'We regret to inform you that your account has been deactivated due to {reason}.<br>' ||
'If you believe this is an error, please contact our support team.<br><br>' ||
'Best regards,<br>' ||
'<img src="{logoUrl}" alt="{companyName} Logo" style="width:150px; height:auto;"/><br>' ||
'{senderName},<br>' ||
'{senderPosition},<br>' ||
'{senderPhone}<br><br>' ||
'{companyName}<br>' ||
'{companyAddress}<br>' ||
'TEL: {companyPhone}');



