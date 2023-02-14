const { Volunteer } = require('../models');

const volunteerData = [
    {
        hours: 3,
        user_id: 1,
        project_id: 1
    },
    {
        hours: 8,
        user_id: 2,
        project_id: 2
        
    },
    {
        hours: 9,
        user_id: 2,
        project_id: 2
        
    }
];

const seedVolunteer = () => Volunteer.bulkCreate(volunteerData);

module.exports = seedVolunteer;
console.log(volunteerData);