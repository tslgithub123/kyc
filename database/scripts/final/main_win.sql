\set ON_ERROR_STOP 1
BEGIN;
\i connection.sql
\i drop.sql
\i extensions.sql
\i types.sql
\i tables.sql
\i partitions.sql
\i triggers.sql
\i data.sql
COMMIT;