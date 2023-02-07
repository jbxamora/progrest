# progrest
As an Agile development team, We're excited to introduce "progrest", a comprehensive project management tool for non-profit organizations. Our goal is to make it easy for non-profits to manage their volunteer hours, donations, and impact metrics in one place. We will create a user-friendly interface for tracking volunteer hours, secure donation processing through a payment gateway, and measuring the impact of different projects. We will prioritize a responsive and accessible design to ensure that non-profits of all sizes can use the platform effectively. With "progrest", non-profits can focus on making a positive difference in the world, while having the tools they need to measure and communicate their impact effectively. Our Agile approach will allow me to deliver frequent updates and quickly iterate based on feedback from users.

## DEVELOPMENT
```md
### Requirements
* Node.js + Express.js to create RESTful API

 https://www.sitepoint.com/rest-api/#:~:text=A%20RESTful%20web%20service%20request,%2F123%3Fformat%3Djson%20.
* Handlebars.js as a template engine

https://handlebarsjs.com/guide/#block-helpers

* MySQL + Sequelize ORM for database

https://sequelize.org/

https://dev.mysql.com/doc/

* Must have both GET and POST requests routes

* Must have one new library/package

Charts.js - implement graph data - https://www.chartjs.org/docs/latest/

Stripe - implement payment processors - https://www.npmjs.com/package/stripe

* Must have MVC paradigm folder structure

* Must include authentication

* Must portect secrets 

* Deployed on Heroku

* Polished UI

* Responsive

* Interactive

* Best practice coding standards

* Professional README

### Presentation

* Overall Concept 

* Motivation

* Design Process

* Tech used + breif description

* App demo

* Directions for future development

### Metrics

* Concept 

* Design

* Functionality

* Repo Quality

* Presentation

* Collaboration
```
Communicate any changes need to file structure adding/removing folders

## Priority List

- [ ] incomplete

- [x] complete

### Volunteer Hours Tracking 

- [ ] Create a database to store volunteer information

- [ ] Use Sequelize ORM to interact with the database

- [ ] Implement GET routes to retrieve volunteer information

- [ ] Implement POST routes to add new volunteer information

### Donations Tracking

 - [ ] Create a database to store donation information

- [ ] Integrate a payment gateway (such as Stripe) to process donations securely

- [ ] Implement GET routes to retrieve donation information

- [ ] Implement POST routes to add new donation information

### User Authentication 

 - [ ] Use express-session and cookies to implement user authentication

- [ ] Implement GET and POST routes to handle user log in and log out

### Deployment on Heroku 

- [ ] Deploy the application using Heroku

- [ ] Test the deployed application to ensure it's accessible from anywhere in the world

### Polished UI 

- [ ] Implement a basic UI using HTML, CSS, and JavaScript

- [ ] Make the UI visually appealing and user-friendly

These are the core features for a minimal working application. As time passes, additional features such as Impact Metrics and Environmental Variable Protection can be added to the application.

## Timeline (2wks)

### Week 1
```py
* Day 1-2: Setting up the development environment and familiarizing with the technologies used 
(Node.js, Express.js, Handlebars.js, MySQL, Sequelize ORM, `express-session`, `cookies`)
* Day 3-4: Designing the database and setting up the Sequelize ORM
* Day 5-6: Implementing the basic RESTful API using Express.js
* Day 7-8: Implementing the user authentication using express-session and cookies
* Day 9-10: Implementing the volunteer hours tracking feature
```
### Week 2
```py
* Day 1-2: Implementing the donations tracking feature and integrating a payment gateway (such as Stripe)
* Day 3-4: Implementing the impact metrics feature
* Day 5-6: Implementing the environment variable protection
* Day 7-8: Deploying the application to Heroku
* Day 9-10: Implementing the polished UI using HTML, CSS, and JavaScript
```

### Volunteer Hours Tracking

Volunteer signs up by providing their name, email, and hours worked
System stores the volunteer information in the database using the Sequelize ORM
Volunteer hours are exposed to the front-end through the Express.js REST API
Volunteer hours can be viewed and updated by authorized users
```md
WHEN a volunteer logs into the system
THEN they will see a list of projects they have previously worked on or can start a new project.

WHEN a volunteer starts a new project
THEN they will enter their name, email, hours worked, and the project name.

WHEN a volunteer submits the new project
THEN the data will be stored in the database using the Sequelize ORM.

WHEN a volunteer wants to view their volunteer hours
THEN they can access the volunteer hours tracking feature and view their total hours worked, hours worked per project, and date range.

WHEN an administrator wants to view volunteer hours for all volunteers
THEN they can access the volunteer hours tracking feature and view total hours worked by each volunteer, hours worked by volunteer per project, and date range.

WHEN an administrator wants to update or delete volunteer hours
THEN they can access the volunteer hours tracking feature, select the volunteer, project, and date range, and make the necessary changes.
```
#### Code Snippet

```js
// CREATE ROUTE
app.post('/volunteers', (req, res) => {
  const { name, email, hoursWorked, projects } = req.body;

  Volunteer.create({
    name,
    email,
    hoursWorked,
    projects
  })
  .then(volunteer => res.status(201).send(volunteer))
  .catch(error => res.status(400).send(error));
});

// READ ROUTE
app.get('/volunteers', (req, res) => {
  Volunteer.findAll()
    .then(volunteers => res.status(200).send(volunteers))
    .catch(error => res.status(400).send(error));
});
```

### Donations Tracking

User decides to make a donation and provides their name, email, amount, and payment information
Payment information is securely processed through a payment gateway such as Stripe
System stores the donation information in the database using the Sequelize ORM
Donation information can be viewed and updated by authorized users
```
WHEN a user wants to make a donation
THEN they will enter their name, email, amount, and payment information.

WHEN a user submits their donation information
THEN the payment gateway (such as Stripe) will securely process the donation.

WHEN a user's donation is successful
THEN the donation information will be stored in the database using the Sequelize ORM.

WHEN a user wants to view their donation history
THEN they can access the donations tracking feature and view their total donations, donation amount, and date range.

WHEN an administrator wants to view donations for all users
THEN they can access the donations tracking feature and view total donations, average donation amount, and date range.

WHEN an administrator wants to update or delete a donation
THEN they can access the donations tracking feature, select the donor, amount, and date range, and make the necessary changes.
```

#### Code Snippet

```js
// CREATE ROUTE
app.post('/donations', (req, res) => {
  const { name, email, amount, date } = req.body;

  Donation.create({
    name,
    email,
    amount,
    date
  })
  .then(donation => res.status(201).send(donation))
  .catch(error => res.status(400).send(error));
});

// READ ROUTE
app.get('/donations', (req, res) => {
  Donation.findAll()
    .then(donations => res.status(200).send(donations))
    .catch(error => res.status(400).send(error));
});
```

### Impact Metrics

System stores project impact information in the database using the Sequelize ORM
Project impact information is displayed to users through the Handlebars.js template engine
Authorized users can update project impact information in the database
```md
WHEN a user wants to view the impact of different projects
THEN they can access the impact metrics feature and view information about the number of people served, the amount of money raised, and other relevant metrics.

WHEN an administrator wants to add or update impact metrics for a project
THEN they can access the impact metrics feature, select the project, and input the updated information.

WHEN a user wants to view the impact of a specific project
THEN they can access the impact metrics feature, select the project, and view the relevant information.

WHEN an administrator wants to compare the impact of different projects
THEN they can access the impact metrics feature and view the information side-by-side for easy comparison.

WHEN an administrator wants to view the overall impact of the organization
THEN they can access the impact metrics feature and view the total impact of all projects.
```

```js
// RENDER IMPACT METRICS PAGE
app.get('/impact-metrics', (req, res) => {
  Project.findAll()
    .then(projects => {
      const data = { projects };
      res.render('impact-metrics', data);
    })
    .catch(error => res.status(400).send(error));
});
```

### User Authentication

User requests to access restricted parts of the application
System prompts the user to log in
User provides their login credentials
System uses express-session and cookies to authenticate the user
User is granted or denied access based on their authentication status
```md
WHEN a new user wants to create an account
THEN they can access the user authentication feature, provide their name, email, and password, and create a new account.

WHEN an existing user wants to log in
THEN they can access the user authentication feature, provide their email and password, and log in to their account.

WHEN a user wants to log out
THEN they can access the user authentication feature and log out of their account.

WHEN a user forgets their password
THEN they can access the user authentication feature and request a password reset via email.

WHEN an administrator wants to view or manage user accounts
THEN they can access the user authentication feature and view or manage user accounts.

WHEN a user session times out
THEN the user will be automatically logged out and will need to log in again to access their account.
```

#### Code Snippet

```js
// SETUP SESSION MIDDLEWARE
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) return res.status(400).send({ error: 'User not found' });

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ error: 'Incorrect password' });
      }

      req.session.user = user;
      res.status(200).send({ message: 'Login successful' });
    })
    .catch(error => res.status(400).send(error));
});

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
req.session.destroy(error => {
if (error) return res.status(400).send(error);

res.status(200).send({ message: 'Logout successful' });
  });
});

// AUTHENTICATION MIDDLEWARE
const authenticate = (req, res, next) => {
if (!req.session.user) return res.status(401).send({ error: 'Unauthorized' });

next();
};
```

### Environment Variable Protection

System stores sensitive information such as payment gateway API keys and database passwords as environment variables
System retrieves the sensitive information from the environment variables as needed
Sensitive information is never stored in plain text in the code
```md
WHEN sensitive information needs to be stored
THEN the information can be stored as an environment variable and protected from being stored in plain text in the code.

WHEN an environment variable needs to be accessed
THEN the environment variable can be accessed by the application and used to perform actions such as accessing an API or connecting to a database.

WHEN the value of an environment variable needs to be changed
THEN the value of the environment variable can be changed without having to modify the code, allowing for quick and easy updates to sensitive information.

WHEN sensitive information is accessed by an unauthorized party
THEN the information will be protected by being stored as an environment variable and not in plain text in the code, reducing the risk of exposure.

WHEN an update to sensitive information is needed
THEN the environment variable can be updated without having to modify the code, allowing for quick and easy updates to sensitive information.
```

#### Code Snippets
```js
// SETUP ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
}

// ACCESSING ENVIRONMENT VARIABLES
const databasePassword = process.env.DATABASE_PASSWORD;
```
### Deployment on Heroku

Code is developed and tested locally
Code is pushed to a remote repository
Heroku builds and deploys the application
Application is accessible to users from anywhere in the world

```md
WHEN the application is ready for deployment
THEN Heroku can be used to host the application and make it accessible to users from anywhere in the world.

WHEN changes are made to the application code
THEN Heroku can be used to quickly and easily deploy the updated code, ensuring that users have access to the latest version of the application.

WHEN the application experiences high traffic
THEN Heroku can automatically scale the application to handle increased traffic, ensuring a fast and reliable experience for users.

WHEN the application needs to be maintained or updated
THEN Heroku provides tools for managing and updating the application, reducing the time and effort 
required for maintenance.

WHEN the application needs to be viewed by users
THEN the application can be accessed via a URL provided by Heroku, making it easy for users to 
find and use the application.

```
### Polished UI

HTML, CSS, and JavaScript code is written to create a polished UI
UI is tested on different devices and browsers
UI is updated and refined as needed
```md
WHEN the front-end of the application is being developed
THEN HTML, CSS, and JavaScript can be used to create a visually appealing and user-friendly interface.

WHEN the design of the interface needs to be refined
THEN CSS can be used to adjust the layout, typography, and visual elements of the interface, 
ensuring a consistent and polished look and feel.

WHEN the functionality of the interface needs to be improved
THEN JavaScript can be used to add interactivity and dynamic behavior to the interface, 
making it more engaging and responsive to user actions.

WHEN the interface needs to be tested
THEN the browser's developer tools can be used to preview and debug the interface, ensuring that it 
looks and works as expected on different devices and screen sizes.

WHEN the application is ready for release
THEN the polished UI can be deployed as part of the Heroku deployment process, providing users with a seamless and visually appealing experience.
```
### User Interaction

Users interact with the application through the front-end
Front-end sends user requests to the back-end through the Express.js REST API
Back-end processes user requests and returns the appropriate response
Front-end updates dynamically to reflect the latest user interactions.

```md
WHEN the front-end of the application is being developed
THEN JavaScript can be used to add interactivity and dynamic behavior to the interface, 
allowing users to interact with the application.

WHEN a user initiates an action
THEN the JavaScript code can capture the user's input and send a request to the back-end using the Express.js REST API.

WHEN the back-end receives the user's request
THEN the appropriate action can be taken, such as updating the volunteer hours tracking database, processing a donation, or calculating impact metrics.

WHEN the action is complete
THEN the back-end can send a response back to the front-end, which can then be used to update the interface
and provide feedback to the user.

WHEN the user needs to log in to access certain features
THEN the user authentication system can be used to verify the user's identity and provide access to the appropriate data.

WHEN the user logs out
THEN the user authentication system can be used to log the user out and clear their session data, ensuring that sensitive information is protected.
```
### Schema (rough)
```md
For volunteer hours tracking:

Volunteer table: stores information about each volunteer, including name, email, and hours worked.

Project table: stores information about each project, including project name and description.

Volunteer-Project table: associates volunteers with the projects they have worked on and the hours they have contributed.

For donation tracking:

Donor table: stores information about each donor, including name, email, and payment information.

Donation table: stores information about each donation, including date, amount, and payment method.

For impact metrics:

Project table: stores information about each project, including project name, description, and impact metrics.

Metric table: stores information about the impact metrics, including the name of the metric, the value, and the project it is associated with.
```
