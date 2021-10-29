'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = ['A1','A','B', 'C', 'D', 'EB', 'EC', 'ED'];
    return queryInterface.bulkInsert('driving_license_category', categories.map((category)=>{
      return {title:category}
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('driving_license_category', null, {});
  }
};
