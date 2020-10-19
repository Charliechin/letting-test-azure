'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [5, 20]
      },
      usersInterested: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')

      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};