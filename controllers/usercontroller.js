/// <reference path="../typings/node/node.d.ts"/>
var userservice = new (require('../services/userservice'))();
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.get = function (req, res) {
        console.log('inside usercontroller');
        userservice.find(req.params.id).then(function (user) {
            res.json(user);
        });
    };
    UserController.prototype.findStartingWith = function (req, res) {
        userservice.findByStartLetter(req.params.startLetter)
            .then(function (users) {
            res.json(users);
        });
    };
    return UserController;
})();
module.exports = UserController;
//# sourceMappingURL=usercontroller.js.map