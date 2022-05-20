const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

// express-session set up
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: "Super Secret Secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// helpers section placeholder //

// middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for static assests in 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// handlebars set up
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// connection to db and server
sequelize.sync({ force: false })
  .then(() => {
    console.log("Database connected . . .");
    app.listen(PORT, () => console.log(`NOW LISTENING ON PORT ${PORT}`));
});