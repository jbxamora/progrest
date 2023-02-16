const router = require('express').Router();
const userRoutes = require('./userRoutes');
const volunteerRoutes = require('./volunteerRoutes')
//www."website"/api/users will use userRoutes
router.use('/users', userRoutes);
//www."website"/api/volunteer will use volunteerRoutes
router.use('/volunteer', volunteerRoutes)

module.exports = router;
