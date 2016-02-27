/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var indicative = new (require('indicative'))();
/***********************************************************/
/*      City Model                                         */
/***********************************************************/
var citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    about: String,
    image: String
});
citySchema.methods.isValid = function () {
    var validation_rules = {
        name: 'required|min:3',
        location: 'required|min:3'
    };
    var validated = indicative.validate(validation_rules, this);
    return validated;
};
citySchema.plugin(timestamps);
exports.CityModel = mongoose.model("City", citySchema);
//# sourceMappingURL=City.js.map