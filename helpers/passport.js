
//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var User = require('../models').user;
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(User, done) {
    // console.log(User);
    done(null, User);
});

// used to deserialize the user
passport.deserializeUser(function(User, done) {
    done(null, User);
    // console.log(idUser);
    // User.findById(idUser).then(function(user) {
    //     if(user){
    //         done(null, user.get());
    //     }
    //     else{
    //         done(null, false);
    //     }
    // });
});

passport.use('local-signup', new LocalStrategy(
    {           
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, username, password, done){
        var name = req.body.name;
        var lastName = req.body.lastName;
        
        if(!name){
            return done(null, false, {message : 'You need to provide your name'} );
        }
        if(!lastName){
            return done(null, false, {message : 'You need to provide your last name'} );
        }
        var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({where: {username:username}}).then(function(user){

            if(user)
            {
                return done(null, false, {message : 'That username is already taken'} );
            } else {
                var userPassword = generateHash(password);
                var data = { username:username,
                    password:userPassword,
                    name: name,
                    lastName: lastName
                };

                User.create(data).then(function(newUser,created){
                    if(!newUser){
                        return done(null, false);
                    }

                    if(newUser){
                        return done(null, newUser);   
                    }
                });
            }
        }); 
    }
));

passport.use('local-signin', new LocalStrategy(
    {
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, username, password, done) {
        var isValidPassword = function(userpass,password){
            return bCrypt.compareSync(password, userpass);
        }

        User.findOne({ where : { username: username}}).then(function (user) {
            if (!user) {
                return done(null, false, { message: 'Username does not exist' });
            }

            if (!isValidPassword(user.password,password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            var userinfo = user.get();
            console.log(userinfo);
            return done(null,userinfo);

        }).catch(function(err){

            console.log("Error:",err);
            return done(null, false, { message: 'Something went wrong with your Signin' });

        });
    }
));

