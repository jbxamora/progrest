const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Donation extends Model {}

Donation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Donator_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Donation_amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Receipt_sent:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
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