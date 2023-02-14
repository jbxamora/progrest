const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const mysql = require('mysql');

// Retrieve the JawsDB URL from the environment
const jawsdbUrl = process.env.JAWSDB_URL;

// Create a MySQL connection pool using the JawsDB URL
const pool = mysql.createPool(jawsdbUrl);
const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const homeRoutes = require('./routes/homeRoutes'); RZP taken out because of error

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });



// Define a route that queries the database
app.get('/', (req, res) => {
  pool.query('SELECT * FROM my_table', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});



// Configure and link a session object with the sequelize store
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
// app.use('/', homeRoutes); //taken out because of error
// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// // Define the helper function
// //handle bars were not defined
// Handlebars.registerHelper('displayPartial', function (logoutbutton, options) {
//   let partial = Handlebars.partials[logoutbutton];
//   if (!partial) {
//     partial = Handlebars.compile(`{{> ${logoutbutton}}}`);
//     Handlebars.partials[logoutbutton] = partial;
//   }
//   return new Handlebars.SafeString(partial(options.hash));
// });

// // Define the helper function
// //handlebars were not defined
// Handlebars.registerHelper('displayPartial', function(loginbutton, options) {
//     let partial = Handlebars.partials[loginbutton];
//     if (!partial) {
//         partial = Handlebars.compile(`{{> ${loginbutton}}}`);
//         Handlebars.partials[loginbutton] = partial;
//     }
//     return new Handlebars.SafeString(partial(options.hash));
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//makes public static
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
