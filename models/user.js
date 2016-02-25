/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    logourl: String
});
userSchema.plugin(timestamps);
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map