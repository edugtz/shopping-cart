'use strict'

var port = process.env.PORT || 8080;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var db = require('./models/index');

var app = express();
var api = require('./routes/index');

// For BodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// For Passport
app.use(session({ secret: 'express-session',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use('/', api);

//Sync Database
db.sequelize.sync().then(function() {

  console.log('Nice! Database looks fine');
  app.listen(port, (err) => {
    if (err) {
      return console.log('There was an error when starting the app', err)
    }
    console.log(`Server is listening on port ${port}`)
  });

}).catch(function(err) {

  console.log(err, "Something went wrong with the database update!")

});

module.exports = app;

