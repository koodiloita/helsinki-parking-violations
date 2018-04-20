DROP DATABASE IF EXISTS parking;
DROP USER IF EXISTS parking_app;

CREATE DATABASE parking;
CREATE USER parking_app WITH PASSWORD 'parking123!';

\connect parking;

CREATE TABLE address
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(256),
    lat DECIMAL,
    lon DECIMAL
);

CREATE TABLE violation_count
(
    id SERIAL PRIMARY KEY,
    address_id INTEGER NOT NULL REFERENCES address(id),
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    count INTEGER NOT NULL
);

GRANT SELECT ON address TO parking_app;
GRANT SELECT ON violation_count TO parking_app;
