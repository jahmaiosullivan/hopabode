/// <reference path="../typings/node/node.d.ts"/>

var userservice = new (require('../services/userservice'))();

class UserController {
    get(req: express.Request, res: express.Response) {
        console.log('inside usercontroller');
        userservice.find(req.params.id).then(function (user) {
            res.json(user);
        })
    })

    findStartingWith(req: express.Request, res: express.Response) {
        userservice.findByStartLetter(req.params.startLetter)
            .then(function (users) {
                res.json(users);
            });
    }


}

export = UserController;