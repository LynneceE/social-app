//import api routes
const router = require('express').Router();

// pull from routes folder
const userRoutes = require('./user-routes'); 
const thoughtRoutes = require('./thought-routes');



router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;