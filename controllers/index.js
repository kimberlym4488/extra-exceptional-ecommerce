const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// entry point into routes. Catch all route below.
// 404 page fallback
router.use('*', (req, res) => {
  res.status(404).render('404');
});
//this index.js implements the /api route for all other routes inside /api
module.exports = router;
