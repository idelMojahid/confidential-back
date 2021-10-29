'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const insuranceCompanies = ['252468','252528','252456','252427','252425','252507',
    '252481','252412','15084','252476','252555','23342663','252526'];
    
    return queryInterface.bulkInsert('insurance_company', insuranceCompanies.map((insuranceCompany) => {
      return { code: insuranceCompany }
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('insurance_company', null, {});
  }
};
