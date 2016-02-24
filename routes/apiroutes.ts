/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./IAppRoutes.ts"/>

var moment = require('moment');
var eventservice =  new (require('../services/eventservice'))();
var groupservice =  new (require('../services/groupservice'))();
var userservice =  require('../services/userservice');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var flow = require('../config/flow-node.js')('tmp');
var UPLOAD_DIR = 'uploads';
var imageservice = require('../services/imageservice.js');

try {
    fs.mkdirSync(UPLOAD_DIR);
} catch (e) {}


// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = false;


class ApiRoutes implements Routing.IAppRoutes {

    getRoutes(app:any, router:any):any {
        router.route('/event')
            .all(function (req, res, next) {
                console.log(req.method, req.url);
                next();
            })
            .get(function (req, res) {
                res.json('new new events 1324');
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

           router.route('/group')
               .all(function (req, res, next) {
                    console.log(req.method, req.url);
                    next();
                })
                .get(function (req, res) {
                    res.send("Get list of groups ...");
                })
               .post(function (req, res) {
                    var tags = req.body.tags.split(",").map(Function.prototype.call, String.prototype.trim).map(Function.prototype.call, String.prototype.toLowerCase);
                    res.send(groupservice.Create(req.body.name,req.body.description,req.body.bannerurl, req.user._id, tags));
                })
               .put(function (req, res) {
                    res.send("Edit / modify a group ...");
                })
               .delete(function (req, res) {
                    res.send("Delete a group ...");
                });

            router.get('/group/all', function(req, res) {
                groupservice
                    .All()
                    .then(function (groups) {
                        res.json(groups);
                    });
            });

            router.post('/group/members/add', function (req, res) {
                res.send(groupservice.AddMember(req.body.group._id,req.user._id));
            });

            router.post('/group/members/delete', function (req, res) {
                res.send(groupservice.RemoveMember(req.body.group._id,req.user._id));
            });

            router.get('/group/:groupId/members/:startletter?', function (req, res) {
                groupservice.Find(req.params.groupId)
                    .then(function(group) {
                        userservice.FindByIds(group.members)
                            .then(function(members) {
                                if(req.params.startletter) {
                                    function matchesStartLetter(member) {
                                        var searchPattern = new RegExp('^' + req.params.startletter, 'i');
                                        return searchPattern.test(member.name);
                                    }
                                    var filteredMembers = members.filter(matchesStartLetter);
                                    res.json(filteredMembers);
                                }
                                else {
                                    res.json(members);
                                }
                            });
                    });
            });

        /*** Image Routes **/
        router.post('/upload', multipartMiddleware, function(req, res) {
            console.log('Uploading image');
            flow.post(req, function(status, filename, original_filename, identifier, currentTestChunk, numberOfChunks) {
                console.log('POST', status, original_filename, identifier);
                if (status === 'done' && currentTestChunk > numberOfChunks) {
                    var newFileName = UPLOAD_DIR + '/' + filename;
                    var stream = fs.createWriteStream(newFileName);
                    flow.write(identifier, stream, { onDone: function(identifier) {
                        console.log('This is the identifier: ' + identifier);
                        stream.close();
                        imageservice.createThumbnail(newFileName, 128)
                        imageservice.uploadToAzure(newFileName).then(function(fileurl) {
                            console.log('Uploaded file to ' + fileurl);
                            res.json({ id: identifier, path: fileurl});
                        });
                        flow.clean(identifier);
                    }
                    });
                }
            });
        });


        router.options('/upload', function(req, res){
            console.log('OPTIONS');
            if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
                res.header("Access-Control-Allow-Origin", "*");
            }
            res.status(200).send();
        });

        // Handle status checks on chunks through Flow.js
        router.get('/upload', function(req, res) {
            flow.get(req, function(status, filename, original_filename, identifier) {
                console.log('GET', status);
                if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
                    res.header("Access-Control-Allow-Origin", "*");
                }

                if (status == 'found') {
                    status = 200;
                } else {
                    status = 204;
                }

                console.log('Get upload');
                res.status(status).send();
            });
        });

        router.get('/download/:identifier', function(req, res) {
            flow.write(req.params.identifier, res);
        });

        /*** User Routes ***/
       router.route('/users')
           .all(function (req, res, next) {
                console.log(req.method, req.url);
                next();
            })
           .get(function (req, res) {
                return userservice.All().then(function(users){
                    res.json(users);
                });
            })
           .post(function (req, res) {

            })
           .put(function (req, res) {
                //res.send("Edit / modify an event ...");
            })
           .delete(function (req, res) {
                //eventservice.Delete(req.body.id);
                //res.send("Deleted event ...");
            });

        router.get('/users/startswith/:startLetter', function(req, res) {
            userservice.FindByStartLetter(req.params.startLetter)
                .then(function (users) {
                    res.json(users);
                });
        });

        return router;
    }
}

export = ApiRoutes;



