/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    about: String,
    image: String
});
citySchema.plugin(timestamps);
var City = mongoose.model("City", citySchema);
module.exports = City;
//# sourceMappingURL=city.js.map