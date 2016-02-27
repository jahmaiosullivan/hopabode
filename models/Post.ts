/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp');

var postSchema = new mongoose.Schema({
    title: {type:String, required: true},
    content: String,
    images: [String]
});
postSchema.plugin(timestamps);

export interface IPostModel extends mongoose.Document {
    title: String,
    content: String,
    images: [String]
}
export var PostModel = mongoose.model<IPostModel>("Post", postSchema);