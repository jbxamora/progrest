const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const homeRoutes = require('./routes/homeRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });
// Define the helper function
Handlebars.registerHelper('displayPartial', function(loginbutton, options) {
    let partial = Handlebars.partials[loginbutton];
    if (!partial) {
        partial = Handlebars.compile(`{{> ${loginbutton}}}`);
        Handlebars.partials[loginbutton] = partial;
    }
    return new Handlebars.SafeString(partial(options.hash));
});

// Define the helper function
Handlebars.registerHelper('displayPartial', function (logoutbutton, options) {
  let partial = Handlebars.partials[logoutbutton];
  if (!partial) {
    partial = Handlebars.compile(`{{> ${logoutbutton}}}`);
    Handlebars.partials[logoutbutton] = partial;
  }
  return new Handlebars.SafeString(partial(options.hash));
});

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use('/', homeRoutes);
// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
