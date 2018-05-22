'use strict'

var express = require('express');
var api = express.Router();
var auth = require('../controllers/authController');
var productRoutes = require('./product');
var cartRoutes = require('./cart');

// These are the main routes of the app
api.post('/signin', auth.localSignin);
api.post('/signup', auth.localSignup);
api.get('/logout', auth.logout);

api.get('/', function(req, res, next){
    return res.status(200).send({message: "Welcome to homepage"});
});
api.get('/profile', auth.isAuthenticated, function(req, res, next){
    return res.status(200).send({message:"Welcome to your profile " + req.user.name + "!"});
});
api.get('/checkauth', auth.isAuthenticated, function(req, res, next){
    return res.status(200).json({
        message: 'You are logged in!!'
    });
});

// We tell express to use the product and shopping cart routes
api.use('/products', productRoutes);
api.use('/cart', cartRoutes);

// Export what we need so we can use it in other modules/files
module.exports = api;