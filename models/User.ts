/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp');

var userSchema = new  mongoose.Schema({
    username: String,
    password: String,
    logourl: String
});
userSchema.plugin(timestamps);

export interface IUserModel extends mongoose.Document {
    username: String,
    password: String    ,
    logourl: String
}

export var UserModel = mongoose.model<IUserModel>("User", userSchema);