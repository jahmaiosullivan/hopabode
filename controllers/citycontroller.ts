/// <reference path="../typings/node/node.d.ts"/>

import express = require("express");
import City = require("../models/city");

class CityController {
    get(req:express.Request, res:express.Response):void {
        City.find(req.params.id).exec()
            .then(function (city) {
                res.json(city);
            })
    }

    create(req:express.Request, res:express.Response):void {
        var city = new City();
        city.name = req.body.name;
        city.location = "Massachusetts";


        city.isValid()
            .then(function () {
                city.save();
            })
            .then(function () {
                res.json(city);
            });


        /* city.validate()
         .then(function() {
         return city.save();
         })
         .then(function(saved_model) {
         res.json(saved_model);
         });*/
    }
}

export = CityController;