var moment = require('moment');
var vars = require('../../../vars');
var eventservice =  new (require('../../../services/eventservice'))();

module.exports = function (router) {
    var api = router.route('/event');

    api.all(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    });
    
    api.get(function (req, res) {
        eventservice.FindByGroup(req.query.groupid).then(function(output){
            res.send(output);
        });
    });

    api.post(function (req, res) {
        eventservice.Create(parseInt(req.body.groupid),
                            req.body.title,
                            req.body.description,
                            moment(req.body.start, vars.defaultDateFormat).utc().toDate(),
                            moment(req.body.enddate, vars.defaultDateFormat).utc().toDate(),
                            req.body.location)
        .then(function(result){
            res.json(result);
        });
    });

    api.patch(function (req, res) {
        console.log("Patching event with id " + req.body._id);
        eventservice.Update(
            req.body._id,
            req.body.title,
            req.body.description,
            moment(req.body.start, vars.defaultDateFormat).utc().toDate(),
            moment(req.body.end, vars.defaultDateFormat).utc().toDate(),
            req.body.location)
        .then(function(result){
            res.json(result);
        });
    });

    api.put(function (req, res) {
        res.send("Edit / modify an event ...");
    });

    api.delete(function (req, res) {
        eventservice.Delete(req.body.id);
        res.send("Deleted event ...");
    });
    
    return router;
}




