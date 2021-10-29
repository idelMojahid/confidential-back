'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicule', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      brand: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      registration_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      opposing_party: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vehicule'); 
  }
};
