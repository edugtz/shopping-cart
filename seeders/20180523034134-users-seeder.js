'use strict';
var bCrypt = require('bcrypt-nodejs');

module.exports = {
  
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [{
        username: 'Eduardo',
        password: bCrypt.hashSync('csplayer16', bCrypt.genSaltSync(8), null),
        name: 'Eduardo',
        lastName: 'Gutierrez',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
