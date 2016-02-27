/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    logourl: String
});
userSchema.plugin(timestamps);
exports.UserModel = mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map