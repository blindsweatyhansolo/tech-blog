// ALL ROUTES FOR USER MODEL (CRUD actions)
const router = require('express').Router();
const { User } = require('../../models');

// GET all users (/api/users)
router.get('/', (req, res) => {
    // access User model and use Sequelize findAll() method
    User.findAll({
        // will not return password column value
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// GET single user (/api/users/:id)
router.get('/:id', (req, res) => {
    // access User model and use Sequelize findOne() method
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            // POST, COMMENT model associations here
        ]
    })
    .then(dbUserData => {
        // if id does not match existing user
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// POST create new user (/api/users)
router.post('/', (req, res) => {
    // access User model and use Sequelize create() method
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        // give server easy access to user's user_id/username and Boolean value for login status
        // session must be created BEFORE sending response back [req.session.save() method initiates
        // creation of session, then runs callback function]
        // req.session.save(() => {
        //     req.session.user_id = dbUserData.id;
        //     req.session.username = dbUserData.username;
        //     req.session.loggedIn = true;

        //     res.json(dbUserData);
        // })
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// POST login route (/login)
// POST method for login is a more secure way of transferring data from client to server
router.post('/login', (req, res) => {
    // use email as parameter for Sequelize findOne() method
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        // 400 response if email is invalid / does not exist
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with that email address!' });
            return;
        }
        
        // verify user using User model instance method checkPassword()
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            alert('Incorrect password!');
            res.status(400).json({ message: 'Incorrect password! '});
            return;
        }

        // req.session.save(() => {
        //     // declare session variables
        //     req.session.user_id = dbUserData.id;
        //     req.session.username = dbUserData.username;
        //     req.session.loggedIn = true;

        //     res.json({ user: dbUserData, message: 'You are now logged in!'});
        // });
        res.json({ user: dbUserData, message: 'You are now logged in!'});
    });
});

// POST logout route (/logout)
// route destroys session

// PUT update user password via id (/api/users/:id)
router.put('/:id', (req, res) => {
    // access User model and use Sequelize update() method
    // update() combines params for creating/updating and looking up data
    User.update(req.body, {
        // individualHooks MUST be declared when using bcrypt's hashing functions
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// DELETE single user (/api/users/:id)
router.delete('/:id', (req, res) => {
    // access User model and use Sequelize destroy() method
    // destroy() combines params for deleting and looking up data
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error!' });
    });
});

// export module
module.exports = router;