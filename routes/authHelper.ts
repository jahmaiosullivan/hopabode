exports.isAuthenticated = function(req: express.Request, res: express.Response, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
exports.isAnonymous = function(req: express.Request, res: express.Response, next) {
    if (req.isUnauthenticated())
        return next();

    res.redirect('/users/profile');
}