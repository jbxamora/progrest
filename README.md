
# progrest
As an Agile development team, We're excited to introduce "progrest", a comprehensive project management tool for non-profit organizations. Our goal is to make it easy for non-profits to manage their volunteer hours, donations, and impact metrics in one place. We will create a user-friendly interface for tracking volunteer hours, secure donation processing through a payment gateway, and measuring the impact of different projects. We will prioritize a responsive and accessible design to ensure that non-profits of all sizes can use the platform effectively. With "progrest", non-profits can focus on making a positive difference in the world, while having the tools they need to measure and communicate their impact effectively. Our Agile approach will allow me to deliver frequent updates and quickly iterate based on feedback from users.

## User Story
```md
AS A NON-PROFIT ORGANIZATION,
 I want a comprehensive project management tool that can help me 
 manage volunteer hours, donations, and impact metrics in one place. 
 With "progrest," I can easily track volunteer hours, 
 securely process donations through a payment gateway, and measure the impact of different projects. 
 The user-friendly interface and responsive design will allow me 
 to use the platform effectively, regardless of the size of my non-profit. 
 "progrest" will help me focus on making a positive difference in the world, 
 while also providing the tools I need to measure and communicate my impact effectively.
 ```

 ## Acceptance Criteria

### Volunteer Hours Tracking
```md
When the database for volunteer information is created, 
Then it should be able to store volunteer information accurately.
When Sequelize ORM is used to interact with the volunteer information database, 
Then it should be able to retrieve and add new volunteer information efficiently.
When a GET route is implemented to retrieve volunteer information, 
Then it should return accurate and up-to-date information.
When a POST route is implemented to add new volunteer information,
Then it should be able to add the information to the database accurately and efficiently.
```
### Donations Tracking
```md
When the database for donation information is created, 
Then it should be able to store donation information accurately.
When a payment gateway such as Stripe is integrated into the application,
Then it should securely process donations and store the information accurately.
When a GET route is implemented to retrieve donation information,
Then it should return accurate and up-to-date information.
When a POST route is implemented to add new donation information
Then it should be able to add the information to the database accurately and efficiently.
```
### User Authentication
```md
When express-session and cookies are used to implement user authentication,
Then it should provide secure and efficient authentication for users.
When GET and POST routes are implemented to handle user log in and log out,
Then they should provide a smooth and user-friendly experience.
```
### Deployment on Heroku
```md
When the application is deployed using Heroku, 
Then it should be accessible from anywhere in the world.
When the deployed application is tested, 
Then it should be fully functional and free of errors.
```
### Polished UI
```md
When a basic UI is implemented using HTML, CSS, and JavaScript, 
Then it should be visually appealing and easy to use.
When the UI is tested, it should be fully functional and free of errors.
```


## Table of Contents

- [Introduction](#progrest)
- [Demo](#Demo)
- [Roadmap](#Roadmap)
- [Code Snippets](#Examples)
- [Tech](#Tech-Stack)
- [Features](#Features)
- [Contributing](#contributing)
- [Authors](#Authors)
- [FAQ](#FAQ)
- [License](#license)

## Demo

Check out our app through your browser or mobile device!

https://progrest.herokuapp.com/landing

![Picture of Progrest Landing Page](public/assets/img/Screen%20Shot%202023-02-16%20at%205.23.25%20PM.png) 


## Roadmap

### Week 1
#### Day 1
- Set up the development environment, including installing Node.js, Express.js, Handlebars.js, MySQL, Sequelize ORM, express-session, and cookies.
- Familiarize with the technologies used.
- Design the database schema and set up Sequelize ORM.
#### Day 2
- Create the necessary models and associations.
- Implement the basic RESTful API using Express.js.
#### Day 3
- Implement user authentication using express-session and cookies.
- Create the routes for user login and logout.
#### Day 4
- Implement the volunteer hours tracking feature.
- Create the routes for retrieving and adding volunteer information.
- Test and debug the features implemented so far.
### Week 2
#### Day 1
- Implement the donations tracking feature and integrate a payment gateway (such as Stripe).
- Create the routes for retrieving and adding donation information.
#### Day 2
- Implement the impact metrics feature.
- Create the necessary calculations and routes to display the metrics.
- Implement environment variable protection to ensure the security of sensitive information.
#### Day 3
- Test and debug the security feature.
- Deploy the application to Heroku to make it accessible from anywhere in the world.
#### Day 4
- Implement the polished UI using HTML, CSS, and JavaScript.
- Test and debug the UI to ensure responsiveness and compatibility.
- Perform final testing and debugging on the application before launch.
## Examples
### User Auth
Implemented into the user model.
```javascript
//check password and compare bycrypt

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
```

```javascript
 {//hooks called before new instance created and before an instance is updated
    //bcrypt to hash password
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
```

Then in our homeRoutes 
```javascript
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));
    console.log(users)
    res.render('portal', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
```
### Cookies

```javascript
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
```
### New User

```javascript
// handle POST request to sign up a new user
router.post('/donation', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      // req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.email = userData.email;
      req.session.project_name = userData.project_name;
      req.session.loggedIn = true;
      res.json(userData);
      // res.redirect('/portal')
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
```
### Seed

```javascript
//seedDatabase using seq sync
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

```
## Tech Stack

**Server-side Language:** JavaScript (Node.js)
**Web Framework:** Express.js
**Database Management System:** MySQL
**Object-Relational Mapping (ORM) Tool:** Sequelize ORM
**Front-end Technologies:** HTML, CSS, JavaScript (with support from Handlebars.js for templating)
**Payment Gateway Integration:** Stripe
**User Authentication Libraries:** express-session, cookies
**Deployment Platform:** Heroku

## Features

- Volunteer hours tracking
- Donations tracking
- Secure payment processing through a payment gateway (such as Stripe)
- Impact metrics measurement
- User authentication using express-session and cookies
- Responsive and accessible UI design using HTML, CSS, and JavaScript (with support from Handlebars.js for templating)
- Integration with MySQL database using Sequelize ORM
- RESTful API for retrieving and adding volunteer and donation information
- Deployment on Heroku


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@jbxamora](https://www.github.com/jbxamora)
- [@rypab4](https://www.github.com/rypab4)



## FAQ

#### What is "progrest"?

"progrest" is a comprehensive project management tool for non-profit organizations.

#### Who can use "progrest"?

"progrest" is designed for non-profit organizations of all sizes who want to track volunteer hours, donations, and impact metrics in one place.

#### How do I access "progrest"?

"progrest" is a web-based application that can be accessed through a web browser.

#### What information can I track with "progrest"?

"progrest" allows you to track volunteer hours, donations, and impact metrics for different projects.

#### How do I add volunteer information to "progrest"?

Volunteer information can be added to "progrest" through the user-friendly interface.

#### Can I securely process donations through "progrest"?

Yes, donations can be securely processed through "progrest".

#### What payment gateways does "progrest" integrate with?

"progrest" will eventaully integrate with popular payment gateways such as Stripe.

#### How do I view my donation information in "progrest"?

Donation information can be viewed in "progrest" through the user-friendly interface.

#### Can I view my volunteer and donation metrics in one place?

Yes, volunteer and donation metrics can be viewed in one place on the portal page through "progrest".

#### How does user authentication work in "progrest"?

User authentication in "progrest" is implemented using express-session and cookies.

#### Is my data secure in "progrest"?

Yes, data in "progrest" is securely stored in a database.

#### How often will "progrest" be updated?

"progrest" will be updated frequently based on user feedback and needs.

#### Is there a fee for using "progrest"?

"progrest" is designed for non-profit organizations and is offered free of charge.

#### Who can I contact for support with "progrest"?

For support with "progrest", please contact the development team through the repository or email.






## License

[MIT](https://choosealicense.com/licenses/mit/)