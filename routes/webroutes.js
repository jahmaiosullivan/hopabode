/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/passport.d.ts"/>
var passport = require('passport');
var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();
var authHelper = require('./middleware/authHelper');
var city = require("../models/city");
var City = city.CityModel;
var WebRoutes = (function () {
    function WebRoutes() {
    }
    WebRoutes.prototype.getRoutes = function (app, router) {
        router.get('/test', authHelper.isAnonymous, function (req, res) {
            City.find({}).exec().then(function (cities) {
                res.render('handlebarstest', { title: 'my other page', city: cities[0] });
            });
        });
        router.get('/test2', authHelper.isAnonymous, function (req, res) {
            res.render('handlebarstest', { title: 'my other page', layout: 'adminlayout' });
        });
        // define the home page route
        router.get('', authHelper.isAnonymous, function (req, res) {
            res.render('home/landingpg', { title: app.locals.sitename, layout: 'landingpg' });
        });
        /************************** Users *************************************************/
        router.get('/users', authHelper.isAuthenticated, function (req, res) {
            userservice.All()
                .then(function (users) {
                res.render('users/list', {
                    users: users
                });
            });
        });
        router.get('/users/profile', authHelper.isAuthenticated, function (req, res) {
            res.render('users/profile', { user: req.user });
        });
        router.get('/users/all', authHelper.isAuthenticated, function (req, res) {
            res.render('candidates/search', { user: req.user });
        });
        /*** Auth **/
        router.get('/login', authHelper.isAnonymous, function (req, res) {
            res.render(viewsFolder + '/login', {});
        });
        router.get('/register', authHelper.isAnonymous, function (req, res) {
            res.render(viewsFolder + '/register', {});
        });
        router.post('/login', authHelper.isAnonymous, passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));
        //logs user out of site, deleting them from the session, and returns to homepage
        router.get('/logout', authHelper.isAuthenticated, function (req, res) {
            console.log("LOGGING OUT " + req.user.email);
            req.logout();
            res.redirect('/');
            req.session.notice = "You have successfully been logged out!";
        });
        router.post('/sign-up', authHelper.isAnonymous, passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
        return router;
    };
    return WebRoutes;
})();
module.exports = WebRoutes;
//# sourceMappingURL=webroutes.js.map