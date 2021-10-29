module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('claim', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      policy_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      claim_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      pv_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      loss_location: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      loss_hour: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      loss_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      authority_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      responsibility_share: Sequelize.DataTypes.STRING,
      accident_description: Sequelize.DataTypes.TEXT,
      created_by: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      updated_by: Sequelize.DataTypes.STRING,
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      rejection_reason: Sequelize.DataTypes.STRING,
      decided_by: Sequelize.DataTypes.STRING,
      decided_at: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('claim');
  }
}