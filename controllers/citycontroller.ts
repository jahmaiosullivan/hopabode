/// <reference path="../typings/node/node.d.ts"/>

import express = require("express");
import city = require("../models/city");
import City = city.CityModel; //alias

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
    }
}

export = CityController;