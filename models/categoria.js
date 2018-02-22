'use strict';
module.exports = (sequelize, DataTypes) => {
  var Categorias = sequelize.define('categorias', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    glosa: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });
  return Categorias;
};
