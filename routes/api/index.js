const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const router = require('express').Router();



router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


module.exports = router;