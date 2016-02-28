/// <reference path="../../typings/global.d.ts"/>
/// <reference path="./Core.ts"/>
var HobbyClue;
(function (HobbyClue) {
    var Groups = (function () {
        function Groups() {
        }
        Groups.prototype.saveCity = function (cityName) {
            var formData = { name: cityName };
            this.post(HobbyClue.Urls.City["base"], formData, function (data, textStatus, jqXHR) {
                //data - response from server
                alert('I am ready: ' + data);
            });
        };
        return Groups;
    })();
    HobbyClue.Groups = Groups;
})(HobbyClue || (HobbyClue = {}));
HobbyClue.Core.applyMixins(HobbyClue.Groups, [HobbyClue.Ajax]);
$(function () {
    var groups = new HobbyClue.Groups();
    groups.saveCity('RightNow');
});
//# sourceMappingURL=Groups.js.map