-- Connect to the database
\c new_kyc;


-- Insert Data
-- Insert Contact Person
INSERT INTO contact_person(id, name, designation, phone, email)
VALUES (uuid_generate_v4(), 'Dhananjay Yelwande', 'SWE', '9657212458', 'yelwandedhananjay@gmail.com');

-- Insert Roles
INSERT INTO role (name) VALUES
('ROLE_SUPERADMIN'),
('ROLE_ADMIN'),
('ROLE_ENVIRONMENT_OFFICER'),
('ROLE_MANAGEMENT'),
('ROLE_THIRD_PARTY'),
('ROLE_MPCB');

-- Insert Industry Categories
INSERT INTO industry_category (name) VALUES
('GREEN'),
('ORANGE'),
('RED'),
('WHITE');

-- Insert Industry Scales
INSERT INTO industry_scale (name) VALUES
('LSI'),
('MSI'),
('SSI');

-- Insert Industry Types
INSERT INTO industry_type (name) VALUES
('Aatta-chakkies'),
('Apparel making'),
('Candles');

-- Insert Company Profiles
INSERT INTO company_profile (id, contact_person_id, name, branch, category, email, phone_number)
VALUES 
(uuid_generate_v4(), (SELECT id FROM contact_person WHERE name = 'Dhananjay Yelwande'), 'Techknowgreen Ltd.', 'Main Branch', 'IT', 'it@techknowgreen.com', '1234567890'),
(uuid_generate_v4(), (SELECT id FROM contact_person WHERE name = 'Dhananjay Yelwande'), 'Techknowblue Ltd.', 'Main Branch', 'IT', 'it@techknowblue.com', '1234567890');

-- Insert Addresses
INSERT INTO address (company_profile_id, street, line2, line3, city, state, district, country, pincode, village, taluka, plot_number, ro, sro)
VALUES
((SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), '123 Main St', 'Apt 4B', 'City Center', 'Pune', 'Maharashtra', 'Pune', 'India', '411001', 'Village A', 'Taluka A', 'Plot 1', 'RO1', 'SRO1'),
((SELECT id FROM company_profile WHERE name = 'Techknowblue Ltd.'), '456 Elm St', NULL, 'Downtown', 'Pune', 'Maharashtra', 'Pune', 'India', '411002', 'Village B', 'Taluka B', 'Plot 2', 'RO2', 'SRO2');

-- Insert Users
INSERT INTO users (id, username, password, enabled, designation, company_profile_id, failed_login_count, last_login_date, locked, status)
VALUES
(uuid_generate_v4(), 'superadmin', '$2a$12$WZfY6W.y0iEHSs/xgVztxud3ry/Hto9OhVDx8rlv7WhLJdYVfLw0i', TRUE, 'Super Admin', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE, 'active'),
(uuid_generate_v4(), 'mpcb', '$2a$12$ve87lQVb5uTYFnkQCkt5wej3UfjUWT4rJcrVKj6KKF/jm9zz.ETU2', TRUE, 'MPCB', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE, 'active'),
(uuid_generate_v4(), 'admin', '$2a$10$EpSzg7LgnWJnhmwTz7LpS.ag/QoKCMklUoFYactrDAY7XH3floeFy', TRUE, 'Administrator', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE, 'active'),
(uuid_generate_v4(), 'env', '$2a$10$tZdWNzgjivHVMSYE08xcRenbu2TS/AGj57JOV1l.ZowrK3wOheLxa', TRUE, 'Environment Officer', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE, 'active'),
(uuid_generate_v4(), 'man', '$2a$10$9mlMDltOWKW.avowJvbzXOr3100kYk90xbBrUfPoXG65UQoD29y6q', TRUE, 'Manager', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE, 'active'),
(uuid_generate_v4(), 'thp', '$2a$10$Kx1SuyCHptaOh1qJ96Vqb.Z83EsDMNskCghg5RTPZDDq6a372MoNC', TRUE, 'Third Party', (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 0, NOW(), FALSE, 'active');

-- Insert User Role Mappings
INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id
FROM users u, role r
WHERE (u.username = 'superadmin' AND r.name = 'ROLE_SUPERADMIN')
   OR (u.username = 'mpcb' AND r.name = 'ROLE_MPCB')
   OR (u.username = 'admin' AND r.name = 'ROLE_ADMIN')
   OR (u.username = 'env' AND r.name = 'ROLE_ENVIRONMENT_OFFICER')
   OR (u.username = 'man' AND r.name = 'ROLE_MANAGEMENT')
   OR (u.username = 'thp' AND r.name = 'ROLE_THIRD_PARTY');

-- Insert Dummy Employee Data
INSERT INTO employee (id, company_id, user_id, address_id, contact_person_id, name, gender, birthday, email, status, email_status, profile_status, profile_picture, marital_status)
VALUES (
uuid_generate_v4(),
(SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), 
(SELECT id FROM users WHERE username = 'superadmin'), 
(SELECT id FROM address WHERE company_profile_id = (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.') LIMIT 1), 
(SELECT id FROM contact_person WHERE name = 'Dhananjay Yelwande'), 
'John Doe', 'Male', '1990-01-01', 'john.doe@example.com', 'active', 'verified', 'complete', 'john_doe.jpg', 'Single');

-- Insert Industry Links
INSERT INTO industry_link (id, industry_category_id, industry_scale_id, industry_type_id)
VALUES
(uuid_generate_v4(), (SELECT id FROM industry_category WHERE name = 'GREEN'), (SELECT id FROM industry_scale WHERE name = 'LSI'), (SELECT id FROM industry_type WHERE name = 'Aatta-chakkies')),
(uuid_generate_v4(), (SELECT id FROM industry_category WHERE name = 'ORANGE'), (SELECT id FROM industry_scale WHERE name = 'MSI'), (SELECT id FROM industry_type WHERE name = 'Candles'));

-- Insert unit Data

-- Insert into unit table
INSERT INTO unit (id, name, symbol, unit_type, conversion_factor)
VALUES 
    (uuid_generate_v4(), 'Kilogram', 'kg', 'weight', 1.00000),
    (uuid_generate_v4(), 'Meter', 'm', 'length', 1.00000),
    (uuid_generate_v4(), 'Litre', 'L', 'count', 1.00000),
    (uuid_generate_v4(), 'Tonne', 't', 'weight', 1000.00000),
    (uuid_generate_v4(), 'Piece', 'pc', 'count', 1.00000);


-- Insert into resource table
INSERT INTO resource (id, unit_id, name, quantity, resource_type)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Kilogram'), 'Steel', 1000.00, 'raw_material'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Meter'), 'Copper Wire', 500.00, 'raw_material'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Litre'), 'Diesel', 200.00, 'fuel'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Tonne'), 'Cement', 10.00, 'product'),
    (uuid_generate_v4(), (SELECT id FROM unit WHERE name = 'Piece'), 'Machine Part', 50.00, 'product');

-- Insert resource transaction Data
INSERT INTO resource_transaction (id, company_profile_id, resource_id, transaction_type, quantity, timestamp)
VALUES
(uuid_generate_v4(), (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), (SELECT id FROM resource WHERE name = 'Steel'), 'IN', 50, NOW()),
(uuid_generate_v4(), (SELECT id FROM company_profile WHERE name = 'Techknowgreen Ltd.'), (SELECT id FROM resource WHERE name = 'Diesel'), 'OUT', 20, NOW());

-- Insert Email Templates
INSERT INTO email_template (id, name, subject, body) VALUES
(uuid_generate_v4(), 'Account Creation', 'Welcome to Our Platform, {firstName}!', 
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
'TEL: {companyPhone}'),

(uuid_generate_v4(), 'Password Reset', 'Reset Your Password', 
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
'TEL: {companyPhone}'),

(uuid_generate_v4(), 'Email Verification', 'Verify Your Email Address', 
'Dear {firstName},\n\n' ||
'Thank you for signing up! Please verify your email address by clicking the link below:\n' ||
'{verificationLink}\n\n' ||
'Best regards,\n' ||
'{senderName},\n' ||
'{senderPosition},\n' ||
'{senderPhone}\n\n' ||
'{companyName}\n' ||
'{companyAddress}\n' ||
'TEL: {companyPhone}'),

(uuid_generate_v4(), 'Account Deactivation', 'Your Account has been Deactivated', 
'Dear {firstName},\n\n' ||
'We regret to inform you that your account has been deactivated due to {reason}.\n' ||
'If you believe this is an error, please contact our support team.\n\n' ||
'Best regards,\n' ||
'{senderName},\n' ||
'{senderPosition},\n' ||
'{senderPhone}\n\n' ||
'{companyName}\n' ||
'{companyAddress}\n' ||
'TEL: {companyPhone}');