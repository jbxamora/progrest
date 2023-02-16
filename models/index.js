const User = require('./user');
const Volunteer = require('./volunteer');
const Donation = require('./donation');

Volunteer.belongsTo(User,{
    foreignKey: 'user_id',

});


Donation.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Volunteer,
    Donation,
};