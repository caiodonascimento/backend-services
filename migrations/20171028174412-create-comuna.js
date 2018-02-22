'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comunas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      glosa: {
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
    return queryInterface.dropTable('comunas');
  }
};
