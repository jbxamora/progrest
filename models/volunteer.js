const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Volunteer extends Model { }

Volunteer.init(
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
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'volunteer',
  },
);

Volunteer.sum('hours').then(sum => {
  res.render('portal', { Hours })
})

Volunteer.count().then(count => {
  res.render('portal', { Volunteers });
});

module.exports = Volunteer;