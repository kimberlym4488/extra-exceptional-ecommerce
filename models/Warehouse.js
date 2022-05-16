const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Warehouse extends Model {}
//contains our primary key for warehouse_id
Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
    },

    warehouse_name: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'warehouse',
  }
);

module.exports = Warehouse;
