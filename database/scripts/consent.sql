-- Create water_source Table
CREATE TABLE water_source (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	water_inventory_id UUID ,
	source_name VARCHAR(255),
	is_source_meter INT,

	FOREIGN KEY (water_inventory_id) REFERENCES water_inventory(id) ON DELETE CASCADE
     );

-----------------------------------------------------------
-- Create direct_use_of_water Table
CREATE TABLE direct_use_of_water (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	water_source_id UUID ,
	type_of_use VARCHAR(255),
	where_to_use VARCHAR(255),
	is_meter VARCHAR(255),
	water_loss VARCHAR(255),
	is_industrial VARCHAR(255),

	FOREIGN KEY (water_source_id) REFERENCES water_source(id) ON DELETE CASCADE
     );

-----------------------------------------------------------
-- Create water_source_name Table
CREATE TABLE water_source_name (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	water_source_name VARCHAR(255)
     );



-- Insert water_source_name
INSERT INTO water_source_name (water_source_name) VALUES
    ('MIDC'),
    ('CORPORATION'),
    ('BORE WELL'),
    ('RIVER');
    ('JACK WELL');
    ('TANKER');
    ('RAINWATER');
-----------------------------------------------------------

-- Create filter_use_names Table
CREATE TABLE filter_use_names (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	filter_name VARCHAR(255)
     );



-- Insert filter_use_names
INSERT INTO filter_use_names (filter_use_name) VALUES
    ('RO'),
    ('SOFTNER'),
    ('DM'),
    ('UV');
   
-----------------------------------------------------------
-- Create filter_use_name Table
CREATE TABLE filter_use_name (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	filter_use_name VARCHAR(255)
     );



-- Insert filter_use_name
INSERT INTO filter_use_name (filter_use_name) VALUES
    ('BOILER'),
    ('COOLING'),
    ('EQUIPMENT WASHING'),
    ('PROCESS');
    ('WATER SCRUBBER');

-----------------------------------------------------------
-- Create prefilter Table
CREATE TABLE prefilter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	water_source_id UUID ,
	ACF INT,
	PSF INT,
	DMF INT,
	is_metre INT,
	is_prefilter INT ,

	FOREIGN KEY (water_source_id) REFERENCES water_source(id) ON DELETE CASCADE

     );

-----------------------------------------------------------
-- Create filters Table
CREATE TABLE filters (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	prefilter_id UUID ,
	filter_type VARCHAR(255),

	FOREIGN KEY (prefilter_id) REFERENCES prefilter(id) ON DELETE CASCADE

     );

-----------------------------------------------------------
-- Create multiple_filter Table
CREATE TABLE multiple_filter (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	filter_id UUID ,
	filter_label VARCHAR(255),
	is_meter INT,
	water_loss FLOAT(10,3),
	is_active INT,
	creation_timestamp TIMESTAMPTZ ,

	FOREIGN KEY (filter_id) REFERENCES filter(id) ON DELETE CASCADE

     );

-----------------------------------------------------------

-- Create filter_use Table
CREATE TABLE filter_use (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	multiple_filter_id UUID ,
	prefilter_id UUID ,
	filter_use_type VARCHAR(255),
	filter_use_label VARCHAR(255),
	is_industrial INT,
	is_meter INT,
	water_loss FLOAT(10,3),
	is_filter INT,
	is_active INT,
	creation_timestamp TIMESTAMPTZ ,

	FOREIGN KEY (multiple_filter_id) REFERENCES multiple_filter(id) ON DELETE CASCADE,
	FOREIGN KEY (prefilter_id) REFERENCES prefilter(id) ON DELETE CASCADE
     );

-----------------------------------------------------------
-- Create waste_water_recycle Table
CREATE TABLE waste_water_recycle (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	waste_water_treatment_id UUID ,
	use_type VARCHAR(255),
	recycled_to VARCHAR(255),
	quantity FLOAT(10,2),
	is_meter INT,
	treatment_label VARCHAR(255),

	FOREIGN KEY (waste_water_treatment_id) REFERENCES waste_water_treatment(id) ON DELETE CASCADE
     );

-----------------------------------------------------------

