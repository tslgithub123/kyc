@echo off
setlocal
:: Set your passwords
set PGPASSWORD=root
:: Replace this path with your PostgreSQL bin directory if it's not in PATH
:: Example: set PSQL_PATH="C:\Program Files\PostgreSQL\17\bin\psql.exe"
set PSQL_PATH="C:\Program Files\PostgreSQL\16\bin\psql.exe"
:: Run the SQL script
%PSQL_PATH% -U root -d new_kyc -f "D:\kyc\kyc\database\scripts\final\main_win.sql"
endlocal