var morgan = require('morgan'),
    fs = require("fs"),
    jobService = require('../services/jobService'),
    passportConfig = require('./passportconfig');
    

module.exports = {
    Routes: function (app, express) {
        // ROUTES FOR OUR WEB APP  
        // =============================================================================
        var webroute = require(__dirname + "/../routes/webroutes")(express.Router());
        app.use("/", webroute);
        
        var authroutes = require(__dirname + "/../routes/webroutes_auth")(express.Router());
        app.use("/", authroutes);

        // ROUTES FOR OUR API
        // =============================================================================
        var apiRoutePath = __dirname + "/../routes/api/v1/";
        fs.readdirSync(apiRoutePath).forEach(function (file) {
            var apiroute = require(apiRoutePath + file)(express.Router());
            app.use('/api/v1', apiroute);
        });

        // ROUTES FOR Jobs
        // =============================================================================
        //var taskroutes = require('../routes/jobs')(express.Router());
        //app.use('/jobs', taskroutes);
    },
    Logs: function (app){
        // create a write stream (in append mode)
        var logStream = fs.createWriteStream(__dirname + '/morganLog.log', { flags: 'a' })
        // You can set morgan to log differently depending on your environment
        if (app.get('env') == 'production') {
            app.use(morgan('common', {
                skip: function (req, res) {
                    return res.statusCode < 400
                }, 
                stream: logStream
            }));
        } else {
            app.use(morgan('dev'));
        }
    },
    Auth: function (app) {
        passportConfig.ConfigurePassport(app);
    },
    Jobs: function(app) {
        jobService.schedule();
    },
    FilePaths: function (app, path, express, basedir) {
        app.set('views', path.join(basedir, 'views'));
        app.set('view engine', 'jade');


        app.use(express.static(path.join(basedir, "public")));
    }
};