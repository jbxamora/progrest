const User = require('./user');
// const Donor = require('./Donor');
// const Project = require('./Project');
const Volunteer = require('./volunteer');
const Donation = require('./donation');

Volunteer.hasMany(User,{
    foreignKey: 'user_id',

});

User.belongsTo(Volunteer,{
    foreignKey: 'user_id',

});

Donation.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Donation,
    Volunteer
};