/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
var timestamps = require('mongoose-timestamp');
var indicative = new (require('indicative'))();

/***********************************************************/
/*      City Model                                         */
/***********************************************************/
var citySchema = new mongoose.Schema({
    name: {type:String, required: true},
    location: {type:String, required: true},
    about: String,
    image: String
});
citySchema.methods.isValid = function() {
    var validation_rules = {
        name: 'required|min:3',
        location: 'required|min:3'
    };
    var validated = indicative.validate(validation_rules, this);
    return validated;
}
citySchema.plugin(timestamps);
export interface ICityModel extends mongoose.Document {
    name: String,
    location: String,
    about?: String,
    image?: String,
    isValid(): any;
}
export var CityModel = mongoose.model<ICityModel>("City", citySchema);