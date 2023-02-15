const router = require('express').Router();
const userRoutes = require('./userRoutes');
const signupRoutes = require('./signup');

router.use('/users', userRoutes);
router.use('/donations', signupRoutes);

module.exports = router;
