'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const authorityTypes = ['SAC','Tribunal'];
    return queryInterface.bulkInsert('authority_type', authorityTypes.map((authorityType)=>{
      return {title:authorityType}
    }), {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('authority_type', null, {});
  }
};
