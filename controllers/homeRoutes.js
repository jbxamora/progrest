const router = require('express').Router();
const { User, Project } = require('../models');
const withAuth = require('../utils/auth');

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
      let userData = await User.findByPk(req.session.user_id,{
        include: [{model: Project}]
      }); 
  
      const user = userData.get({plain: true})
      console.log(user)
      res.render('portal', {
        user
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error});
    }
    
  
  });
router.get('/signup', (req, res) => res.render('signup'))
router.get('/projects', (req, res) => res.render('projects'));
router.get('/donation', (req, res) => res.render('donation'));
router.get('/landing',(req, res) => res.render('landing'));


module.exports = router;

// const router = require('express').Router();
// const { User, Volunteer, Project } = require('../models');
// const withAuth = require('../utils/auth');
// const sequelize = require('../config/connection.js');

// // Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//     User.findAll({
//         attributes: { exclude: ['password'] }
//     })
//         .then(dbUserData => res.json(dbUserData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get('/login', (req, res) => {
//   // If a session exists, redirect the request to the portal
//   if (req.session.logged_in) {
//     res.redirect('/portal');
//     return;
//   }
//   res.render('login');
// });
// //  router.post('/login', (req, res) => {
// //     // Verify the user's credentials

// //     // If the credentials are valid, set the `loggedIn` property in the session to `true`
// //     req.session.loggedIn = true;
// //     // Redirect the user to the portal page
// //     res.redirect('/portal');
// // });

// router.get('/volunteer', async (req, res) => {
//   try{
//     let hoursData = await Volunteer.findAll({
//     attributes:[[sequelize.fn('SUM', sequelize.col('hours')), 'total_hours']]})
//     // .then(hours =>{
//       // let volunteer.dataValues.total_hours.hours = hours
//       let hours = hoursData.map(hour => hour.get({plain:true}));
//       console.log(hours),
//       res.render('volunteer', {
//         hours
//       });
//       // res.sendStatus(200);
//     // });
//   }catch(err) { console.error(err);
//   }
// });

// router.get('/portal', async (req, res) => {
//   try {
//     console.log(req.session.user_id);
//     let userData = await User.findByPk(req.session.user_id,{
//       include: [{model: Project}]
//     }); 
//     console.log(userData)

//     const user = userData.get({plain: true})
//     console.log(user)
//     res.render('portal', {
//       user
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({error: error});
//   }
  

// });
// router.get('/signup', (req, res) => res.render('signup'))
// router.get('/projects', (req, res) => res.render('projects'));
// router.get('/donation', (req, res) => res.render('donation'));
// router.get('/landing',(req, res) => res.render('landing'));


// module.exports = router;




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




