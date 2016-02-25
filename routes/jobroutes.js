/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
var service = require('../services/taskservice');
var resource = "tasks";
var taskservice = new service();
var JobRoutes = (function () {
    function JobRoutes() {
    }
    JobRoutes.prototype.getRoutes = function (app, router) {
        router.route("/")
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
                res.redirect("/");
            });
        });
        router.post('/complete', function (req, res) {
            taskservice.complete(req.body, function goHome(err) {
                if (err) {
                    throw err;
                }
                else {
                    res.redirect("/");
                }
            });
        });
        return router;
    };
    return JobRoutes;
})();
module.exports = JobRoutes;
//# sourceMappingURL=jobroutes.js.map