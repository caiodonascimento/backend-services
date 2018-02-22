'use strict';
module.exports = (sequelize, DataTypes) => {
  var atencions = sequelize.define('atencions', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    observaciones: DataTypes.STRING,
    indicaciones: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  atencions.associate = (models) =>{
    atencions.belongsTo(models.reservas, {
      as: 'reservas',
      foreignKey: 'resId'
    })
  };

  return atencions;
};
