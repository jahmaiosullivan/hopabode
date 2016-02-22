var azure = require('azure-storage'),
    path = require('path');     // Also loading the path module
var fs = require("fs"),
    easyimg = require('easyimage');

//TODO: Use nconf plugin for storing these config values
var containerName = 'images';
var azureStorageName = 'onetomany';
var hostName = 'https://' + azureStorageName + '.blob.core.windows.net';
var azureStorageKey =  'xm+FLc/9XPmzgs0ax8R76QIhioDL4PlTsSmhJCvzbAiPNnAQKXG5vvv1BFABbwt9wnuzwU9K/mB23++x3WIKow==';
var deferred = Q.defer();
var blobSvc = azure.createBlobService(azureStorageName,azureStorageKey);



module.exports = {
    uploadToAzure: function (filepath) {
        var filename = path.basename(filepath);
        //TODO: Change to Q deferred pattern
        return CreateAzureContainerIfNotExists(containerName, {publicAccessLevel : 'blob'})
            .then(function(error, result, response) {
                if (!error) {
                    // Container exists and is private
                }

                return CreateAzureBlobFromFile(containerName, path.basename(filepath), filepath);
            })
            .then(function(error, result, response) {
                var saveFileUrl = blobSvc.getUrl(containerName, filename, null, hostName);
                console.log("Azure file is here: " + saveFileUrl);
                return saveFileUrl;
            });
    },

    createThumbnail: function(srcfile, thumbnailwidthheight){

        var extension = path.extname(srcfile);
        var dirName = path.dirname(srcfile);
        var filename = path.basename(srcfile,extension);

        var thumbnailfilename = dirName + '/' + filename + '_thumbnail' + extension;

        if(thumbnailwidthheight === undefined)
            thumbnailwidthheight = 128;

        console.log('save thumbnail ' + thumbnailfilename + '. Size: ' + thumbnailwidthheight);
        easyimg.rescrop({
            src:srcfile, dst: thumbnailfilename,
            width:256, height:256,
            cropwidth:thumbnailwidthheight, cropheight:thumbnailwidthheight,
            x:0, y:0
        });
    }
};


function CreateAzureContainerIfNotExists(containerName, options){
    blobSvc.createContainerIfNotExists(containerName, {publicAccessLevel : 'blob'}, function(error, result, response) {
        if (error) {
            deferred.reject(new Error(error), result, response);
        } else {
            // Container exists and is private
            deferred.resolve(error, result, response);
        }
    });
    return deferred.promise;
}

function CreateAzureBlobFromFile(containerName, filename, filepath){
    blobSvc.createBlockBlobFromLocalFile(containerName, filename, filepath, function(error, result, response){
        if(!error){
            // file uploaded
            console.log('uploaded new file');
            fs.unlink(filepath, function(err) {
                console.log('cleaned up ' + filepath);
                //swallow this error
            });


            deferred.resolve(error, result, response);
        }
        else {
            console.log('error uploading new file');
            deferred.reject(new Error(error), result, response);
        }
    });
}

function ListAzureBlobs(){
    blobSvc.listBlobsSegmented(containerName, null, function(error, result, response){
        if(!error){
            // result contains the entries
            deferred.resolve(error, result, response);
        }
        else {
            deferred.reject(new Error(error), result, response);
        }
    });
}
