/// <reference path="../typings/node/node.d.ts"/>
var City = require("../models/city");
var cityservice = new (require('../services/cityservice'))();
var CityController = (function () {
    function CityController() {
    }
    CityController.prototype.get = function (req, res) {
        cityservice.find(req.params.id).then(function (city) {
            res.json(city);
        });
    };
    CityController.prototype.create = function (req, res) {
        var city = new City();
        city.name = req.body.name;
        city.location = "Massachusettes";
        cityservice.create(city).then(function (city) {
            res.json(city);
        });
    };
    return CityController;
})();
module.exports = CityController;
//# sourceMappingURL=citycontroller.js.map