CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    clientName VARCHAR(255) NOT NULL,
    clientSurname VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    sex CHAR(1),
    address VARCHAR(255),
    phoneNumber VARCHAR(20),
    email VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL
);
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employeeName VARCHAR(255) NOT NULL,
    employeeSurname VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    sex CHAR(1),
    phoneNumber VARCHAR(20),
    email VARCHAR(255),
    hireDate DATE NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL
);