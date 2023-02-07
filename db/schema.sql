-- For volunteer hours tracking:

-- Volunteer table: stores information about each volunteer, including name, email, and hours worked.

-- Project table: stores information about each project, including project name and description.

-- Volunteer-Project table: associates volunteers with the projects they have worked on and the hours they have contributed.

-- For donation tracking:

-- Donor table: stores information about each donor, including name, email, and payment information.

-- Donation table: stores information about each donation, including date, amount, and payment method.

-- For impact metrics:

-- Project table: stores information about each project, including project name, description, and impact metrics.

-- Metric table: stores information about the impact metrics, including the name of the metric, the value, and the project it is associated with.

CREATE TABLE volunteer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hours_worked INT NOT NULL
);

ALTER TABLE volunteer ADD COLUMN address VARCHAR(255);

INSERT INTO volunteer (name, email, hours_worked, address)
VALUES ('John Doe', 'johndoe@example.com', 20, '123 Main St');

SELECT * FROM volunteer;


CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    impact_metrics TEXT
);

ALTER TABLE project ADD COLUMN start_date DATE;

INSERT INTO project (name, description, impact_metrics, start_date)
VALUES ('Community Cleanup', 'Cleaning up local parks and streets', 'Reduced litter and improved community appearance', '2022-01-01');

SELECT * FROM project;


CREATE TABLE volunteer_project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volunteer_id INT NOT NULL,
    project_id INT NOT NULL,
    hours INT NOT NULL,
    FOREIGN_KEY (volunteer_id) REFERENCES volunteer(id),
    FOREIGN_KEY (project_id) REFERENCES project(id)
);

ALTER TABLE volunteer_project ADD COLUMN project_date DATE;

INSERT INTO volunteer_project (volunteer_id, project_id, hours, project_date)
VALUES (1, 1, 4, '2022-01-15');

SELECT * FROM volunteer_project;


CREATE TABLE donor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
    payment_info TEXT
);

ALTER TABLE donor ADD COLUMN phone_number VARCHAR(15);

INSERT INTO donor (name, email, payment_info, phone_number)
VALUES ('Jane Doe', 'janedoe@example.com', 'VISA ****1234', '555-555-1234');

SELECT * FROM donor;


CREATE TABLE donation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES donor(id)
);

ALTER TABLE donation ADD COLUMN receipt_sent BOOLEAN;

INSERT INTO donation (donor_id, date, amount, receipt_sent)
VALUES (1, '2022-02-01', 100.00, true);

SELECT * FROM donation;
