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


INSERT INTO notification_type (id, name, description, priority)
VALUES
    (uuid_generate_v4(), 'Client Registration Request', 'A new client has registered. Click to review.', 1),
    (uuid_generate_v4(), 'Consent Reminder', 'Your consent is about to expire. Click to review.', 2),
    (uuid_generate_v4(), 'Officer Created', 'A new officer has been created by {person} from {company} in {unit}. Click to review.', 3),
    (uuid_generate_v4(), 'New Unit Added', 'A new unit has been added by {company}', 3),
    (uuid_generate_v4(), 'Congratulations!', 'Your account has been successfully created. Let''s get started!', 3);

INSERT INTO notification (id, user_id, from_user, message, notification_type, trigger_date)
VALUES
    (uuid_generate_v4(), (SELECT id FROM users WHERE username='tsl'), (SELECT id FROM users WHERE username='admin2'), NULL, (SELECT id FROM notification_type WHERE name='Client Registration Request'), CURRENT_DATE),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username='tsl'), (SELECT id FROM users WHERE username='admin2'), NULL, (SELECT id FROM notification_type WHERE name='Officer Created'), CURRENT_DATE),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username='admin1'), (SELECT id FROM users WHERE username='tsl'), NULL, (SELECT id FROM notification_type WHERE name='Congratulations!'), CURRENT_DATE),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username='1man1'), (SELECT id FROM users WHERE username='tsl'), NULL, (SELECT id FROM notification_type WHERE name='Consent Reminder'), CURRENT_DATE),
    (uuid_generate_v4(), (SELECT id FROM users WHERE username='1env1'), (SELECT id FROM users WHERE username='tsl'), NULL, (SELECT id FROM notification_type WHERE name='Congratulations!'), CURRENT_DATE);