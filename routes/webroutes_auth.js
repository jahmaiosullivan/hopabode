var passport = require('passport');
var viewsFolder = 'auth';
var authHelper = require('./authHelper');
module.exports = function (router) {
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
//# sourceMappingURL=webroutes_auth.js.map