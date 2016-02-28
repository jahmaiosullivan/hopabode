/// <reference path="../../typings/global.d.ts"/>
/// <reference path="./Core.ts"/>

module HobbyClue {
    export class Groups implements Ajax {
        saveCity(cityName:string) {
            var formData = {name: cityName};
            this.post(HobbyClue.Urls.City["base"],
                        formData,
                        function (data, textStatus, jqXHR) {
                            //data - response from server
                            alert('I am ready: ' + data);
                        });
        }

        post:(url:string, formdata:any, successFn:any) => void;
    }
}
HobbyClue.Core.applyMixins(HobbyClue.Groups, [HobbyClue.Ajax])

$(function () {
    var groups = new HobbyClue.Groups();
    groups.saveCity('RightNow');
});
