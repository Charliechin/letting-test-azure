const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
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

module.exports = User;