/// <reference path="../../../typings/node/node.d.ts"/>
/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path="./IAppRoutes.ts"/>

var moment = require('moment');
var eventservice =  new (require('../../../services/eventservice'))();


class ApiRoutes implements Routing.IAppRoutes {

    getRoutes(app:any, router:any):any {
        router.route('/event')
            .all(function (req, res, next) {
                console.log(req.method, req.url);
                next();
            })
            .get(function (req, res) {
                res.json('new new events');
                /*eventservice.FindByGroup(req.query.groupid).then(function (output) {
                 res.send(output);
                 });*/
            })
            .post(function (req, res) {
                eventservice.Create(parseInt(req.body.groupid),
                    req.body.title,
                    req.body.description,
                    moment(req.body.start, app.locals.defaultDateFormat).utc().toDate(),
                    moment(req.body.enddate, app.locals.defaultDateFormat).utc().toDate(),
                    req.body.location)
                    .then(function (result) {
                        res.json(result);
                    });
            })
            .patch(function (req, res) {
                console.log("Patching event with id " + req.body._id);
                eventservice.Update(
                    req.body._id,
                    req.body.title,
                    req.body.description,
                    moment(req.body.start, app.locals.defaultDateFormat).utc().toDate(),
                    moment(req.body.end, app.locals.defaultDateFormat).utc().toDate(),
                    req.body.location)
                    .then(function (result) {
                        res.json(result);
                    });
            })
            .put(function (req, res) {
                res.send("Edit / modify an event ...");
            })
            .delete(function (req, res) {
                eventservice.Delete(req.body.id);
                res.send("Deleted event ...");
            });

        return router;
    }
}

export = ApiRoutes;



