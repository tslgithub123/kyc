\set ON_ERROR_STOP 1
BEGIN;
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/connection.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/drop.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/extensions.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/types.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/tables.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/partitions.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/triggers.sql
\i /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/data.sql
COMMIT;