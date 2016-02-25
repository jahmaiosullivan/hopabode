/// <reference path="../typings/node/node.d.ts"/>

import express = require("express");
import City = require("../models/city");
var cityservice = new (require('../services/cityservice'))();

class CityController {
    get(req: express.Request, res: express.Response): void {
        cityservice.find(req.params.id).then(function (city) {
            res.json(city);
        })
    }

    create(req: express.Request, res: express.Response): void {
        var city = new City();
        city.name = req.body.name;
        city.location = "Massachusettes";


        cityservice.create(city).then(function (city) {
            res.json(city);
        };
    }
}

export = CityController;