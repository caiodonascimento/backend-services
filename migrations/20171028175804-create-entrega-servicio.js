'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entregaServicios', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT
      },
      tipoEntrega: {
        type: Sequelize.ENUM,
        values: require('../enums/tiposEntrega.json')
      },
      valor: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('entregaServicios');
  }
};
