var app = angular.module('myApp', ['mm.foundation','google.places','ngCkeditor','flow','ngTagsInput'])
                 .config(['flowFactoryProvider', function (flowFactoryProvider) {
                            flowFactoryProvider.defaults = {
                                target: '/api/v1/upload',
                                permanentErrors: [404, 500, 501],
                                maxChunkRetries: 1,
                                chunkRetryInterval: 5000,
                                simultaneousUploads: 4,
                                singleFile: true
                            };
                            flowFactoryProvider.on('catchAll', function (event) {
                                console.log('catchAll', arguments);
                            });
                            flowFactoryProvider.on('fileSuccess', function (event, $flow, flowFile, message) {
                                console.log('successfully uploaded ' + JSON.parse($flow).path);
                            });
                            // Can be used with different implementations of Flow.js
                            // flowFactoryProvider.factory = fustyFlowFactory;
                        }]);

app.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);

app.factory('commonService', ['dateFormat', function(dateFormat) {
    var service = {};

    service.dateFormat = dateFormat;
    service.formatDate = function (date) {
        return moment(date).format(dateFormat);
    };

    return service;
}]);



// Adds a focused param if an element is in focus
app.directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function() {ctrl.$focused = true;});
            }).bind('blur', function(evt) {
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function() {ctrl.$focused = false;});
            });
        }
    }
}]);