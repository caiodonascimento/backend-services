'use strict';
module.exports = (sequelize, DataTypes) => {
  var excepcion = sequelize.define('excepcions', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    fecha: DataTypes.DATEONLY,
    todoDia: DataTypes.BOOLEAN,
    paraTodos: DataTypes.BOOLEAN,
    inicio: DataTypes.TIME,
    fin: DataTypes.TIME,
    tipo: {
      type: DataTypes.ENUM,
      values: require('../enums/tipoJustificacion.json')
    },
    justificacion: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  excepcion.associate = (models) => {
    excepcion.belongsTo(models.profesionals, {
      as: 'profesionals',
      foreignKey: 'proId'
    });
    excepcion.belongsTo(models.profesionals, {
      as: 'usuarioAutorizador',
      foreignKey: 'autorizadorId'
    });
  };

  return excepcion;
};
