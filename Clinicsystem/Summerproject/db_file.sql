SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;

CREATE DATABASE IF NOT EXISTS db_file;
USE db_file;

CREATE TABLE IF NOT EXISTS Registration (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    schedule_date DATE NOT NULL,
    schedule_time TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_firstname VARCHAR(100) NOT NULL,
    doctor_lastname VARCHAR(100) NOT NULL,
    doctor_email VARCHAR(100) NOT NULL UNIQUE,
    doctor_password VARCHAR(255) NOT NULL
);

INSERT INTO doctors (doctor_password, doctor_firstname, doctor_lastname, doctor_email) 
SELECT '12345678', 'Ram', 'Sharma', 'ramsharma@gmail.com' UNION ALL
SELECT '12345678', 'Hari', 'Yadav', 'hariyadav@gmail.com' UNION ALL
SELECT '12345678', 'Shyam', 'Verma', 'shyamverma@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM doctors WHERE doctor_email IN ('ramsharma@gmail.com', 'hariyadav@gmail.com', 'shyamverma@gmail.com'));

COMMIT;
