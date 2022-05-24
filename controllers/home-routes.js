// ROUTES FOR HOMEPAGE
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// GET root route (GET all posts for homepage on load)
router.get('/', (req, res) => {
    console.log(req.session);
    
    // find all posts
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at',
            'updated_at'
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
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// GET route for single-post via post:id
router.get('/post/:id', (req, res) => {
    // find single post by id
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at',
            'updated_at'
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!'});
            return;
        }

        // serialize data
        const post = dbPostData.get({ plain: true });

        // pass to template, second variable set as loggedIn status
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            mutated: post.created_at < post.updated_at ? true : false
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// GET route for login/signup page
router.get('/login', (req, res) => {
    // check for session, redirect to homepage if true
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login', {loggedIn: req.session.loggedIn});
});

module.exports = router;