'use strict'

var express = require('express');
var api = express.Router();
var productController = require('../controllers/productController');

api.get('/', productController.list);
api.get('/:idProduct', productController.product);

module.exports = api;