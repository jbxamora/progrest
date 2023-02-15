const User = require('./user');
const Project = require('./project');
const Volunteer = require('./volunteer');

Volunteer.hasMany(User,{
    foreignKey: 'user_id',

});

User.belongsTo(Volunteer,{
    foreignKey: 'user_id',

});

// Donation.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

module.exports = {
    User,
    Volunteer
};