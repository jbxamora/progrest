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

router.get('/portal', async (req, res) => {
    try {
      console.log(req.session.user_id);
      let userData = await User.findByPk(req.session.user_id); 
  
      const users = userData.get({plain: true});
      console.log(users.project_name, users)
      res.render('portal', {
        users
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error});
    }
  
  });

  

router.get('/projects', (req, res) => res.render('projects'));
router.get('/donation', (req, res) => res.render('donation'));
router.get('/landing',(req, res) => res.render('landing'));


module.exports = router;




