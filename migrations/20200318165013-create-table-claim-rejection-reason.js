'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('claim_rejection_reason', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      claim_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'claim'
          },
          key: 'id'
        },
        allowNull: false
      },
      rejection_reason_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'rejection_reason'
          },
          key: 'id'
        },
        allowNull: false
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('claim_rejection_reason');
  }
};
