const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn('Clients', 'password', {
      type: DataTypes.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Clients', 'confirmpassword', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.changeColumn('Clients', 'password', {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Clients', 'confirmpassword', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },
};
