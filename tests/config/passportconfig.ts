var userservice = new (require('../services/userservice'))();

import passportlocal = require('passport-local');
import session = require('express-session');
import passport = require('passport');

module.exports = {
    ConfigurePassport: function (app) {
        app.use(session({ secret: 'jackasscorn', saveUninitialized: true, resave: true }));
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function (user, done) {
            console.log("serializing " + user.email);
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            console.log("deserializing " + user);
            done(null, user);
        });

        // Session-persisted message middleware
        app.use(function (req, res, next) {
            var err = req.session.error,
                msg = req.session.notice,
                success = req.session.success;

            delete req.session.error;
            delete req.session.success;
            delete req.session.notice;

            if (err) res.locals.error = err;
            if (msg) res.locals.notice = msg;
            if (success) res.locals.success = success;

            next();
        });

        passport.use(new passportlocal.Strategy(
            function (username, password, done) {
                console.log('validating user');
                userservice.validateUser(username, password)
                    .then(function (user) {
                        if (user) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Invalid user.' });
                        }
                    });
            }
        ));

        passport.use('local-signup', new passportlocal.Strategy(
            {
                passReqToCallback : true,  //allows us to pass back the request to the callback
                usernameField: 'email'
            },
            function (req, username, password, done) {
                userservice.CreateUser(username, password, req.body.name, req.body.gender, req.body.agerange, req.body.homecity)
                    .then(function (user) {
                        if (user) {
                            console.log("REGISTERED: " + user.email);
                            //req.session.success = 'You are successfully registered and logged in ' + user.email + '!';
                            done(null, user);
                        }
                        if (!user) {
                            console.log("COULD NOT REGISTER");
                            //req.session.error = 'That email is already in use, please try a different one.'; //inform user could not log them in
                            done(null, user);
                        }
                    })
                    .fail(function (err) {
                        console.log(err.body);
                    });
            }));
    }
};