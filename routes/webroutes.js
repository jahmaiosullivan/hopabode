var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();
var authHelper = require('./authHelper');
module.exports = function (router) {
    // define the home page route
    router.get('', authHelper.isAnonymous, function (req, res) {
        res.render('home/landingpg', res);
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
    return router;
};
//# sourceMappingURL=webroutes.js.map