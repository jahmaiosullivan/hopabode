var async = require('async');
var docDb = require('../datalayer/docdb');
var self = this;

function taskservice() {
    self.docDbDao = new docDb().init();
}

taskservice.prototype.getTasks = function (callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.completed=@completed',
        parameters: [{
                name: '@completed',
                value: false
            }]
    };
        
    self.docDbDao.find(querySpec, callback);
}

taskservice.prototype.save = function (task, callback) {
    self.docDbDao.addItem(task, callback);
}

taskservice.prototype.complete = function (body, errorCallback) {
    var completedTasks = Object.keys(body);
        
    async.forEach(completedTasks, function taskIterator(completedTask, callback, errorCallback) {            
        taskservice.prototype.update(completedTask, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });

    }, errorCallback);
}

taskservice.prototype.update = function (task, callback) {
    self.docDbDao.updateItem(task, callback);
}

module.exports = taskservice;