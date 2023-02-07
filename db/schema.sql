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

CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    impact_metrics TEXT
);

CREATE TABLE volunteer_project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volunteer_id INT NOT NULL,
    project_id INT NOT NULL,
    hours INT NOT NULL,
    FOREIGN_KEY (volunteer_id) REFERENCES volunteer(id),
    FOREIGN_KEY (project_id) REFERENCES project(id)
)

CREATE TABLE donor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
    payment_info TEXT
);

CREATE TABLE donation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES donor(id)
);