/// <reference path="./typings/node/node.d.ts"/>

require('dotenv').load();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');

/**
 * Globals
 */
global.pgdb = require('./datalayer/pgdb');
global.Sequelize = require('sequelize');
global.Q = require('q');

/**
 * Module dependencies.
 */
var initializer = require("./config/initializer.js"),
    app = express();

app.locals.sitename = "Profilable";
app.locals.slogan = "Where your professional life thrives!";
app.locals.moment = require("moment");
app.locals.defaultDateFormat: 'MMM Do YYYY, h:mm a';
app.locals.pluralize = require("pluralize");
app.locals.MailChimpUrl = "http://onetomany.us12.list-manage.com/subscribe/post?u=e9c60c0f035138164d20f7063&id=a8828b8250&double_optin=false";


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));

initializer.FilePaths(app, path, express, __dirname);
initializer.Auth(app);
initializer.Logs(app);
initializer.Routes(app, express);
//initializer.Jobs(app);

var server = app.listen(process.env.PORT || 1337, function () {
    var port = server.address().port;
    console.log('Server listening on port %s', port);
});