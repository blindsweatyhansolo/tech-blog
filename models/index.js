// import MODEL files
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// MODEL associations
// single User can have MANY Posts
User.hasMany(Post, {
    // link id column in User model to Post model's user_id
    foreignKey: 'user_id'
});

// single Post BELONGS TO single User
Post.belongsTo(User, {
    // link id column in User model to Post model's user_id
    foreignKey: 'user_id'
});

// single User can have MANY Comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// single Comment BELONGS to single User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// single Post can have MANY Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// single Comment BELONGS to single Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };