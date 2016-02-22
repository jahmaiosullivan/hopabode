var config = require('../config/mongodbconfig'),
    format = require('util').format,
    assert = require('assert'),
    Promise = require('bluebird'),
    ObjectId = require('mongodb').ObjectID,
    MongoDB = Promise.promisifyAll(require("mongodb"));
    MongoClient = Promise.promisifyAll(MongoDB.MongoClient);


function MongoDbService() {
    return this;
}

function connectClient() {
    return MongoClient.connectAsync(config.connectionstring); 
}

MongoDbService.prototype.all = function(table_name)
{
    return this.find(table_name, {}, {});
}

MongoDbService.prototype.find = function(table_name, whereconditions, sortconditions)
{
    if(!sortconditions)
        sortconditions = {};

    return connectClient().then(function (db) {
                                this.db = db;
                                return db.collection(table_name);
                            })
                            .then(function (coll) {
                                return coll.find(whereconditions).sort(sortconditions);
                            })
                            .then(function (r, err) {
                                assert.equal(null, err);
        
                                this.db.close();
                                return r;
                            });
}

MongoDbService.prototype.findById = function(table_name, id)
{
    console.log('looking up item with id ' + id + ' in table ' + table_name);
    return this.single(table_name,{"_id": ObjectId(id)});
}

MongoDbService.prototype.findByIds = function(table_name, ids) {
    var objectIds = ids.map(ObjectId);
    return this.find(table_name, { "_id": { $in: objectIds } });
}


MongoDbService.prototype.single = function(table_name, whereconditions, sortconditions)
{
    return connectClient().then(function (db) {
                                this.db = db;
                                return this.db.collection(table_name);
                         })
                         .then(function (coll) {
                              return coll.findOne(whereconditions);
                         })
                         .then(function (r, err) {
                            assert.equal(null, err);
                            
                            this.db.close();
                            return r;
                        });
}

//Use mongo driver
MongoDbService.prototype.save = function (table_name, item) {
    return connectClient().then(function (db) {
            this.db = db;
            return this.db.collection(table_name);
        })
        .then(function(coll) {
            return coll.insertOne(item);
        })
        .then(function (r, err) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);

            this.db.close();
        });
}

MongoDbService.prototype.delete = function (table_name, id) {
    return connectClient().then(function (db) {
                                this.db = db;
                                return this.db.collection(table_name);
                            })
                            .then(function (coll) {
                                return coll.updateOne({ "_id" : ObjectId(id) }, {
                                                                            $set: {
                                                                                isdeleted: true
                                                                            }
                                                                        }, {
                                    upsert: true
                                });
                            })
                            .then(function (r, err) {
                                assert.equal(null, err);
                                assert.equal(0, r.matchedCount);
                                assert.equal(1, r.upsertedCount);
        
                                this.db.close();
                            });
}

MongoDbService.prototype.updateById = function(table_name, id, updatevalues) {
    console.log('updating item with id ' + ObjectId(id));
    return this.update(table_name, { "_id" : ObjectId(id) }, { $set: updatevalues });
}

MongoDbService.prototype.update = function (table_name, whereconditions, updatevalues) {
    return connectClient().then(function (db) {
        this.db = db;
        return this.db.collection(table_name);
    })
    .then(function (coll) {
        return coll.updateMany(whereconditions, updatevalues);
    })
    .then(function (r, err) {
        assert.equal(null, err);
        this.db.close();
    });
}


module.exports = MongoDbService;