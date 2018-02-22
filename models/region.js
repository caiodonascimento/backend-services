'use strict';
module.exports = (sequelize, DataTypes) => {
  var Region = sequelize.define('regions', {
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

  Region.associate = (models) => {
    Region.belongsTo(models.pais, {
      as: 'pais',
      foreignKey: 'paisId'
    });
  };

  return Region;
};
