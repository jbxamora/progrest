const router = require('express').Router();
const { User } = require('../../models');

router.post("/signup", (req,res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
  
          res.json(dbUserData);
        })
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err);
      })
  });


  module.exports = router;