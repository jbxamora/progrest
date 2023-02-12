const { Volunteer } = require('../models');

const volunteerData = [
    {
        volunteer_id: '1',
        name: 'Jack',
        address:"1 Elm St., New York, NY",
        hours: 3
    },
    {
        volunteer_id: '2',
        name: 'Fred',
        address:"2 Elm St., New York, NY",
        hours: 8
    },
    {
        volunteer_id: '3',
        name: 'Jill',
        address:"3 Elm St., New York, NY",
        hours: 9
    }
];

const seedVolunteer = () => Volunteer.bulkCreate(volunteerData);

module.exports = seedVolunteer;