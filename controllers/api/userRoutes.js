const router = require('express').Router();

const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });
  console.log("ROUTE" + userData.password)
    if (!userData) {
      
      res
        .status(400)
        .json({ message: 'Incorrect email' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.password;
    console.log("PASS" + req.body.password)
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      console.log("COOKIE" + userData)
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// router.post('/login', async (req, res) => {
//   try{
//     let hoursData = await User.findAll({
//     attributes:[[sequelize.fn('SUM', sequelize.col('hours')), 'total_hours']]})
//     // .then(hours =>{
//       // let volunteer.dataValues.total_hours.hours = hours
//       console.log(hoursData),
//       res.render('volunteer', hoursData);
//       // res.sendStatus(200);
//     // });
//   }catch(err) { console.error(err);
//   }
// });
// router.get('/portal/:id', (req,res) => {
//   Recipe.findOne({
//       where: {
//         id: req.params.id
//       },
//       attributes: [
//         'id',
//         'name',
//         'email',
//         'project',
//         'project_id',
//         'user_id',
//         'project_name',
//       ],
//       include: [
//         {
//           model: Volunteer,
//           attributes: ['id', 'project_id', 'user_id'],
//           include: {
//             model: User,
//             attributes: ['name']
//           }
//         },
//         {
//           model: Volunt,
//           attributes: ['username']
//         }
//       ]
//   })
//   .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       const recipe = dbPostData.get({ plain: true });
//       res.render('single-recipe', {
//         recipe,
//         loggedIn: req.session.loggedIn
//       });
//   })
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   });
// })
// router.get('/portal')


module.exports = router;
