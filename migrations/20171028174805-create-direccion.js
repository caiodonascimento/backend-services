'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('direccions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      userId: {
        type: Sequelize.STRING
      },
      direccion1: {
        type: Sequelize.STRING
      },
      direccion2: {
        type: Sequelize.STRING
      },
      estatus: {
        type: Sequelize.ENUM,
        values: require('../enums/estatus.json')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('direccions');
  }
};
