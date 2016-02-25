/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./IService.ts"/>
///<reference path="../typings/mongoose.d.ts"/>
///<reference path="../models/city.ts"/>


import City = require("../models/city");

var indicative = new (require('indicative'))();

class CityService {

    private validation_rules = {
                                    name: 'required|min:3',
                                    location: 'required|min:3'
                                };

    find(id?: string): any {
        if(!id) {
            return City.find({})
                .exec()
                .then(function(cities) {
                    console.log(cities);
                    return cities; // returns a promise
                })
                .error(function(err){
                    // just need one of these
                    console.log('error:', err);
                });
        }
        else {
            return City.findById(id)
                .exec()
                .then(function (city) {
                    return city;
                }).error(function(err){
                    // just need one of these
                    console.log('error:', err);
                });
        }
    }

    findByIds (ids: any): any {
        return City.find({
                '_id': { $in: ids}
            })
            .exec()
            .then(function(cities) {
                console.log(cities);
                return cities; // returns a promise
            })
            .error(function(err){
                // just need one of these
                console.log('error:', err);
            });
    }

    findByName (name: string): any {
        return City.find({name: name}).exec()
            .then(function(city) {
                return city;
            });
    }

    create (city: any): any {
        var self = this;

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
                        });


    }
}

export = CityService;
