const router = require('express').Router();
const { User, Volunteer } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection.js');

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

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/portal');
    return;
  }

  res.render('login');
});

// handle POST request to sign up a new user
router.post('/donation',(req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    project_name: req.body.project_name,
    password: req.body.password,
    
    
  })
.then(userData => {
    req.session.save(() => {
        // req.session.user_id = userData.id;
        req.session.name = userData.name;
        req.session.email = userData.email;
        req.session.project_name = userData.project_name;
        req.session.loggedIn = true;
        res.json(userData);
        // res.redirect('/portal')
    }); 
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
//Get user and add project to template
router.get('/portal', async (req, res) => {
    try {
      console.log(req.session.user_id);
      let userData = await User.findByPk(req.session.user_id); 
  
      const users = userData.get({plain: true});
      console.log(users)
      res.render('portal', {
        users
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error});
    }
  
  });
  
//Be able to go to these pages
router.get('/donation', (req, res) => res.render('donation'));
router.get('/projects', (req, res) => res.render('projects'));
router.get('/donation', (req, res) => res.render('donation'));
router.get('/landing',(req, res) => res.render('landing'));


module.exports = router;




