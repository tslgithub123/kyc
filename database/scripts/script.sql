-- Connect to the database
\c new_kyc;

-- Begin Transaction
BEGIN;

-- UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- types
CREATE TYPE role_name AS ENUM ('ROLE_TSL','ROLE_DIRECTOR', 'ROLE_ADMIN', 'ROLE_ENVIRONMENT_OFFICER', 'ROLE_MANAGEMENT', 'ROLE_THIRD_PARTY');
CREATE TYPE company_unit_type AS ENUM ('main', 'sub');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE unit_type AS ENUM ('length', 'weight', 'count', 'other');
CREATE TYPE resource_type AS ENUM ('raw_material', 'product', 'byproduct', 'fuel','waste','other');
CREATE TYPE transaction_type AS ENUM ('IN', 'OUT');
CREATE TYPE designation_type AS ENUM ('TSL', 'Administrator', 'Manager', 'Director', 'Environment Officer', 'Third Party');

-- Create Role Table
CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name role_name UNIQUE
);

-- Create Address Table
CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
    sro VARCHAR(255)
);

CREATE TABLE contact_person (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255)
);

-- Create Industry Tables for Normalization
CREATE TABLE industry_category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE
);

CREATE TABLE industry_scale (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE
);

CREATE TABLE industry_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE
);

-- Create Industry Link Table (Denormalized)
CREATE TABLE industry_link (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    industry_scale_id UUID,
    industry_type_id UUID,
    industry_category_id UUID,
    FOREIGN KEY (industry_category_id) REFERENCES industry_category(id) ON DELETE SET NULL,
    FOREIGN KEY (industry_scale_id) REFERENCES industry_scale(id) ON DELETE SET NULL,
    FOREIGN KEY (industry_type_id) REFERENCES industry_type(id) ON DELETE SET NULL
);

-- pcb
-- Create Company Profile Table
-- add comp reg no
CREATE TABLE company_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_person_id UUID,
    mpcbid BIGINT UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255),
    fax VARCHAR(255),
    last_environment VARCHAR(20),
    phone_number VARCHAR(255),
    website VARCHAR(255),
    year_established INT,
    FOREIGN KEY (contact_person_id) REFERENCES contact_person(id)
);

CREATE TABLE company_unit (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_profile_id UUID,
    address_id UUID,
    industry_link_id UUID,
    name VARCHAR(50),
    type company_unit_type,
    unit_email VARCHAR(255),
    unit_fax VARCHAR(255),
    unit_phone_number VARCHAR(255),
    work_day INT,
    working_hour INT,
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE SET NULL,
    FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE CASCADE,
    FOREIGN KEY (industry_link_id) REFERENCES industry_link(id) ON DELETE SET NULL
);

-- Create User Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    enabled BOOLEAN,
    designation designation_type,
    company_unit_id UUID,
    failed_login_count INT CHECK (failed_login_count >= 0),
    last_login_date TIMESTAMPTZ,
    locked BOOLEAN,
    status user_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (company_unit_id) REFERENCES company_unit(id) ON DELETE SET NULL
);

-- Create User Role Mapping Table
CREATE TABLE user_role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    UNIQUE (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

-- Create Employee Table
CREATE TABLE employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID,
    user_id UUID NOT NULL,
    contact_person_id UUID,
    name VARCHAR(500),
    gender VARCHAR(20),
    date_of_birth DATE,
    email VARCHAR(500),
    status user_status DEFAULT 'active',
    email_status VARCHAR(20),
    profile_status VARCHAR(100),
    profile_picture VARCHAR(30),
    marital_status VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES company_profile(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
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

-- Create Resource Table
CREATE TABLE resource (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID,
    name VARCHAR(255) NOT NULL,
    quantity NUMERIC(10, 2),
    resource_type resource_type,
    FOREIGN KEY (unit_id) REFERENCES unit(id)
);

-- Create the partitioned table
CREATE TABLE resource_transaction (
    id UUID NOT NULL,
    company_unit_id UUID NOT NULL,
    resource_id UUID NOT NULL,
    transaction_type transaction_type NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE
) PARTITION BY LIST (company_unit_id);

CREATE OR REPLACE FUNCTION create_resource_transaction_partition()
RETURNS TRIGGER AS $$
DECLARE
    partition_name TEXT;
    partition_exists BOOLEAN;
BEGIN
    partition_name := 'resource_transaction_' || NEW.id::text;
    
    -- Check if the partition already exists
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = current_schema()
        AND table_name = partition_name
    ) INTO partition_exists;

    -- If the partition doesn't exist, create it
    IF NOT partition_exists THEN
        EXECUTE format('CREATE TABLE %I PARTITION OF resource_transaction FOR VALUES IN (%L)', partition_name, NEW.id);
        EXECUTE format('ALTER TABLE %I ADD PRIMARY KEY (id)', partition_name);
        EXECUTE format('CREATE INDEX ON %I (timestamp)', partition_name);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_resource_transaction_partition_trigger
AFTER INSERT ON company_unit
FOR EACH ROW
EXECUTE FUNCTION create_resource_transaction_partition();

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    email_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    trigger_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE request_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
)

CREATE TABLE request (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_type_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    from_user UUID NOT NULL,
    to_user UUID NOT NULL,
    message TEXT,
    FOREIGN KEY (request_type_id) REFERENCES request_type(id),
    FOREIGN KEY (from_user) REFERENCES users(id),
    FOREIGN KEY (to_user) REFERENCES users(id)
)


-------------------------------------------------------------------------------
-- 1. Insert Contact Person
-------------------------------------------------------------------------------

-- Insert a single contact person
INSERT INTO contact_person (id, name, designation, phone, email)
VALUES 
    (uuid_generate_v4(), 'Ajay Ojha', 'MD', '9876543212', 'example@example.com'),
    (uuid_generate_v4(), 'Prasad Pawar', 'CEO', '9876543212', 'example@example.com'),
    (uuid_generate_v4(), 'Ritesh Gujar', 'IT', '9876543212', 'example@example.com');

-------------------------------------------------------------------------------
-- 2. Insert Roles
-------------------------------------------------------------------------------

-- Insert predefined roles
INSERT INTO role (name) VALUES
    ('ROLE_TSL'),
    ('ROLE_DIRECTOR'),
    ('ROLE_ADMIN'),
    ('ROLE_ENVIRONMENT_OFFICER'),
    ('ROLE_MANAGEMENT'),
    ('ROLE_THIRD_PARTY');

-------------------------------------------------------------------------------
-- 3. Insert Industry Categories
-------------------------------------------------------------------------------

-- Insert industry categories
INSERT INTO industry_category (name) VALUES
    ('GREEN'),
    ('ORANGE'),
    ('RED'),
    ('WHITE');

-------------------------------------------------------------------------------
-- 4. Insert Industry Scales
-------------------------------------------------------------------------------

-- Insert industry scales
INSERT INTO industry_scale (name) VALUES
    ('LSI'),
    ('MSI'),
    ('SSI');

-------------------------------------------------------------------------------
-- 5. Insert Industry Types
-------------------------------------------------------------------------------

-- Insert industry types
INSERT INTO industry_type (name) VALUES
    ('Aatta-chakkies'),
    ('Apparel making'),
    ('Candles');

-------------------------------------------------------------------------------
-- 6. Insert Industry Links
-------------------------------------------------------------------------------

-- Insert industry links after inserting categories, scales, and types
INSERT INTO industry_link (id, industry_category_id, industry_scale_id, industry_type_id)
VALUES
    (
        uuid_generate_v4(),
        (SELECT id FROM industry_category WHERE name = 'GREEN'),
        (SELECT id FROM industry_scale WHERE name = 'LSI'),
        (SELECT id FROM industry_type WHERE name = 'Aatta-chakkies')
    ),
    (
        uuid_generate_v4(),
        (SELECT id FROM industry_category WHERE name = 'ORANGE'),
        (SELECT id FROM industry_scale WHERE name = 'MSI'),
        (SELECT id FROM industry_type WHERE name = 'Candles')
    );

-------------------------------------------------------------------------------
-- 7. Insert Company Profiles
-------------------------------------------------------------------------------

-- Insert company profiles with foreign keys to contact_person
INSERT INTO company_profile (
    id, 
    contact_person_id, 
    mpcbid, 
    name, 
    email, 
    fax, 
    last_environment, 
    phone_number, 
    website, 
    year_established
)
VALUES 
    (
        uuid_generate_v4(), 
        (SELECT id FROM contact_person WHERE name = 'Ajay Ojha'), 
        123456789, 
        'Techknowgreen Ltd.', 
        'it@techknowgreen.com', 
        '123-456-7890', 
        '2023', 
        '1234567890', 
        'www.techknowgreen.com', 
        2000
    ),
    (
        uuid_generate_v4(), 
        (SELECT id FROM contact_person WHERE name = 'Ritesh Gujar'), 
        987654321, 
        'Techknowblue Ltd.', 
        'it@techknowblue.com', 
        '098-765-4321', 
        '2023', 
        '0987654321', 
        'www.techknowblue.com', 
        2005
    );



-------------------------------------------------------------------------------
-- 8. Insert Addresses
-------------------------------------------------------------------------------

-- Insert addresses linked to company profiles
INSERT INTO address (
    id,
    street, 
    line2, 
    line3, 
    city, 
    state, 
    district, 
    country, 
    pincode, 
    village, 
    taluka, 
    plot_number, 
    ro, 
    sro
)
VALUES
    (
        uuid_generate_v4(),
        '101, 102', 
        'Ekta Society', 
        'Hem Opal', 
        'Wakdewadi', 
        'Maharashtra', 
        'Pune', 
        'India', 
        '411005', 
        'Village A', 
        'Taluka A', 
        'Plot No. 26', 
        'RO1', 
        'SRO1'
    ),
    (
        uuid_generate_v4(),
        'New Lane', 
        'Orchid Society', 
        'Gandhi Road', 
        'New Mumbai', 
        'Maharashtra', 
        'Mumbai', 
        'India', 
        '400001', 
        'Village A', 
        'Taluka A', 
        'Plot No. 26', 
        'RO1', 
        'SRO1'
    ),
    (
        uuid_generate_v4(),
        '456 Elm St', 
        'Block B', 
        'Karol Bagh', 
        'New Delhi', 
        'Delhi', 
        'New Delhi', 
        'India', 
        '110005', 
        'Village B', 
        'Taluka B', 
        'Plot 2', 
        'RO2', 
        'SRO2'
    ),
    (
        uuid_generate_v4(),
        '789 Oak St', 
        'Suite 100', 
        'Connaught Place', 
        'New Delhi', 
        'Delhi', 
        'New Delhi', 
        'India', 
        '110002', 
        'Village C', 
        'Taluka C', 
        'Plot 3', 
        'RO3', 
        'SRO3'
    ),
    (
        uuid_generate_v4(),
        '123 Maple St', 
        'Apt 200', 
        'Saket', 
        'Chennai', 
        'Tamil Nadu', 
        'Chennai', 
        'India', 
        '600001', 
        'Village D', 
        'Taluka D', 
        'Plot 4', 
        'RO4', 
        'SRO4'
    );


INSERT INTO company_unit (
    id, 
    company_profile_id, 
    address_id, 
    industry_link_id,
    name,
    type,
    unit_email,
    unit_fax,
    unit_phone_number,
    work_day,
    working_hour
)
VALUES 
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
        (SELECT id FROM address WHERE district = 'Pune'), 
        (SELECT id FROM industry_link WHERE industry_category_id = (SELECT id FROM industry_category WHERE name = 'GREEN') AND industry_scale_id = (SELECT id FROM industry_scale WHERE name = 'LSI') AND industry_type_id = (SELECT id FROM industry_type WHERE name = 'Aatta-chakkies')),
        'TSL Main Unit',
        'main',
        'mainunit@techknowgreen.com',
        '123-456-7890',
        '123-456-7890',
        5,
        8
    ),
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
        (SELECT id FROM address WHERE district = 'Mumbai'), 
        (SELECT id FROM industry_link WHERE industry_category_id = (SELECT id FROM industry_category WHERE name = 'ORANGE') AND industry_scale_id = (SELECT id FROM industry_scale WHERE name = 'MSI') AND industry_type_id = (SELECT id FROM industry_type WHERE name = 'Candles')),
        'TSL Sub Unit 1',
        'sub',
        'subunit1@techknowgreen.com',
        '098-765-4321',
        '098-765-4321',
        6,
        7
    ),
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
        (SELECT id FROM address WHERE street = '456 Elm St'), 
        (SELECT id FROM industry_link WHERE industry_category_id = (SELECT id FROM industry_category WHERE name = 'GREEN') AND industry_scale_id = (SELECT id FROM industry_scale WHERE name = 'LSI') AND industry_type_id = (SELECT id FROM industry_type WHERE name = 'Aatta-chakkies')),
        'TSL Sub Unit 2',
        'sub',
        'subunit2@techknowgreen.com',
        '111-222-3333',
        '111-222-3333',
        5,
        8
    ),
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_profile WHERE name = 'Techknowblue Ltd.'), 
        (SELECT id FROM address WHERE street = '789 Oak St'), 
        (SELECT id FROM industry_link WHERE industry_category_id = (SELECT id FROM industry_category WHERE name = 'ORANGE') AND industry_scale_id = (SELECT id FROM industry_scale WHERE name = 'MSI') AND industry_type_id = (SELECT id FROM industry_type WHERE name = 'Candles')),
        'TBL Main Unit',
        'main',
        'mainunit@techknowblue.com',
        '444-555-6666',
        '444-555-6666',
        6,
        7
    ),
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_profile WHERE name = 'Techknowblue Ltd.'), 
        (SELECT id FROM address WHERE street = '123 Maple St'), 
        (SELECT id FROM industry_link WHERE industry_category_id = (SELECT id FROM industry_category WHERE name = 'GREEN') AND industry_scale_id = (SELECT id FROM industry_scale WHERE name = 'LSI') AND industry_type_id = (SELECT id FROM industry_type WHERE name = 'Aatta-chakkies')),
        'TBL Sub Unit 1',
        'sub',
        'subunit1@techknowblue.com',
        '777-888-9999',
        '777-888-9999',
        5,
        8
    );
-------------------------------------------------------------------------------
-- 9. Insert Users
-------------------------------------------------------------------------------

-- Insert users with foreign keys to company profiles
INSERT INTO users (
    id, 
    username, 
    password, 
    enabled, 
    designation, 
    company_unit_id, 
    failed_login_count, 
    last_login_date, 
    locked, 
    status
)
VALUES
    (
        uuid_generate_v4(), 
        'tsl', 
        '$2a$12$vYPpThZEkVYeGZl8TpVTmORZLzIDnJwYYhgeF6oz/cbo3WoQbxgBa', 
        TRUE, 
        'TSL', 
        NULL, 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        'director1', 
        '$2a$12$A0A1tWXqhTmzEjQ6J90Qr.aXoDo0.3wsO8zNdBA8lF5DTCozTbcJy', 
        TRUE, 
        'Director', 
        (SELECT id FROM company_unit WHERE name = 'TSL Main Unit' AND type = 'main'), 
        0,
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        'admin1', 
        '$2a$12$k/ubhOxFf8v5JwJAd63TieQOxmrlK0..437AhLOk.TV05PKb59i8G', 
        TRUE, 
        'Administrator', 
        (SELECT id FROM company_unit WHERE name = 'TSL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '1env1', 
        '$2a$12$Yw2kVbSGVSqDuWVuUDrqh.874D4T6cv/Mttn/r068Z60V5/3AO4mW', 
        TRUE, 
        'Environment Officer', 
        (SELECT id FROM company_unit WHERE name = 'TSL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '1man1', 
        '$2a$12$75tj6mIUUTcqX4IP470h6.HFX6P988JjpTB3/oe.rtkyOluMKB9Hq', 
        TRUE, 
        'Manager', 
        (SELECT id FROM company_unit WHERE name = 'TSL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '1thp1', 
        '$2a$12$JJHlrgEFtMm3Jlqph8DbO.RlwB8LspM1Atb.w2KFcKPCkSfQxaoI2', 
        TRUE, 
        'Third Party', 
        (SELECT id FROM company_unit WHERE name = 'TSL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '2env1', 
        '$2a$12$tZ.NVZ5l3HddcTySkhSQJeMDwgeez.hLlUqyb3eKJ/xClsBsOwbiy', 
        TRUE, 
        'Environment Officer',
        (SELECT id FROM company_unit WHERE name = 'TSL Sub Unit 1' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '2man1', 
        '$2a$12$Z8wtL5RctoddEqa0plb3r.G0PY86Df8sZhoSWvtGL.l5OsYQpaQM.', 
        TRUE, 
        'Manager', 
        (SELECT id FROM company_unit WHERE name = 'TSL Sub Unit 1' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '2thp1', 
        '$2a$12$gAnw2JqDsToQZCAHzKSxlOtSieL.kRltNs4OxTquV1141YIDAEHvO', 
        TRUE, 
        'Third Party', 
        (SELECT id FROM company_unit WHERE name = 'TSL Sub Unit 1' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '3env1', 
        '$2a$12$bQNcfAa/kiv07uvvxTC7suNrPXYZ/8cdx.iQO68Ts8UUN4KrInnkG', 
        TRUE, 
        'Environment Officer',
        (SELECT id FROM company_unit WHERE name = 'TSL Sub Unit 2' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '3man1', 
        '$2a$12$vfTsBKRVwcOEVWe9HrPLVODOqG/FhR/swT.W.DUOcVbI7IkN.J/22', 
        TRUE, 
        'Manager', 
        (SELECT id FROM company_unit WHERE name = 'TSL Sub Unit 2' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '3thp1', 
        '$2a$12$YPQWMWlsfJnr1VWRgcRvDuQg5sS3xhZSnOwjYzKw3FVi.pY3SjjLa', 
        TRUE, 
        'Third Party', 
        (SELECT id FROM company_unit WHERE name = 'TSL Sub Unit 2' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        'director2', 
        '$2a$12$grTYnOfAKAKOa0oVSm23c.uDOEolPuQdJ5Qbwb5cmEG6mBnUxcZqa', 
        TRUE, 
        'Director',
        (SELECT id FROM company_unit WHERE name = 'TBL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        'admin2', 
        '$2a$12$GKdMJnElenSD7T4rnF9UeOh3A.EtMrDYa03Jzzh8s9hEzVN5gWVTm', 
        TRUE, 
        'Administrator', 
        (SELECT id FROM company_unit WHERE name = 'TBL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '1env2', 
        '$2a$12$3nMhKsVaaFgIrfo0gf5.rOqKfeDyglVJC5CmqJizdkmd8OcDRKR.6', 
        TRUE, 
        'Environment Officer',
        (SELECT id FROM company_unit WHERE name = 'TBL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '1man2', 
        '$2a$12$sYhu8GCoEJVaR0vKObq51eKDFHBe5O9o9TfOTEoTycFEv1xeygUpy', 
        TRUE,
        'Manager', 
        (SELECT id FROM company_unit WHERE name = 'TBL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '1thp2', 
        '$2a$12$yb14H1zivxFTNkRafjHjxeY0N6X8fecHoDaj2o/3x4hZaoZ0Mp6re', 
        TRUE, 
        'Third Party', 
        (SELECT id FROM company_unit WHERE name = 'TBL Main Unit' AND type = 'main'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '2env2', 
        '$2a$12$6xIrQNKaFWuaTI9TOljfI.6exRQtzAAHxevPUxzjxIHql2yWO.AES', 
        TRUE, 
        'Environment Officer',
        (SELECT id FROM company_unit WHERE name = 'TBL Sub Unit 1' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '2man2', 
        '$2a$12$c6tS9FWXC3CsWOT09p4TaeGQK1u3gi7sU3M5G8Hgw7kijFnfOcPv.', 
        TRUE, 
        'Manager', 
        (SELECT id FROM company_unit WHERE name = 'TBL Sub Unit 1' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    ),
    (
        uuid_generate_v4(), 
        '2thp2', 
        ' $2a$12$pVanQqO4U2xl5MxORv4V2urgyflfnxRwXYmTpwQw/thA73UWaU0Sy', 
        TRUE, 
        'Third Party', 
        (SELECT id FROM company_unit WHERE name = 'TBL Sub Unit 1' AND type = 'sub'), 
        0, 
        NOW(), 
        FALSE, 
        'active'
    );

-------------------------------------------------------------------------------
-- 10. Insert User Role Mappings
-------------------------------------------------------------------------------

INSERT INTO user_role (id, user_id, role_id)
VALUES
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'tsl'), (SELECT id FROM role WHERE name = 'ROLE_TSL')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'director1'), (SELECT id FROM role WHERE name = 'ROLE_DIRECTOR')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'admin1'), (SELECT id FROM role WHERE name = 'ROLE_ADMIN')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '1env1'), (SELECT id FROM role WHERE name = 'ROLE_ENVIRONMENT_OFFICER')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '1man1'), (SELECT id FROM role WHERE name = 'ROLE_MANAGEMENT')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '1thp1'), (SELECT id FROM role WHERE name = 'ROLE_THIRD_PARTY')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '2env1'), (SELECT id FROM role WHERE name = 'ROLE_ENVIRONMENT_OFFICER')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '2man1'), (SELECT id FROM role WHERE name = 'ROLE_MANAGEMENT')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '2thp1'), (SELECT id FROM role WHERE name = 'ROLE_THIRD_PARTY')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '3env1'), (SELECT id FROM role WHERE name = 'ROLE_ENVIRONMENT_OFFICER')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '3man1'), (SELECT id FROM role WHERE name = 'ROLE_MANAGEMENT')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '3thp1'), (SELECT id FROM role WHERE name = 'ROLE_THIRD_PARTY')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'director2'), (SELECT id FROM role WHERE name = 'ROLE_DIRECTOR')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = 'admin2'), (SELECT id FROM role WHERE name = 'ROLE_ADMIN')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '1env2'), (SELECT id FROM role WHERE name = 'ROLE_ENVIRONMENT_OFFICER')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '1man2'), (SELECT id FROM role WHERE name = 'ROLE_MANAGEMENT')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '1thp2'), (SELECT id FROM role WHERE name = 'ROLE_THIRD_PARTY')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '2env2'), (SELECT id FROM role WHERE name = 'ROLE_ENVIRONMENT_OFFICER')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '2man2'), (SELECT id FROM role WHERE name = 'ROLE_MANAGEMENT')),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username = '2thp2'), (SELECT id FROM role WHERE name = 'ROLE_THIRD_PARTY'));

-- Map each user to their respective role
-------------------------------------------------------------------------------
-- 11. Insert Dummy Employee Data
-------------------------------------------------------------------------------

-- Insert emplyees linked to company profiles, users, and contact persons
INSERT INTO employee (
    id, 
    company_id, 
    user_id, 
    contact_person_id, 
    name, 
    gender, 
    date_of_birth, 
    email, 
    status, 
    email_status, 
    profile_status, 
    profile_picture, 
    marital_status
)
VALUES (
    uuid_generate_v4(),
    (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
    (SELECT id FROM users WHERE username = 'tsl'), 
    (SELECT id FROM contact_person WHERE name = 'Ajay Ojha'), 
    'Dhananjay Yelwande', 
    'Male', 
    '1990-01-01', 
    'john.doe@example.com', 
    'active', 
    'verified', 
    'complete', 
    'john_doe.jpg', 
    'Single'
),
(
    uuid_generate_v4(),
    (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
    (SELECT id FROM users WHERE username = 'director1'), 
    (SELECT id FROM contact_person WHERE name = 'Ajay Ojha'), 
    'Omkar Patil', 
    'Male', 
    '1990-01-01', 
    'john.doe@example.com', 
    'active', 
    'verified', 
    'complete', 
    'john_doe.jpg', 
    'Single'
),
(
    uuid_generate_v4(),
    (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
    (SELECT id FROM users WHERE username = 'admin1'), 
    (SELECT id FROM contact_person WHERE name = 'Ritesh Gujar'), 
    'Omkar Patil', 
    'Male', 
    '1990-01-01', 
    'john.doe@example.com', 
    'active', 
    'verified', 
    'complete', 
    'john_doe.jpg', 
    'Single'
),
(
    uuid_generate_v4(),
    (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
    (SELECT id FROM users WHERE username = '1env1'), 
    (SELECT id FROM contact_person WHERE name = 'Ritesh Gujar'), 
    'Kajal Dudhe', 
    'Female', 
    '1990-01-01', 
    'john.doe@example.com', 
    'active', 
    'verified', 
    'complete', 
    'john_doe.jpg', 
    'Single'
),
(
    uuid_generate_v4(),
    (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
    (SELECT id FROM users WHERE username = '1man1'), 
    (SELECT id FROM contact_person WHERE name = 'Ritesh Gujar'), 
    'Rishikesh Kharade', 
    'Male', 
    '1990-01-01', 
    'john.doe@example.com', 
    'active', 
    'verified', 
    'complete', 
    'john_doe.jpg', 
    'Single'
),
(
    uuid_generate_v4(),
    (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
    (SELECT id FROM users WHERE username = '1thp1'), 
    (SELECT id FROM contact_person WHERE name = 'Ritesh Gujar'), 
    'Harish Buddy', 
    'Male', 
    '1990-01-01', 
    'john.doe@example.com', 
    'active', 
    'verified', 
    'complete', 
    'john_doe.jpg', 
    'Single'
);



-------------------------------------------------------------------------------
-- 12. Insert Unit Data
-------------------------------------------------------------------------------

-- Insert units of measurement
INSERT INTO unit (id, name, symbol, unit_type, conversion_factor)
VALUES 
    (uuid_generate_v4(), 'Kilogram', 'kg', 'weight', 1.00000),
    (uuid_generate_v4(), 'Meter', 'm', 'length', 1.00000),
    (uuid_generate_v4(), 'Litre', 'L', 'count', 1.00000),
    (uuid_generate_v4(), 'Tonne', 't', 'weight', 1000.00000),
    (uuid_generate_v4(), 'Piece', 'pc', 'count', 1.00000);

-------------------------------------------------------------------------------
-- 13. Insert Resource Data
-------------------------------------------------------------------------------

-- Insert resources linked to units
INSERT INTO resource (id, unit_id, name, quantity, resource_type)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Kilogram'), 'Steel', 1000.00, 'raw_material'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Meter'), 'Copper Wire', 500.00, 'raw_material'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Litre'), 'Diesel', 200.00, 'fuel'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Tonne'), 'Cement', 10.00, 'product'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Piece'), 'Machine Part', 50.00, 'product');

-------------------------------------------------------------------------------
-- 14. Insert Resource Transaction Data
-------------------------------------------------------------------------------

-- Insert resource transactions linked to company profiles and resources
INSERT INTO resource_transaction(id, company_unit_id, resource_id, transaction_type, quantity, timestamp)
VALUES
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_unit WHERE name = 'TSL Main Unit'), 
        (SELECT id FROM resource WHERE name = 'Steel'), 
        'IN', 
        50, 
        NOW()
    ),
    (
        uuid_generate_v4(), 
        (SELECT id FROM company_unit WHERE name = 'TBL Main Unit'), 
        (SELECT id FROM resource WHERE name = 'Diesel'), 
        'OUT', 
        20, 
        NOW()
    );

-------------------------------------------------------------------------------
-- 15. Insert Email Templates
-------------------------------------------------------------------------------

-- Insert predefined email templates
INSERT INTO email_template (id, name, subject, body) VALUES
    (
        uuid_generate_v4(), 
        'Account Creation', 
        'Welcome to Our Platform, {firstName}!', 
        'Dear {firstName} {lastName},\n\n' ||
        'I hope this email finds you well.\n\n' ||
        'Thank you for creating an account with us. We are excited to have you on board! Below are the details of your account:\n' ||
        '- Username: {username}\n' ||
        '- Email: {email}\n' ||
        '- Registration Date: {registrationDate}\n\n' ||
        'If you have any questions or need assistance, please feel free to reach out to us.\n\n' ||
        'Best regards,\n' ||
        '{senderName},\n' ||
        '{senderPosition},\n' ||
        '{senderPhone}\n\n' ||
        '{companyName}\n' ||
        '{companyAddress}\n' ||
        'TEL: {companyPhone}'
    ),
    (
        uuid_generate_v4(), 
        'Password Reset', 
        'Reset Your Password', 
        'Dear {firstName},\n\n' ||
        'We received a request to reset your password. Click the link below to reset it:\n' ||
        '{resetLink}\n\n' ||
        'If you did not request this, please ignore this email.\n\n' ||
        'Best regards,\n' ||
        '{senderName},\n' ||
        '{senderPosition},\n' ||
        '{senderPhone}\n\n' ||
        '{companyName}\n' ||
        '{companyAddress}\n' ||
        'TEL: {companyPhone}'
    ),
    (
        uuid_generate_v4(), 
        'Email Verification', 
        'Verify Your Email Address', 
        'Dear {firstName},\n\n' ||
        'Thank you for signing up! Please verify your email address by clicking the link below:\n' ||
        '{verificationLink}\n\n' ||
        'Best regards,\n' ||
        '{senderName},\n' ||
        '{senderPosition},\n' ||
        '{senderPhone}\n\n' ||
        '{companyName}\n' ||
        '{companyAddress}\n' ||
        'TEL: {companyPhone}'
    ),
    (
        uuid_generate_v4(), 
        'Account Deactivation', 
        'Your Account has been Deactivated', 
        'Dear {firstName},\n\n' ||
        'We regret to inform you that your account has been deactivated due to {reason}.\n' ||
        'If you believe this is an error, please contact our support team.\n\n' ||
        'Best regards,\n' ||
        '{senderName},\n' ||
        '{senderPosition},\n' ||
        '{senderPhone}\n\n' ||
        '{companyName}\n' ||
        '{companyAddress}\n' ||
        'TEL: {companyPhone}'
    );

-------------------------------------------------------------------------------
-- Commit Transaction
-------------------------------------------------------------------------------

COMMIT;
