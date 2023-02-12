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
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id'
    }
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
// const totalAmount = await DONATIONS.findAll({
//   attributes: [
//     [sequelize.fn('sum', sequelize.col('hours')), 'total hours'],
//   ],
// });



// Volunteer.findAll({
//     attributes: {
//       include: [
//         [sequelize.fn('COUNT', sequelize.col('volunteer_id')), 'n_vol']
//       ] 

//     }
    
//   }).then((data)=>{
//     console.log(data);
//   })

// Volunteer.count().then(count => {
//   res.render('login', { Volunteers });
//   console.log(count);
// });

module.exports = Volunteer;