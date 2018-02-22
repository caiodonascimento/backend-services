'use strict';
module.exports = (sequelize, DataTypes) => {
  var Servicio = sequelize.define('servicios', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    glosa: DataTypes.STRING,
    valorBase: DataTypes.FLOAT,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  Servicio.associate = (models) => {
    Servicio.belongsTo(models.categorias, {
      as: 'categorias',
      foreignKey: 'catId'
    });
  };

  return Servicio;
};
