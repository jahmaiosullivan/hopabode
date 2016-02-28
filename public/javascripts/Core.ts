/// <reference path="../../typings/global.d.ts"/>

module HobbyClue {
    export class Core
    {
        static applyMixins(derivedCtor:any, baseCtors:any[]):void {
            baseCtors.forEach(baseCtor => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                })
            });
        }
    }

    export class Ajax {
        post(url: string, formData: any, successFn: any) {
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                success: successFn,
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('error: ' + jqXHR.responseText);
                }
            });
        }
    }
}