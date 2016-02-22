import express = require('express');
import passport = require('passport');
var viewsFolder = 'auth';
var userservice = new (require('../services/userservice'))();
var authHelper = require('./authHelper');

module.exports = router => {

    // define the home page route
    router.get('', authHelper.isAnonymous, (req: express.Request, res: express.Response) => {
        res.render('home/landingpg', res);
    });
    
    
    /************************** Users *************************************************/
    router.get('/users', authHelper.isAuthenticated, (req: express.Request, res: express.Response) => {
        userservice.All()
            .then(users => {
                res.render('users/list', {
                    users: users
                });
            });
    });
    
    router.get('/users/profile', authHelper.isAuthenticated, (req: express.Request, res: express.Response) => {
        res.render('users/profile', { user: req.user });
    });

    router.get('/users/all', authHelper.isAuthenticated, (req: express.Request, res: express.Response) => {
        res.render('candidates/search', { user: req.user });
    });


    return router;
}



