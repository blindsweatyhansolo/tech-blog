// ROUTES FOR HOMEPAGE
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// GET root route (GET all posts for homepage on load)
router.get('/', (req, res) => {
    // find all posts
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
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
        // serialize data before rendering page
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // render homepage, object(s) to be passed into template
        res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

module.exports = router;