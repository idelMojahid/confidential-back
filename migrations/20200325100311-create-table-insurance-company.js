'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('insurance_company', {
      code: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('insurance_company');
  }
};
