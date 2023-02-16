//route for volunteers
const router = require('express').Router();
const { Volunteer, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const volunteerData = await Volunteer.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'project_name']
        },
      ],
    });
    console.log(volunteerData);
    // Serialize data so the template can read it
    const volunteers = volunteerData.map((volunteer) => volunteer.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.send(volunteers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all volunteers
// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const volunteerData = await Volunteer.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name', 'project_name']
//         },
//       ],
//     });
    

//     // Serialize data so the template can read it
//     const volunteers = volunteerData.map((volunteer) => volunteer.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.send(volunteers);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/', async (req, res) => {
//   try{
//     const volunteerData = await Volunteer.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name', 'project']
//         }
//       ]
//     }));
//   }
//     const volunteers = volunteerData.map((volunteer) => volunteer.get({plain: true}));
//     res.json(volunteers);
//   }catch(err){ res.status(500).json(err);
// })






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