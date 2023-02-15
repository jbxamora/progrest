const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//use app to call express
const app = express();
const PORT = process.env.PORT || 3001;

//handlebar setup
const hbs = exphbs.create({ helpers });

//COOKIE setup
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

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//able to bring in json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//makes public static
app.use(express.static(path.join(__dirname, 'public')));

//be able to use routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
