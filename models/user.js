var mongoose=require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema=mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String    ,
    logourl: String
});
UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);