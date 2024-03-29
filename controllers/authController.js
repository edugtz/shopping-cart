'use strict'

var express = require('express');
var router = express.Router();
var User = require('../models').user;
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var passportService = require('../helpers/passport');

/**
*  This function logs the user in
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
function localSignin(req, res, next){
    passport.authenticate('local-signin', function(err, user, info) {
        if (err) { 
            return next(err) 
        }
        if (!user) {
            return res.status(401).send({message: "You need to provide valid credentials"});
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).send({message: "You have successfully logged in"});
        });
    })(req, res, next);
}

/**
*  This function signs up a new user and creates his account
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
function localSignup(req, res, next){
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) { 
            return next(err) 
        }
        if(user){
            return res.status(200).send({message: "Your account has been successfully created"});            
        } else {
            return res.status(200).send({message: info.message});            
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
        });
    })(req, res, next);
}

/**
*  This destroys the session of the currently authenticated user
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
function logout(req, res, next){
    if(req.user){
        // req.session = null;
        req.session.destroy();
        return res.status(200).send({message: 'You have successfully logged out'});
    } else {
        return res.status(401).send({message: 'You need to log in first'});
    }
}

/**
*  This function acts as a middleware to check if a user is authenticated
* @param {object} request JSON containing all the parameters sent with the request.
* @param {object} response This is a response from the server.
* @param {function()} next This is a callback.
 */
function isAuthenticated (req,res,next){
    if(req.user)
       return next();
    else
       return res.status(401).send({
        message: 'User not authenticated'
       })
 }

// Export what we need so we can use it in other modules/files
module.exports = {
    logout,
    isAuthenticated,
    localSignin,
    localSignup
}