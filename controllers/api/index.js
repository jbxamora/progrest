const router = require('express').Router();
const userRoutes = require('./userRoutes');
const volunteerRoutes = require('./volunteerRoutes')

router.use('/users', userRoutes);

router.use('/volunteer', volunteerRoutes)

module.exports = router;
