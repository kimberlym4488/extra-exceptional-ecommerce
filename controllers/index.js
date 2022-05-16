const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// entry point into routes.
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// 404 page fallback (catch all route)
router.use('*', (req, res) => {
  res.status(404).render('404');
});
//this index.js implements the /api route for all other routes inside /api
module.exports = router;
