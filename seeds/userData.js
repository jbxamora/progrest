const { User } = require('../models');

const userData = 

[
  {
    user: "Jack",
    email: "jack@gmail.com",
    password: "password12345"
  },
  {
    user: "Jill",
    email: "jill@gmail.com",
    password: "password12345"
  },
  {
    user: "Fred",
    email: "fred@gmail.com",
    password: "password12345"
  },
  {
    user: "Frank",
    email: "frank@gmail.com",
    password: "password12345"
  },
  {
    user: "Bruce",
    email: "bruce@gmail.com",
    password: "password12345"
  }

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;