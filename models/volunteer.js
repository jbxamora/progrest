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
    project_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hours: {
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
    modelName: 'volunteer',
  },
);

// Volunteer.sum('hours').then(sum => {
//   res.render('portal', { Hours })
// })

// Volunteer.findAll({
//   attributes: [
//     'project',
//     [sequelize.fn('sum', sequelize.col('hours')), 'totalHours']
//   ],
//   group: ['project']
// })
//   .then(results => {
//     res.render('portal', { results });
//   });


// Volunteer.count().then(count => {
//   res.render('login', { Volunteers });
//   console.log(count);
// });

module.exports = Volunteer;