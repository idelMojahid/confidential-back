'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.addColumn('claim', 'driver_id', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'driver'
          },
          key: 'id'
        },
        allowNull: true
      }),
      queryInterface.addColumn('claim', 'authority_type', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'authority_type'
          },
          key: 'id'
        },
        allowNull: false
      }),
      queryInterface.addColumn('claim', 'juidcial_procedure_id', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'judicial_procedure'
          },
          key: 'id'
        },
        allowNull: true
      }),
      queryInterface.addColumn('claim', 'vehicule_id', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'vehicule'
          },
          key: 'id'
        },
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('claim', 'driver_id'), queryInterface.removeColumn('claim', 'authority_type'), queryInterface.removeColumn('claim', 'vehicule_id')]);
  }
};