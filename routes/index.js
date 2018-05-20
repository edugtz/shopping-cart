'use strict'

var express = require('express');
var api = express.Router();
var auth = require('../controllers/authController');

api.post('/signin', auth.localSignin);
api.post('/signup', auth.localSignup);
api.get('/logout', auth.logout);

api.get('/', function(req, res, next){
    return res.send({status: "Welcome to homepage"});
});
api.get('/profile', auth.isLoggedIn, function(req, res, next){
    return res.send({status:"Welcome to your profile " + req.user.name + "!"});
});
api.get('/checkauth', auth.isAuthenticated, function(req, res, next){
    return res.status(200).json({
        status: 'You are logged in!!'
    });
});
module.exports = api;