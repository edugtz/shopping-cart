'use strict'

var express = require('express');
var api = express.Router();
var cartController = require('../controllers/cartController');
var authController = require('../controllers/authController');

api.get('/add-to-cart/:idProduct', cartController.addToCart);
api.get('/remove/:id', cartController.removeItem);
api.get('/checkout', cartController.checkout);
api.get('/empty-cart', cartController.emptyCart);

module.exports = api;