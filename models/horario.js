'use strict';
module.exports = (sequelize, DataTypes) => {
  var horario = sequelize.define('horarios', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    dia: {
      type: DataTypes.ENUM,
      values: require('../enums/dias.json')
    },
    inicio: DataTypes.TIME,
    fin: DataTypes.TIME,
    desde: DataTypes.DATE,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  horario.associate = (models) => {
    horario.belongsTo(models.profesionals, {
      as: 'profesionals',
      foreignKey: 'proId'
    })
  };

  return horario;
};
