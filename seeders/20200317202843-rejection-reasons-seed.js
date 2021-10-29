'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = ['L affaire ne concerne pas Saham Assurance',
      'Le PV est déjà en notre possession',
      'Autre'];
    return queryInterface.bulkInsert('rejection_reason', types.map((reason) => {
      return { title: reason }
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rejection_reason', null, {});
  }
};