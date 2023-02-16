const sequelize = require('../config/connection');
const { User, Volunteer, Donation} = require('../models');
const userData = require('./userData.json');
const volunteerData = require('./volunteerData.json');
const donationData = require('./donationData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USER SEEDED -----\n');
  
 
  await Volunteer.create({
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- VOLUNTEER SEEDED -----\n');
  

    Donation.create({
      individualHooks: true,
      returning: true,
    });
  
  console.log('\n----- DONATION SEEDED -----\n');
  
  
  process.exit(0);
};

seedDatabase();

