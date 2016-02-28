/// <reference path="../../typings/global.d.ts"/>
var HobbyClue;
(function (HobbyClue) {
    var Core = (function () {
        function Core() {
        }
        Core.applyMixins = function (derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        };
        return Core;
    })();
    HobbyClue.Core = Core;
    var Ajax = (function () {
        function Ajax() {
        }
        Ajax.prototype.post = function (url, formData, successFn) {
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: successFn,
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('error: ' + jqXHR.responseText);
                }
            });
        };
        return Ajax;
    })();
    HobbyClue.Ajax = Ajax;
    var obj = { City: {} };
    obj.City["base"] = "/api/v1/city";
    HobbyClue.Urls = obj;
})(HobbyClue || (HobbyClue = {}));
//# sourceMappingURL=Core.js.map