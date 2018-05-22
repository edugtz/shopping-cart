'use strict'

var express = require('express');
var api = express.Router();
var productController = require('../controllers/productController');

// Products routes
api.get('/', productController.list);
api.get('/:idProduct', productController.product);
api.post('/', productController.createProduct);
api.delete('/:idProduct', productController.deleteProduct);
api.put('/:idProduct', productController.updateProduct);

// Export what we need so we can use it in other modules/files
module.exports = api;
