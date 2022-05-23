// ALL ROUTES FOR POST MODEL (CRUD actions)
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts (/api/posts)
// includes: associated User and Comment data
router.get('/', (req, res) => {
    // access Post model and use Sequelize findAll() method
    Post.findAll({
        // order by MOST RECENT using created_at timestamp
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at',
            'updated_at'
        ],
        include: [
            // include Comment and User model associations
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// GET single post (/api/posts/:id)
// includes: associated User and Comment data
router.get('/:id', (req, res) => {
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
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Server error!' });
        });
});

// POST create new post (/api/posts)
// active session must exist (withAuth)
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT update post's title and contents (/api/posts/:id)
// active session must exist (withAuth)
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_content: req.body.post_content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
          }
          res.json({ message: 'Post updated! '});
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


// DELETE remove post (/api/posts/:id)
// active session must exist (withAuth)
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json({ message: 'Post deleted!' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});


// export module
module.exports = router;