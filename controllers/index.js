// COLLECTS PACKAGED API ROUTES FROM CONTROLLERS/API/INDEX.JS //
const router = require('express').Router();

// import route scripts
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');

// prefix '/api' to all API paths
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// in case of request to non-existant endpoint, send 404 (RESTful practice)
router.use((req, res) => {
    res.status(404).end();
});

// export module
module.exports = router;