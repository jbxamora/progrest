const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const portalRoutes = require('./portalRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;

