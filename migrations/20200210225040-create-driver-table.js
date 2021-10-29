module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('driver', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      cin: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      sex: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      driver_license_issue_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },

      driver_license_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('driver');
  }
}