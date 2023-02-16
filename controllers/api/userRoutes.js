const router = require('express').Router();
const { User, Volunteer} = require('../../models');
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

router.get('/', (req, res) => 
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.json(err)));


// handle GET request for the sign-up form
router.get('/donation', (req, res) => res.render('donation'));

// delete by user_id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/hours', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
      include: [
        {
          model: Volunteer,
          attributes: ['hours']
        },
      ],
    });
    
    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    // Pass serialized data and session flag into template
    res.send(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


