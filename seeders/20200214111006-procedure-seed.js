'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const procedures = ['Transaction','Judiciaire','Amiable'];
      return queryInterface.bulkInsert('procedure', procedures.map((procedure)=>{
        return {title:procedure}
      }), {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('procedure', null, {});
  }
};
