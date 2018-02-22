'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      dia: {
        type: Sequelize.ENUM,
        values: require('../enums/dias.json')
      },
      inicio: {
        type: Sequelize.TIME
      },
      fin: {
        type: Sequelize.TIME
      },
      desde: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('horarios');
  }
};
