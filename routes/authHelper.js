exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};
exports.isAnonymous = function (req, res, next) {
    if (req.isUnauthenticated())
        return next();
    res.redirect('/users/profile');
};
//# sourceMappingURL=authHelper.js.map