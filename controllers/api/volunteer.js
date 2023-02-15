//route for volunteers
const router = require('express').Router();
const { Volunteer } = require('../../models/Volunteer');
const withAuth = require('../../utils/auth');

// get all volunteers
router.get('/', (req, res) => {
    Volunteer.findAll({
        attributes: [
            'id',
            'volunteer_name',
            'organization',
            'hours',

        ]
        
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all volunteers by organization
router.get('/:organization', (req, res) => {
  Recipe.findAll({
      where: {
        category: req.params.category
      },
      attributes: [
            'id',
            'volunteer_name',
            'organization',
            'hours',

      ]

  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get one volunteer
router.get('/:id', (req, res) => {
    Volunteer.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'volunteer_name',
        'organization',
        'hours',
      ]

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


router.post('/', withAuth, (req, res) => {
    Volunteer.create({
      volunteer_name: req.body.volunteer_name,
      volunteer_org: req.body.volunteer_org,
      volunteer_hours: req.body.volunteer_hours,

    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// update by user_id
router.put('/:id', withAuth, (req, res) => {
    Volunteer.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No one found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// delete by user_id
router.delete('/:id', withAuth, (req, res) => {
    Volunteer.destroy({
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
router.get('/volunteer', async (req, res) => res.render('volunteer'))

router.post('/volunteer', async (req, res) => {
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