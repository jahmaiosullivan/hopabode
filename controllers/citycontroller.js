/// <reference path="../typings/node/node.d.ts"/>
var city = require("../models/city");
var City = city.CityModel; //alias
var CityController = (function () {
    function CityController() {
    }
    CityController.prototype.get = function (req, res) {
        City.find(req.params.id).exec()
            .then(function (city) {
            res.json(city);
        });
    };
    CityController.prototype.create = function (req, res) {
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
    };
    return CityController;
})();
module.exports = CityController;
//# sourceMappingURL=citycontroller.js.map