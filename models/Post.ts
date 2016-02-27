/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
import {IPostModel} from "./IPost";
var timestamps = require('mongoose-timestamp');

var postSchema = new mongoose.Schema({
    title: {type:String, required: true},
    content: String,
    images: [String]
});
postSchema.plugin(timestamps);
export = mongoose.model<IPostModel>("Post", postSchema);