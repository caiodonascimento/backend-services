'use strict';
module.exports = (sequelize, DataTypes) => {
  var accion = sequelize.define('accions', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    userId: DataTypes.STRING,
    accion: DataTypes.STRING,
    origen: DataTypes.STRING
  });
  return accion;
};
