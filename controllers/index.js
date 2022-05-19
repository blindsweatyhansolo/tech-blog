// COLLECTS PACKAGED API ROUTES FROM CONTROLLERS/API/INDEX.JS //
const router = require('express').Router();

// import route scripts
const apiRoutes = require('./api');

// prefix '/api' to all API paths
router.use('/api', apiRoutes);

// in case of request to non-existant endpoint, send 404 (RESTful practice)
router.use((req, res) => {
    res.status(404).end();
});

// export module
module.exports = router;