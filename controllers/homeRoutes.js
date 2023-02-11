const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const handlebars = require('handlebars');


// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('portal', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.post('/login', (req, res) => {
    // Verify the user's credentials

    // If the credentials are valid, set the `loggedIn` property in the session to `true`
    req.session.loggedIn = true;

    // Redirect the user to the portal page
    res.redirect('/portal');
});

router.get('/portal', (req, res) => {
    // Check if the user is logged in
    if (req.session.loggedIn) {
        // If the user is logged in, render the portal page
        res.render('portal', {});
    } else {
        // If the user is not logged in, redirect them to the login page
        res.redirect('/login');
    }
});

router.post('/logout', (req, res) => {
    // Remove the `loggedIn` property from the session
    delete req.session.loggedIn;

    // Redirect the user to the homepage
    res.redirect('/');
});

// Define your route handlers
router.get('/home', (req, res) => {
    res.render('home', {});
});

router.get('/projects', (req, res) => {
    res.render('projects', {});
});

router.get('/contact', (req, res) => {
    res.render('contact', {});
});

// Use the router in your Express application
// app.use('/', router); taken out because of error



module.exports = router;
