CREATE TYPE role_name AS ENUM ('ROLE_TSL','ROLE_DIRECTOR', 'ROLE_ADMIN', 'ROLE_ENVIRONMENT_OFFICER', 'ROLE_MANAGEMENT', 'ROLE_THIRD_PARTY');
CREATE TYPE company_unit_type AS ENUM ('main', 'sub');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE unit_type AS ENUM ('length', 'weight', 'count', 'other');
CREATE TYPE resource_type AS ENUM ('raw_material', 'product', 'byproduct', 'fuel','waste','other');
CREATE TYPE transaction_type AS ENUM ('IN', 'OUT');
CREATE TYPE designation_type AS ENUM ('TSL', 'Administrator', 'Manager', 'Director', 'Environment Officer', 'Third Party');
-- CREATE TYPE request_type AS ENUM ('Account Creation');
-- CREATE TYPE notification_type AS ENUM ('Account Creation', 'Officer Creation');