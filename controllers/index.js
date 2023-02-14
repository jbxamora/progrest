const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.get('/portal', (req, res) => res.render('portal'));
router.get('/signup', (req, res) => res.render('signup'))
router.get('/projects', (req, res) => res.render('projects'));
router.get('/donation', (req, res) => res.render('donation'));
router.get('/volunteer', (req, res) => res.render('volunteer'));
module.exports = router;

