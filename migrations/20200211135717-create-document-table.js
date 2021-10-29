'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('document', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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
      is_indexed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_visible: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      indexed_at: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('document');
  }
};