const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

// const sequelize = require('../config/connection');
// const seedVolunteer = require('./volunteerData');
// const seedProject = require('./projectData');
// const seedDonation = require('./donationData');
// const seedUser = require('./userData');


// const seedAll = async () => {
//     await sequelize.sync({ force: true });
//     console.log('\n----- DATABASE SYNCED -----\n');
   
//     await seedUser();
//     console.log('\n----- USER SEEDED -----\n');
  
//     await seedProject();
//     console.log('\n----- PROJECT SEEDED -----\n');
  
//     await seedDonation();
//     console.log('\n----- DONATION SEEDED -----\n');
    
//     await seedVolunteer();
//     console.log('\n----- VOLUNTEERS SEEDED -----\n');
//     process.exit(0);
//   };
  
//   seedAll();
