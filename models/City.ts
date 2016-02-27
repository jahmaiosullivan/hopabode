/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mongoose.d.ts"/>

import * as mongoose from 'mongoose';
import {ICityModel} from "./ICity";
var timestamps = require('mongoose-timestamp');
var indicative = new (require('indicative'))();
var validation_rules = {
    name: 'required|min:3',
    location: 'required|min:3'
};

var citySchema = new mongoose.Schema({
    name: {type:String, required: true},
    location: {type:String, required: true},
    about: String,
    image: String
});

citySchema.methods.isValid = function() {
    var validated = indicative.validate(validation_rules, this);
    return validated;
}
/*
return indicative.validate(this.validation_rules, city)
    .then(function () {
        return self.findByName(city.name);
    })
    .then(function (record) {
        if (record.length > 0) {
            console.log('city already exists');
            return null;
        } else {
            return city.save();
        }
    });*/

citySchema.plugin(timestamps);
var City = mongoose.model<ICityModel>("City", citySchema);
export = City;