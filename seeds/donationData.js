const { Donor } = require('../models');

const donorData = [
    {
        donor_id: '1',
        donor_name: 'Jack',
        email:"jack@gmail.com",
        donation: 20
    },
    {
        donor_id: '2',
        donor_name: 'Jill',
        email:"jill@gmail.com",
        donation: 100
    },
    {
        donor_id: '3',
        donor_name: 'Fred',
        email:"fred@gmail.com",
        donation: 700
    }
];

const seedDonation = () => Donation.bulkCreate(donationData);

module.exports = seedDonation;