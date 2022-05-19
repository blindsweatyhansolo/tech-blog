// USER MODEL
// import Sequelize's Model class and DataTypes object
const { Model, DataTypes } = require('sequelize');
// import sequelize model for connection
const sequelize = require('../config/connection');
// require bcrypt for hashing passwords
const bcrypt = require('bcrypt');

class User extends Model {
    // INSTANCE METHOD for password verification on login
    // uses bcrypt's compare method with two parameters: plaintext password from user
    // and hashed password from database (using 'this' keyword)
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

// define User table columns and config
User.init(
    {
        // TABLE COLUMN DEFINITIONS
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // set minumum string length
                len: [6]
            }
        }
    },
    {
        // hook fires just before new instance of User is CREATED or UPDATED
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            // when using beforeUpdate, add the {individualHooks: true} option in subsequent PUT route
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        // TABLE CONFIG METADATA OPTIONS
        sequelize,
        // does not auto create createdAt/updatedAt timestamp fields
        timestamps: false,
        // does not pluralize name of db table
        freezeTableName: true,
        // use underscores instead of camelCasing
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;