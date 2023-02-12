const User = require('./User');
// const Donor = require('./Donor');
const Project = require('./Project');
const Volunteer = require('./Volunteer');
const Donation = require('./Donation');

Volunteer.belongsTo(User,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Donation.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Volunteer.hasMany(Project, {
//     foreignKey: 'project_id',
//     onDelete: 'CASCADE'
// });


module.exports = {
    User,
    Donation,
    Project,
    Volunteer
};