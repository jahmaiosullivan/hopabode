/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./routes/apiroutes.ts"/>
require('dotenv').load();
/**
 * Globals
 */
global.Sequelize = require('sequelize');
global.Q = require('q');
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var express = require('express'), path = require('path'), bodyParser = require('body-parser'), favicon = require('serve-favicon'), methodOverride = require('method-override'), app = express(), webroutes = new (require("./routes/webroutes"))(), apiRoutes = new (require("./routes/apiroutes"))(), jobService = require('./services/jobService'), passportConfig = require('./config/passportconfig'), morgan = require('morgan'), fs = require("fs");
var exphbs = require('express-handlebars');
app.locals.sitename = "Profilable";
app.locals.slogan = "Where your professional life thrives!";
app.locals.moment = require("moment");
app.locals.defaultDateFormat = 'MMM Do YYYY, h:mm a';
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
//Routes
app.use('/api/v1', apiRoutes.getRoutes(app, express.Router()));
app.use("/", webroutes.getRoutes(app, express.Router()));
//File Paths
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, "public")));
passportConfig.ConfigurePassport(app);
/**************************************/
/*      Logs                          */
/**************************************/
// create a write stream (in append mode)
var logStream = fs.createWriteStream(__dirname + '/morganLog.log', { flags: 'a' });
// You can set morgan to log differently depending on your environment
if (app.get('env') == 'production') {
    app.use(morgan('common', {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
        stream: logStream
    }));
}
else {
    app.use(morgan('dev'));
}
/**************************************/
/*      Job Service                   */
/**************************************/
//jobService.schedule();
mongoose.connect(process.env.MONGO_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var server = app.listen(process.env.PORT || 1337, function () {
        var port = server.address().port;
        console.log('Server listening on port %s', port);
    });
});
//# sourceMappingURL=server.js.map