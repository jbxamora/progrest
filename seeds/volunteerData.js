const { Volunteer } = require('../models');

const volunteerData = [
    {
        user_id: 1,
        project_id: 2,
        hours: 3
    },
    {
        user_id: 2,
        project_id: 3,
        hours: 8
    },
    {
        user_id: 3,
        project_id: 1,
        hours: 9
    }
];

const seedVolunteer = () => Volunteer.bulkCreate(volunteerData);

module.exports = seedVolunteer;