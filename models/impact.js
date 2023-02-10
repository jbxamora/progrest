//donation impact

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Impact extends Model { }

Impact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        outreach: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'impact',
    }
);
// Later add more metrics - connect a see more page for impacts
module.exports = Impact;