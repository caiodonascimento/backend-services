'use strict';
module.exports = (sequelize, DataTypes) => {
  var adjunto = sequelize.define('adjuntos', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    nombre: DataTypes.STRING,
    blob: DataTypes.BLOB,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  adjunto.associate = (models) => {
    adjunto.belongsTo(models.atencions, {
      as: 'atencions',
      foreignKey: 'ateId'
    });
  };

  return adjunto;
};
