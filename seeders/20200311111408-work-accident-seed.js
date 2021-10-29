'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const types = ['Oui','Non'];
    return queryInterface.bulkInsert('work_accident', types.map((type)=>{
      return {title:type}
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('work_accident', null, {});
  }
};
