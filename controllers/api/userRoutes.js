const router = require('express').Router();
const { User } = require('../../models');
// const bodyParser = require('body-parser');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);
    // const validPassword = await userData.password;
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
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


// handle GET request for the sign-up form
router.get('/donation', (req, res) => res.render('donation'));

// handle POST request to sign up a new user
router.post('/donation', async(req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    project_name: req.body.project_name
})
.then(userData => {
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.project_name = userData.project_name;;
        req.session.loggedIn = true;
        res.json(userData);
        res.redirect('/portal')
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
  // User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   })
    // send a success response back to the client
    


    
    // .then(res.send(`User ${user.name} created successfully!`)
    // ) 
    // .catch(err => {
    // console.error(err);
    // send an error response back to the client
//     res.status(500).send('An error occurred while creating the user');
//   })
// });
module.exports = router;


