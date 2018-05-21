'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models').user;
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var passportService = require('../helpers/passport');

function localSignin(req, res, next){
    passport.authenticate('local-signin', function(err, user, info) {
        if (err) { 
            return next(err) 
        }
        if (!user) {
            return res.send({status: "You need to provide valid credentials"});
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({status: "You have successfully logged in"});
        });
    })(req, res, next);
}

function localSignup(req, res, next){
    passport.authenticate('local-signup',  
    {   successRedirect: '/profile',
        failureRedirect: '/signup'
    })(req, res, next);
}

function logout(req, res, next){
    if(req.user){
        // req.session = null;
        req.session.destroy();
        return res.status(200).json('You have successfully logged out');
    } else {
        return res.status(200).json('You need to log in first');
    }
}

function isAuthenticated (req,res,next){
    if(req.user)
       return next();
    else
       return res.status(401).json({
         status: 'User not authenticated'
       })
 }

module.exports = {
    logout,
    isAuthenticated,
    localSignin,
    localSignup
}