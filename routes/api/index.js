//import api routes
const router = require('express').Router();
const userRoutes = require('./user-routes'); // pull from user-routes folder


router.use('/users', userRoutes);

module.exports = router;