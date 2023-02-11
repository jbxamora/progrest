//by Ryan Pabalate (RZP) 

//Creatinging Login for volunteers
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model (RZP)
class User extends Model {
    // set up method to run on instance data (per user) to check pw
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and config (RZP)
User.init(
    {
        //define an id column (RZP)
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is (RZP)
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option (RZP)
            allowNull: false,
            // instruct that this is the Primary Key (RZP)
            primaryKey: true,
            // turn on auto increment (RZP)
            autoIncrement: true
        },
        // define a username column (RZP)
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            //cannot be more than one username (RZP)
            unique: true
        },
        // define a password column (RZP)
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least eight characters long (RZP)
                len: [8]
            }
        }
    },

    {
        hooks: {
            //set up beforeCreate lifecycle 'hook' functionality (RZP)
            // async beforeCreate(newUserData) {
            //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
            //     return newUserData;
            // },
            //set up beforeUpdate lifecycle 'hook' functionality (RZP)
            // async beforeUpdate(updatedUserData) {
            //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            //     return updatedUserData;
            // }
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },
        },
        // pass in our imported sequelize connection (the direct connection to our database) (RZP)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields (RZP)
        timestamps: false,
        // don't pluralize name of database table (RZP)
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`) (RZP)
        underscored: true,
        // make it so our model name stays lowercase in the database (RZP)
        modelName: 'user'
    }
);

module.exports = User;