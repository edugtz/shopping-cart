var Sequelize = require('sequelize');
var sequelize = new Sequelize('shopping-cart', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

module.exports = sequelize;