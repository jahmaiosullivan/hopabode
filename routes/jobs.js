var service = require('../services/taskservice');
var resource = "tasks";
var baseRoute = "/" + resource;
var taskservice = new service();

module.exports = function (router) {
    router.route(baseRoute)
        .get(function (req, res) {
            taskservice.getTasks(function (err, items) {
                if (err) {
                    throw (err);
                }            
                res.render(resource + '/index', { title: 'My ToDo List ', tasks: items });
            });
        })
        .post(function (req, res) {
            taskservice.save(req.body, function (err) {
                if (err) {
                    throw (err);
                }            
                res.redirect(baseRoute);
            });
        });

    router.post(baseRoute + '/complete' , function (req, res) {
        taskservice.complete(req.body, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect(baseRoute);
            }
        });
    });    
             
    return router;
}



