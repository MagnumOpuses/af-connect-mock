#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER apimanager;
    CREATE DATABASE apimanager;
    GRANT ALL PRIVILEGES ON DATABASE apimanager TO apimanager;
EOSQL

psql apimanager < ./apimanager-db/apimanager-db-seed.sql