<<<<<<< HEAD
const User = require('./user');
// const Donor = require('./Donor');
// const Project = require('./Project');
const Volunteer = require('./volunteer');
const Donation = require('./donation');
=======
const User = require('./User');
const Volunteer = require('./Volunteer');
const Donation = require('./Donation');
>>>>>>> 32a142ebc11ab2b20d41fe815939d2fcdd019434

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