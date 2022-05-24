// ALL ROUTES FOR COMMENT MODEL (CRUD actions)
const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

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
router.post('/', withAuth, (req, res) => {
    // check if session exists before new comment creation
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use id from the session
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// PUT update comment (/api/comments/:id)
router.put('/:id', withAuth, (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({message: 'No comment matching id!'});
            return;
        }

        res.json({message: 'Comment updated!'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE comment (/api/comments/:api)
// active session must exist (withAuth)
router.delete('/:id', withAuth, (req, res) => {
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