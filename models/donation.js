const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Donation extends Model {}
// Donation to be worked with in the future
Donation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    donation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'donation',
  },
);

module.exports = Donation;