// POST MODEL
// import Sequelize's Model class and DataTypes object
const { Model, DataTypes } = require('sequelize');
// import sequelize model for connection
const sequelize = require('../config/connection');

class Post extends Model {};

// define Post table columns and config
Post.init(
    {
        // TABLE COLUMN DEFINITIONS
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            // foreign key association with user
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // TABLE CONFIG METADATA OPTIONS
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;