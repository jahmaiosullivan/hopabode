/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
import {ICityModel} from "./ICity";
var timestamps = require('mongoose-timestamp');

var citySchema = new mongoose.Schema({
    name: {type:String, required: true},
    location: {type:String, required: true},
    about: String,
    image: String
});
citySchema.plugin(timestamps);
var City = mongoose.model<ICityModel>("City", citySchema);

export = City;