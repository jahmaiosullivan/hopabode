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
//global.sequelize = new Sequelize(pgdb.connectionString());
global.Q = require('q');
/**
 * Module dependencies.
 */
var initializer = require("./config/initializer.js"), app = express();
app.set("port", process.env.PORT || 1337);
app.locals.sitename = "OneToMany";
app.locals.slogan = "Interactive learning platform for the modern world.";
app.locals.moment = require("moment");
app.locals.pluralize = require("pluralize");
app.locals.defaultDateFormat = require("./vars").defaultDateFormat;
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
//http.createServer(app).listen(app.get("port"), () => {
//    console.log(`Server listening on port ${app.get("port")}`);
//});
//# sourceMappingURL=server.js.map