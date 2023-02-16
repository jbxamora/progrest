const User = require('./user');
const Volunteer = require('./volunteer');
const Donation = require('./donation');

//volunteer hours attached to the user
Volunteer.belongsTo(User,{
    foreignKey: 'user_id',

});

//Donations and users are connected to be fixed Donor connects to donation
Donation.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
//export all models
module.exports = {
    User,
    Volunteer,
    Donation,
};