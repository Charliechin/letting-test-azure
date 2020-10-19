const Sequelize = require('sequelize');
const db = require('../config/db');

const Property = db.define('property', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  usersInterested: {
    type: Sequelize.ARRAY
  }
})

module.exports = Property;