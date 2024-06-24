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

-- Drop the existing users table
DROP TABLE IF EXISTS users;

-- Create the new users table with additional columns
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password CHAR(60) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data into the new users table
INSERT INTO users (first_name, last_name, username, email, password)
VALUES 
( 'Alice', 'Wonderland', 'alice', 'alice@gmail.com', 'SIMPLE'),
( 'Bob', 'Builder','bob', 'bob@gmail.com', 'SIMPLE'),
( 'Prince', 'Charming','prince', 'prince@gmail.com', 'SIMPLE');


CREATE TABLE IF NOT EXISTS stocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  fetch_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

