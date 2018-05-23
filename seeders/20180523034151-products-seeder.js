'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('products', [{
        code: 'PANTS',
        name: 'Pants',
        description: 'Beutifule pants for women',
        price: '5.00',
        createdAt: new Date(),
        updatedAt:new Date()
      }, {
        code: 'TSHIRT',
        name: 'T-Shirt',
        description: 'Basic whie round-neck t-shirt',
        price: '20.00',
        createdAt: new Date(),
        updatedAt:new Date()
      }, {
        code: 'HAT',
        name: 'Hat',
        description: 'Comfortable cotton hat',
        price: '7.50',
        createdAt: new Date(),
        updatedAt:new Date()
      }, {
        code: 'JACKET',
        name: 'Jacket',
        description: 'Brown leather jacket',
        price: '15.00',
        createdAt: new Date(),
        updatedAt:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('products', null, {});
  }
};
