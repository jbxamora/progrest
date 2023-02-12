const { User } = require('../models');

const UserData = 

[
  {
    "email": "jack@gmail.com",
    "password": "password12345"
  },
  {
    "email": "jill@gmail.com",
    "password": "password12345"
  },
  {
    "name": "fred",
    "email": "fred@gmail.com",
    "password": "password12345"
  }

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;