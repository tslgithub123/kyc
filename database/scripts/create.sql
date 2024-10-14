-- Connect to the database
\c new_kyc;

-- UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- types
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE unit_type AS ENUM ('length', 'weight', 'count', 'other');
CREATE TYPE resource_type AS ENUM ('raw_material', 'product', 'byproduct', 'fuel','waste','other');
CREATE TYPE transaction_type AS ENUM ('IN', 'OUT');
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

-- Create Company Profile Table
CREATE TABLE company_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_person_id UUID,
    mpcbid BIGINT UNIQUE,
    industry_link_id UUID,
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
    FOREIGN KEY (industry_link_id) REFERENCES industry_link(id) ON DELETE SET NULL,
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_profile_id UUID NOT NULL,
    resource_id UUID NOT NULL,
    transaction_type transaction_type NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE
);
-- PARTITION BY LIST (company_profile_id);

-- DROP TRIGGER IF EXISTS create_company_partition_on_insert ON company_profile;
-- DROP FUNCTION IF EXISTS create_company_partition_trigger();
-- DROP FUNCTION IF EXISTS create_company_partition();

-- CREATE OR REPLACE FUNCTION create_company_partition()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     partition_name TEXT;
-- BEGIN
--     partition_name := 'resource_transaction_' || NEW.company_profile_id;
--     RAISE NOTICE 'Partition name: %', partition_name;
--     IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = partition_name) THEN
--         RAISE NOTICE 'Creating partition: %', partition_name;
--         EXECUTE 'CREATE TABLE ' || partition_name || ' PARTITION OF resource_transaction FOR VALUES IN (' || quote_literal(NEW.company_profile_id) || ')';
--     ELSE
--         RAISE NOTICE 'Partition already exists: %', partition_name;
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create the trigger
-- CREATE TRIGGER create_company_partition_on_insert
-- BEFORE INSERT ON resource_transaction
-- FOR EACH ROW EXECUTE FUNCTION create_company_partition();


-- Indexes
CREATE INDEX idx_employee_company ON employee (company_id);
CREATE INDEX idx_employee_user ON employee (user_id);
CREATE INDEX idx_company_profile_name ON company_profile (name);
CREATE INDEX idx_employee_email ON employee (email);
CREATE INDEX idx_address_company ON address (company_profile_id);
CREATE INDEX idx_resource_transaction_company ON resource_transaction (company_profile_id);
CREATE INDEX idx_resource_transaction_resource ON resource_transaction (resource_id);
CREATE INDEX idx_resource_transaction_timestamp ON resource_transaction (timestamp);
CREATE INDEX idx_resource_transaction_type ON resource_transaction (transaction_type);