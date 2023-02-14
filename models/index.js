const User = require('./User');
// const Donor = require('./Donor');
const Project = require('./Project');
const Volunteer = require('./Volunteer');
const Donation = require('./Donation');

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