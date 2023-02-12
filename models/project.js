const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Project extends Model { }

Project.init(
    {
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        impact_metrics: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    },
);

Project.getAllProjects = async function () {
    return await Project.findAll();
};

module.exports = Project;

