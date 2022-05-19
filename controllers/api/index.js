// PACKAGES ALL ROUTE ENDPOINT MODULES FOR SERVER USE //
const router = require('express').Router();

// import individual routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// appends '/users' to all user API route paths
router.use('/users', userRoutes);
// appends '/posts' to all post API route paths
router.use('/posts', postRoutes);
// appends '/comments' to all comment API route paths
router.use('/comments', commentRoutes);

module.exports = router;