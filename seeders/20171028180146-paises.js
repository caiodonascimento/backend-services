'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pais', [{
      id: 'CL',
      glosa: 'Chile',
      estatus: 'ACTIVO'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pais', null, {});
  }
};
