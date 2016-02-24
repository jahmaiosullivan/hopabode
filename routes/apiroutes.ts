/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./IAppRoutes.ts"/>

var usercontroller = new (require('../controllers/usercontroller'))();
var imagecontroller =  new (require('../controllers/imagecontroller'))();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

class ApiRoutes implements Routing.IAppRoutes {

    getRoutes(app: express.Application, router: express.Router):any {

        /*** Image Routes **/
        router.post('/upload', multipartMiddleware, imagecontroller.post);
        router.options('/upload', imagecontroller.options);
        router.get('/upload', imagecontroller.get);
        router.get('/download/:identifier', imagecontroller.download);

        /*** User Routes ***/
        router.route('/users').get(usercontroller.get)
                              .post(function (req, res) {})
                              .put(function (req, res) {})
                              .delete(function (req, res) {});

        router.get('/users/:id', usercontroller.get);
        router.get('/users/startswith/:startLetter', usercontroller.findStartingWith);

        return router;
    }
}

export = ApiRoutes;



