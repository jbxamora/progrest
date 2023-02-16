const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//www."website"/ will use homeRoutes
router.use('/', homeRoutes);

//www."website"/api will use api folder
router.use('/api', apiRoutes);


module.exports = router;

