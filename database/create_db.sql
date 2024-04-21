-- se ruleaza cu userul postgres:
-- psql -h localhost -U postgres -f create_db.sql
CREATE ROLE sphinx NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT LOGIN PASSWORD 'sphinx';

CREATE DATABASE sphinx WITH OWNER=sphinx ENCODING=UTF8;

\connect sphinx;

CREATE SCHEMA sphinx;

grant usage on schema sphinx to sphinx;

grant create on schema sphinx to sphinx;
