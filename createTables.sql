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

CREATE TABLe typeInsurances(
    id SERIAL PRIMARY KEY,
    typeFace VARCHAR(255) NOT NULL,
    typeInsurances VARCHAR(255) NOT NULL
);

CREATE TABLE checkedInsurances (
       id SERIAL PRIMARY KEY,
       id_document_insurances INTEGER,
       status_checked_insured VARCHAR(255),
       insurance_claim_check VARCHAR(255) NOT NULL,
       payment_verification_check VARCHAR(255) NOT NULL
);

create table insurancePayments(
    id SERIAL PRIMARY KEY,
    id_document_insurances INTEGER NOT NULL,
    insurance_case VARCHAR(255) NOT NULL,
    severityInsuredEvent VARCHAR(255) NOT NULL,
    amount_payment float NOT NULL
);

CREATE OR REPLACE FUNCTION update_checked_insurances()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM checkedInsurances WHERE id_document_insurances = NEW.id_document_insurances) THEN
UPDATE checkedInsurances SET
    status_checked_insured = NEW.status_checked_insured,
    insurance_claim_check = NEW.insurance_claim_check,
    payment_verification_check = NEW.payment_verification_check
WHERE id_document_insurances = NEW.id_document_insurances;
RETURN NULL;
ELSE
    RETURN NEW;
END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_checked_insurances
    BEFORE INSERT ON checkedInsurances
    FOR EACH ROW
    EXECUTE FUNCTION update_checked_insurances();

    CREATE OR REPLACE FUNCTION update_insurance_payments()
RETURNS TRIGGER AS $$
    BEGIN
    IF EXISTS (SELECT 1 FROM insurancePayments WHERE id_document_insurances = NEW.id_document_insurances) THEN
    UPDATE insurancePayments SET
     insurance_case = NEW.insurance_case,
     severityInsuredEvent = NEW.severityInsuredEvent,
     amount_payment = NEW.amount_payment
    WHERE id_document_insurances = NEW.id_document_insurances;
    RETURN NEW;
    ELSE
        RETURN NEW;
    END IF;
    END;
$$ LANGUAGE plpgsql;
