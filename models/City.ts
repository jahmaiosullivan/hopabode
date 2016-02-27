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


citySchema.pre('save', function (next) {
    console.log('pre save');
    var self = this;
    var validation_rules = {
        name: 'required|min:3',
        location: 'required|min:3'
    };
    indicative
        .validate(validation_rules, this)
        .then(function() {
            return CityModel.find({name: self.name}).exec();
        }).then(function (docs, err) {
            if (!docs.length){
                next();
            }else{
                console.log('city already exists: ',self.name);
                next(new Error("City already exists!"));
            }
        }).catch(function(errors) {
           next(new Error('Invalid city'));
        });
});

citySchema.plugin(timestamps);
export interface ICityModel extends mongoose.Document {
    name: String,
    location: String,
    about?: String,
    image?: String,
    isValid(): any;
}
export var CityModel = mongoose.model<ICityModel>("City", citySchema);