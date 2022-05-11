const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// entry point into routes. Catch all route below.
router.use((req, res) => {
  res.send("<h1>Uh oh, this isn't good :)</h1>");
});
//this index.js implements the /api route for all other routes inside /api
module.exports = router;
