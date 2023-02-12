const { Donation } = require('../models');

const donationData = [
    {
        user_id: 1,
        project_id: 1,
        donation: 100
    },
    {
        user_id: 5,
        project_id: 2,
        donation: 100
    },
    {
        user_id: 4,
        project_id: 3,
        donation: 100
    }
];

const seedDonation = () => Donation.bulkCreate(donationData);

module.exports = seedDonation;