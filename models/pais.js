'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pais = sequelize.define('pais', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    glosa: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });
  return Pais;
};
