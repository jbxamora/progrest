const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Donor extends Model { }
//Donor to worked with in the future
Donor.init(
    {
        donor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        donor_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate,
            isEmail: true,
        },
        donation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'donor',
    },
);

module.exports = Donor;