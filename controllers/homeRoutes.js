const router = require('express').Router();
const { User, Volunteer } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection.js');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the portal
  if (req.session.logged_in) {
    res.redirect('/portal');
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

router.get('/volunteer', async (req, res) => {
  try{
    let hoursData = await Volunteer.findAll({
    attributes:[[sequelize.fn('SUM', sequelize.col('hours')), 'total_hours']]})
    // .then(hours =>{
      // let volunteer.dataValues.total_hours.hours = hours
      console.log(hoursData),
      res.render('volunteer', hoursData);
      // res.sendStatus(200);
    // });
  }catch(err) { console.error(err);
  }
});



module.exports = router;




// router.post('/logout', (req, res) => {
//     // Remove the `loggedIn` property from the session
//     delete req.session.loggedIn;

//     // Redirect the user to the homepage
//     res.redirect('/login');
// });

// // Define your route handlers
// // router.get('/home', (req, res) => {
// //     res.render('home', {});
// // });

// // router.get('/projects', (req, res) => {
// //     res.render('projects', {});
// // });

// // router.get('/contact', (req, res) => {
// //     res.render('contact', {});
// // });
// // router.get('/signup', (req, res) => {
// //     res,render('signup', {})
// // });
// // Use the router in your Express application
// // app.use('/', router); taken out because of error

// // router.get('/', async (req, res) => {
// //   await Volunteer.findAll({
// //     attributes:[[sequelize.fn('SUM', sequelize.col('hours')), 'total_hours']]})
// //     .then(Hours =>{
// //       console.log(Hours);
// //       res.sendStatus(200);;
// //     })
// //     .catch(err => console.error(err));
// // })
// // router.get('/', async (req,res) => {
// //   Volunteer.findAll({
// //     attributes: {
// //       include: [
// //         [sequelize.fn('COUNT', sequelize.col('volunteer_id')), 'n_vol']
// //       ] 
  
// //     }
    
// //   }).then((n_vol)=>{
// //     console.log(n_vol);
// //   })})



// module.exports = router;




