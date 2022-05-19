// import MODEL files
const User = require('./User');
const Post = require('./Post');

// MODEL associations
// single User can have MANY Posts
User.hasMany(Post, {
    // link id column in User model to Post model's user_id
    foreignKey: 'user_id'
});

// (reverse association)
// single Post BELONGS TO single User
Post.belongsTo(User, {
    // link id column in User model to Post model's user_id
    foreignKey: 'user_id'
});


module.exports = { User, Post };