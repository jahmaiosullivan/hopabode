/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
import {IUserModel} from "./IUser";
var timestamps = require('mongoose-timestamp');

var userSchema = new  mongoose.Schema({
    username: String,
    password: String    ,
    logourl: String
});
userSchema.plugin(timestamps);
var User = mongoose.model<IUserModel>("User", userSchema);

export = User;