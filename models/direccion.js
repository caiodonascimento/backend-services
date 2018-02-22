'use strict';
module.exports = (sequelize, DataTypes) => {
  var Direccion = sequelize.define('direccions', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    userId: DataTypes.STRING,
    direccion1: DataTypes.STRING,
    direccion2: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  Direccion.associate = (models) => {
    Direccion.belongsTo(models.comunas, {
      as: 'comunas',
      foreignKey: 'comId'
    });
  };

  return Direccion;
};
