//route for volunteers
const router = require('express').Router();
const { Volunteer, User } = require('../../models');
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

module.exports = router;