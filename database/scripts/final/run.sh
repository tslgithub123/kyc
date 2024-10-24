#!/usr/bin/expect

set sudo_password "dhananjay"
set psql_password "root"

spawn sudo -i -u postgres
expect "password for dhananjay:"
send "$sudo_password\r"
expect -re "postgres@.*:~\$"
send "psql -U root -d new_kyc -f /mnt/94E4F513E4F4F876/dhananjay/kyc/database/scripts/final/main.sql\r"
expect "Password for user root:"
send "$psql_password\r"

expect eof
