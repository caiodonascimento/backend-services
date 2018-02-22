'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('excepcions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      todoDia: {
        type: Sequelize.BOOLEAN
      },
      paraTodos: {
        type: Sequelize.BOOLEAN
      },
      inicio: {
        type: Sequelize.TIME
      },
      fin: {
        type: Sequelize.TIME
      },
      tipo: {
        type: Sequelize.ENUM,
        values: require('../enums/tipoJustificacion.json')
      },
      justificacion: {
        type: Sequelize.STRING
      },
      estatus: {
        type: Sequelize.ENUM,
        values: require('../enums/estatus.json')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('excepcions');
  }
};
