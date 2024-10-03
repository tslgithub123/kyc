-- Create hazardous_manifest Table
CREATE TABLE hazardous_manifest (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name VARCHAR(255),
    senders_mailing_address VARCHAR(255),
    senders_phone_no VARCHAR(255),
    senders_authorization_no VARCHAR(255),
    manifest_document_no VARCHAR(255),
    transporter_name VARCHAR(255),
    transporter_address VARCHAR(255),
    transporter_mobile_no VARCHAR(255),
    vehicle_type VARCHAR(255),
    transporter_reg_no VARCHAR(255),
    transporter_vehicle_reg_no VARCHAR(255),
    receivers_name VARCHAR(255),
    receivers_address VARCHAR(255),
    receivers_authorization_no VARCHAR(255),
    receivers_phone_no VARCHAR(255),
    total_quantity_container VARCHAR(255),
    unit_id UUID,
    special_handling VARCHAR(255),
    submitted_date VARCHAR(255),
    designed_facility_name VARCHAR(255),
    facility_phone_no INT,
    facility_registration_no VARCHAR(255),
     mailing_address VARCHAR(255),
     mobile_no INT,
     occupier_name VARCHAR(255),
     registration_no VARCHAR(255),
     site_address VARCHAR(255),
     transport_desc_waste VARCHAR(255),
     dispatched_to VARCHAR(255),
     FOREIGN KEY (unit_id) REFERENCES unit(id) ON DELETE SET NULL
);

-- Create consent Table
CREATE TABLE consent (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	company_profile_id UUID ,
	user_id UUID,
	cons_no INT,
	cons_type VARCHAR(255),
	cons_status VARCHAR(255),
	expansion_status VARCHAR(255),
	issue_date DATE,
	valid_upto DATE,
	gross_ci VARCHAR(255),
	no_staff INT,
	no_worker INT,
	tot_plot_area VARCHAR(255),
	tot_plot_area_unit VARCHAR(255),
	tot_build_area VARCHAR(255),
	tot_build_area_unit VARCHAR(255),
	open_space_area VARCHAR(255),
	open_space_area_unit VARCHAR(255),
	tot_green_area VARCHAR(255),
	tot_green_area_unit VARCHAR(255),
	consent_file_path VARCHAR(255),
	consent_file_name VARCHAR(255),
	created_date DATE,
	gross_ci_units VARCHAR(255),

	FOREIGN KEY (company_profile_id) REFERENCES company_profile(id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
     );


-- Create water_inventory Table
CREATE TABLE water_inventory (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	consent_id UUID ,
	is_house_canteen INT,
	is_cooking_canteen INT,
	is_water_treatment INT,
	is_wastewater_treatment INT,
	is_cgwa_permission INT,
	cgwa_file_path INT,
	cgwa_file_name INT,

	FOREIGN KEY (consent_id) REFERENCES consent(id) ON DELETE CASCADE
     );


-- Create waste_water_treatment Table
CREATE TABLE waste_water_treatment (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	water_inventory_id UUID ,
	treatment_type VARCHAR(255),
	label VARCHAR(255),
	capacity VARCHAR(255),

	FOREIGN KEY (water_inventory_id) REFERENCES water_inventory(id) ON DELETE CASCADE
     );
