'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservas = sequelize.define('reservas', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    clienteId: DataTypes.STRING,
    extra: DataTypes.BOOLEAN,
    fecha: DataTypes.DATEONLY,
    hora: DataTypes.INTEGER,
    minuto: DataTypes.INTEGER,
    detalle: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    descuento: DataTypes.FLOAT,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  reservas.associate = (models) => {
    reservas.belongsTo(models.profesionals, {
      as: 'profesionals',
      foreignKey: 'proId'
    });
    reservas.belongsTo(models.servicios, {
      as: 'servicios',
      foreignKey: 'serId'
    });
    reservas.belongsTo(models.profesionals, {
      as: 'funcionarioCierra',
      foreignKey: 'proCierraId'
    });
  };

  return reservas;
};
