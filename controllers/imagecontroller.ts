/// <reference path="../typings/node/node.d.ts"/>

var flow = require('../config/flow-node.js')('tmp');


var fs = require("fs");
var UPLOAD_DIR = 'uploads';

try {
    fs.mkdirSync(UPLOAD_DIR);
} catch (e) {}


// Configure access control allow origin header stuff
var ACCESS_CONTROLL_ALLOW_ORIGIN = false;

class ImageController {
    post(req: express.Request, res: express.Response) {
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
        }
    }

    options(req: express.Request, res: express.Response) {
        console.log('OPTIONS');
        if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
            res.header("Access-Control-Allow-Origin", "*");
        }
        res.status(200).send();
    }

    get(req: express.Request, res: express.Response)
    {
        // Handle status checks on chunks through Flow.js
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
    }

    download(req: express.Request, res: express.Response) {
        flow.write(req.params.identifier, res);
    }

}

export = ImageController;