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
CREATE TABLE typeInsurance(
    id SERIAL PRIMARY KEY,
    typeFace VARCHAR(255) NOT NULL,
    nameInsurance VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);
CREATE TABLE allInsurance(
     id SERIAL PRIMARY KEY,
     clientEmail VARCHAR(255) NOT NULL,
     typeFace VARCHAR(255) NOT NULL,
     typeInsurance VARCHAR(255) NOT NULL,
     sumInsured FLOAT NOT NULL,
     contract_start_date DATE NOT NULL,
     contract_end_date DATE NOT NULL
);

CREATE TABLE checkedInsurances (
       id SERIAL PRIMARY KEY,
       id_document_insurances INTEGER,
       status_checked_insured VARCHAR(255),
       insurance_claim_check VARCHAR(255) NOT NULL,
       payment_verification_check VARCHAR(255) NOT NULL
);
