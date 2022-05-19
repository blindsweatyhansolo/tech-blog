// ALL ROUTES FOR COMMENT MODEL (CRUD actions)
const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

// GET all comments (/api/comments)
// includes associated User and Post data
router.get('/', (req, res) => {
    Comment.findAll({
        // order by MOST RECENT using created_at timestamp
            order: [['created_at', 'DESC']],
            attributes: [
                'id',
                'comment_text',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Post,
                    attributes: ['id', 'title']
                }
            ]
        }
    )
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET single comment (/api/comments/:id)
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['id', 'title']
            }
        ]
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// POST new comment (/api/comments)
// active session must exist (withAuth)
// router.post('/', withAuth, (req, res) => {
router.post('/', (req, res) => {
    // check if session exists before new comment creation
    // if (req.session) {
    //     Comment.create({
    //         comment_text: req.body.comment_text,
    //         post_id: req.body.post_id,
    //         // use id from the session
    //         user_id: req.session.user_id
    //     })
    //     .then(dbCommentData => res.json(dbCommentData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     });
    // }
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


// DELETE comment (/api/comments/:api)
// active session must exist (withAuth)
// router.delete('/', withAuth, (req, res) => {
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Server error!' });
        });
});

// export module
module.exports = router;