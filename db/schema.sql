### Schema

DROP DATABASE IF EXISTS boiga_db;
CREATE DATABASE boiga_db;
USE boiga_db;

CREATE TABLE boigas (
    id iNT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);