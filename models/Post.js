/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    images: [String]
});
postSchema.plugin(timestamps);
module.exports = mongoose.model("Post", postSchema);
//# sourceMappingURL=Post.js.map