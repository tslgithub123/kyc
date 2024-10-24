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