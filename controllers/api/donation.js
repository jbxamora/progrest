const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/donation', (req, res) => res.render('donation'));

router.post("/donation", withAuth, (req,res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        project_name: req.body.project_name,
        description: req.body.description,
        address: req.body.address
    })
    .then(userData => {res.json(userData);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err);
      })
  });


  module.exports = router;