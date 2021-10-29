'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function (transaction) {
      return Promise.all([
        queryInterface.addColumn('victim', 'work_accident_id', {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'work_accident'
            },
            key: 'id'
          },
          allowNull: false
        }, { transaction }),
        queryInterface.renameColumn('driver', 'driver_license_category', 'driver_license_category_id', { transaction }),
        queryInterface.removeColumn('victim', 'is_work_accident', { transaction }),
      ]);
    })
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function (transaction) {
      return Promise.all([queryInterface.removeColumn('victim', 'work_accident_id', { transaction }),
      queryInterface.renameColumn('driver', 'driver_license_category_id', 'driver_license_category', { transaction }),
      queryInterface.addColumn('victim', 'is_work_accident', {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }, { transaction }),
      ]);
    });
  }
};
