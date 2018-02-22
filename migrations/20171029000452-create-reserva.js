'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      clienteId: {
        type: Sequelize.STRING
      },
      extra: {
        type: Sequelize.BOOLEAN
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      hora: {
        type: Sequelize.INTEGER
      },
      minuto: {
        type: Sequelize.INTEGER
      },
      detalle: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.FLOAT
      },
      descuento: {
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
    return queryInterface.dropTable('reservas');
  }
};
