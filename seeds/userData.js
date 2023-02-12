const { User } = require('../models');

const userData = 

[
  {
    username: "Jack",
    email: "jack@gmail.com",
    password: "password12345"
  },
  {
    username: "Jill",
    email: "jill@gmail.com",
    password: "password12345"
  },
  {
    username: "Fred",
    email: "fred@gmail.com",
    password: "password12345"
  },
  {
    username: "Frank",
    email: "frank@gmail.com",
    password: "password12345"
  },
  {
    username: "Bruce",
    email: "bruce@gmail.com",
    password: "password12345"
  }

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;