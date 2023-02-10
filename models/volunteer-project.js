const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class VProject extends Model { }

VProject.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        volunteer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'volunteer',
                key: 'id',
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'project',
                key: 'id',
            }
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vproject',
    },
);

module.exports = VProject;

