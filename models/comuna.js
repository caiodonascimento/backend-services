'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comuna = sequelize.define('comunas', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    glosa: DataTypes.STRING,
    estatus: {
      type: DataTypes.ENUM,
      values: require('../enums/estatus.json')
    }
  });

  Comuna.associate = (models) => {
    Comuna.belongsTo(models.regions, {
      as: 'regions',
      foreignKey: 'regId'
    });
  };

  return Comuna;
};
