-- CREATE TABLE users (
--     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--     firstname VARCHAR(30) NOT NULL,
--     lastname VARCHAR(30) NOT NULL,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     password VARCHAR(50) NOT NULL,
--     email VARCHAR(50) NOT NULL UNIQUE,
--     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
--     )

CREATE DATABASE logic_zone;
USE logic_zone;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, email)
VALUES 
('alice', 'SIMPLE', 'alice@gmail.com'),
('bob', 'SIMPLE','bob@gmail.com'),
('prince', 'SIMPLE','prince@gmail.com');
