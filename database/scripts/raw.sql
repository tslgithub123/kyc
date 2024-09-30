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