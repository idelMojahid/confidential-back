'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = ['A : script', 'B: script'];
    return queryInterface.bulkInsert('damage_type', types.map((type) => {
      return { title: type }
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('damage_type', null, {});
  }
};
