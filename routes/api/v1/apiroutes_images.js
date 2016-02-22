var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require("fs");
var flow = require('../../../config/flow-node.js')('tmp');
var UPLOAD_DIR = 'uploads';
var imageservice = require('../../../services/imageservice.js');

try {
    fs.mkdirSync(UPLOAD_DIR);
} catch (e) {}


// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = false;

module.exports = function (router) {
// Handle uploads through Flow.js
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

    return router;
}




