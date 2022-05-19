// PACKAGES ALL ROUTE ENDPOINT MODULES FOR SERVER USE //
const router = require('express').Router();

// import individual routes
const userRoutes = require('./user-routes');

// appends '/users' to all user API route paths
router.use('/users', userRoutes);

module.exports = router;