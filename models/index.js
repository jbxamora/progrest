const User = require('./user');
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
    Volunteer,
    Donation,
};