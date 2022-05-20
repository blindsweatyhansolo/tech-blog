// ROUTES FOR DASHBOARD
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// active session must exist, otherwise redirect to login
// router.get('/', withAuth, (req, res) => {
router.get('/', (req, res) => {
    // render all posts from signed in user
    console.log(req.session);
    if (req.session.loggedIn) {
        Post.findAll({
            where: {
                // use id from session
                user_id: req.session.user_id
            },
            order: [['created_at', 'DESC']],
            attributes: [
                'id',
                'title',
                'post_content',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

        // res.render('dashboard', { loggedIn: req.session.loggedIn });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;