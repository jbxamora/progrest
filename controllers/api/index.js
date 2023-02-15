const router = require('express').Router();
const userRoutes = require('./userRoutes');
const signupRoutes = require('./donation');

router.use('/users', userRoutes);
router.use('/donation', signupRoutes);

module.exports = router;
