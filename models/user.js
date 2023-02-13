// //by Ryan Pabalate (RZP) 

// //Creatinging Login for volunteers
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const bcrypt = require('bcrypt');

// create our User model (RZP)
// class User extends Model {
//     // set up method to run on instance data (per user) to check pw
//     checkPassword(loginPw) {
//         return bcrypt.compareSync(loginPw, this.password);
//     }
// }

// // define table columns and config (RZP)
// User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [8],
//         },
//       },
//     },

//     {
//         hooks: {
//             //set up beforeCreate lifecycle 'hook' functionality (RZP)
//             // async beforeCreate(newUserData) {
//             //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
//             //     return newUserData;
//             // },
//             //set up beforeUpdate lifecycle 'hook' functionality (RZP)
//             // async beforeUpdate(updatedUserData) {
//             //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//             //     return updatedUserData;
//             // }
//             beforeCreate: async (newUserData) => {
//                 newUserData.password = await bcrypt.hash(newUserData.password, 10);
//                 return newUserData;
//               },
//         },
//         // pass in our imported sequelize connection (the direct connection to our database) (RZP)
//         sequelize,
//         // don't automatically create createdAt/updatedAt timestamp fields (RZP)
//         timestamps: false,
//         // don't pluralize name of database table (RZP)
//         freezeTableName: true,
//         // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`) (RZP)
//         underscored: true,
//         // make it so our model name stays lowercase in the database (RZP)
//         modelName: 'user'
//     }
// );
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
