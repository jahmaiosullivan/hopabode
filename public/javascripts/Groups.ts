/// <reference path="../../typings/global.d.ts"/>
/// <reference path="./Core.ts"/>

module HobbyClue {
    export class Groups implements Ajax {
        constructor() {

        }

        saveCity(cityName:string) {
            var formData = {name: cityName};
            this.post("/api/v1/city",
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
    groups.saveCity('Daylight');
});
