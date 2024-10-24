-- drop_all.sql
DO $$ DECLARE
    r RECORD;
BEGIN
    -- Drop all tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Drop all types
    FOR r IN (SELECT typname FROM pg_type WHERE typnamespace = 'public'::regnamespace) LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
    END LOOP;

    -- Drop all partitions
    FOR r IN (SELECT inhrelid::regclass FROM pg_inherits) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.inhrelid::regclass) || ' CASCADE';
    END LOOP;

    -- Drop all triggers
    FOR r IN (SELECT tgname, tgrelid::regclass FROM pg_trigger WHERE NOT tgisinternal) LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.tgname) || ' ON ' || quote_ident(r.tgrelid::regclass);
    END LOOP;
END $$;