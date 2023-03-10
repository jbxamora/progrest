const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Volunteer extends Model { }

Volunteer.init(
  {

    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'volunteer',
  },

);


module.exports = Volunteer;