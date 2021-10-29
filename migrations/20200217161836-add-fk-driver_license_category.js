'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addColumn(
      'driver',
      'driver_license_category',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'driving_license_category'
          },
          key: 'id'
        },
        allowNull: false,
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('driver', 'driver_license_category');
  }
};