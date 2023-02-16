const sequelize = require('../config/connection');
const { User, Volunteer, Donation} = require('../models');
const userData = require('./userData.json');
const volunteerData = require('./volunteerData.json');
const donationData = require('./donationData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- USER SEEDED -----\n');
  
  for(const volunteer of volunteerData){
  await Volunteer.create({
      ...volunteer,
      user_id: users[Math.floor(Math.random() * users.length)].id,
  });
}
  console.log('\n----- VOLUNTEER SEEDED -----\n');
  
  for(const donation of donationData){
    await Donation.create({
        ...donation,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log('\n----- DONATION SEEDED -----\n');
  
  
  process.exit(0);
};

seedDatabase();

