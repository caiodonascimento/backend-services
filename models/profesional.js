'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profesional = sequelize.define('profesionals', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT
    },
    userId: DataTypes.STRING,
    cargo: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'cargo']
      }
    ]
  });
  return Profesional;
};
