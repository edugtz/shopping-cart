'use strict'

var express = require('express');
var api = express.Router();

api.get('/', function(req, res, next){
    return res.send({message: "Welcome to homepage"});
});


module.exports = api;