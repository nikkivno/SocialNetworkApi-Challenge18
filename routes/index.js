const router = require('express').Router();
const apiRoutes = require('./api');

// api/
router.use('/api', apiRoutes);

// no matches
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
