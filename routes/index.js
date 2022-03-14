// import routes
const router = require('express').Router();
const apiRoutes = require('./api'); // pull from api folder


router.use('/api', apiRoutes);


router.use((req, res) => {
    //if api route isnt used
    res.status(404).send('<h1>⛔ Wrong Route!!</h1>');
});

module.exports = router;