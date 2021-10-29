'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const judicialProcedures = ['Jugement ADD','Jugement au fond','Arrêt ADD','Arrêt au fond'];
    return queryInterface.bulkInsert('judicial_procedure', judicialProcedures.map((judicialProcedure)=>{
      return {title:judicialProcedure}
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('judicial_procedure', null, {});
  }
};
