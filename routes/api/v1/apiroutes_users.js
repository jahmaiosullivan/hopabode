var userservice =  new (require('../../../services/userservice'))();

module.exports = function (router) {
    var api = router.route('/users');

    api.all(function (req, res, next) {
        console.log(req.method, req.url);
        next();
    });
    
    api.get(function (req, res) {
        return userservice.All().then(function(users){
                                    res.json(users);
                                });
    });

    api.post(function (req, res) {

    });

    api.put(function (req, res) {
        //res.send("Edit / modify an event ...");
    });

    api.delete(function (req, res) {
        //eventservice.Delete(req.body.id);
        //res.send("Deleted event ...");
    });
    
    return router;
}




