'use strict';
module.exports = (sequelize, DataTypes) => {
  var EntregaServicio = sequelize.define('entregaServicios', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    tipoEntrega: {
      type: DataTypes.ENUM,
      values: require('../enums/tiposEntrega.json')
    },
    valor: DataTypes.FLOAT,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  EntregaServicio.associate = (models) => {
    EntregaServicio.belongsTo(models.profesionals, {
      as: 'profesionals',
      foreignKey: 'proId'
    });
    EntregaServicio.belongsTo(models.servicios, {
      as: 'servicios',
      foreignKey: 'serId'
    });
  };

  return EntregaServicio;
};
