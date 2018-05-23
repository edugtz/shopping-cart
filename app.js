'use strict'

var port = process.env.PORT || 8080;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var db = require('./models/index');
// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var app = express();
var api = require('./routes/index');

// For BodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

var sessionStore = new SequelizeStore({
  db: db.sequelize
})
app.use(session({
  secret: 'shopping-cart',
  store: sessionStore,
  resave: false,
  proxy: true
}))

sessionStore.sync();

// Enable CORS
app.use(cors());

// For Passport
app.use(passport.initialize());
app.use(passport.session()); 


app.use('/', api);

//Sync Database
db.sequelize.sync().then(function() {

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

