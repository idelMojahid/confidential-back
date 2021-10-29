'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('victim', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cin: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      telephone_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      procedure_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'procedure'
          },
          key: 'id'
        },
        allowNull: false
      },
      damage_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      profession: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      is_work_accident: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      itt: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      is_excluded: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('victim');
  }
};