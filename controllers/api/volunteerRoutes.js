//route for volunteers
const router = require('express').Router();
const { Volunteer, User } = require('../../models');
const withAuth = require('../../utils/auth');
//GET hours connected to user_id
router.get('/', (req, res) => 
  Volunteer.findAll()
    .then(volunteer => res.json(volunteer))
    .catch(err => res.json(err)));


//GET hours and project name of volunteers
router.get('/hours', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const volunteerData = await Volunteer.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'project_name']
        },
      ],
    });
    console.log(volunteerData);
    // Serialize data so the template can read it
    const volunteers = volunteerData.map((volunteer) => volunteer.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.json(volunteers);
  } catch (err) {
    res.status(500).json(err);
  }
});




// router.post('/volunteer/total', async (req, res) => {
//   try{
//     let hoursData = await Volunteer.findAll({
//     attributes:[[sequelize.fn('SUM', sequelize.col('hours')), 'total_hours']]})
//     // .then(hours =>{
//       // let volunteer.dataValues.total_hours.hours = hours
//       console.log(hoursData),
//       res.render('volunteer', hoursData);
//       // res.sendStatus(200);
//     // });
//   }catch(err) { console.error(err);
//   }
// });

module.exports = router;