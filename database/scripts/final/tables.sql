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

CREATE TABLE resource_transaction (
    id UUID NOT NULL,
    company_unit_id UUID NOT NULL,
    resource_id UUID NOT NULL,
    transaction_type transaction_type NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE
) PARTITION BY LIST (company_unit_id);

CREATE TABLE notification_type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE,
    description TEXT,
    priority INT
);

CREATE TABLE notification (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    from_user UUID,
    message TEXT,
    notification_type UUID NOT NULL,
    pinned BOOLEAN DEFAULT FALSE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    trigger_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (from_user) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (notification_type) REFERENCES notification_type(id) ON DELETE CASCADE
);