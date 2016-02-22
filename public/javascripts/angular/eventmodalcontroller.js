app.controller('eventModalController',['$scope', '$rootScope', '$modalInstance', '$http', 'event', 'groupid', 'commonService',
                                      function($scope, $rootScope, $modalInstance, $http, event, groupid, commonService){
    $scope.commonService = commonService;
    $scope.event = event;
    $scope.initialevent = angular.copy($scope.event);
    $scope.submitted = false;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        angular.copy($scope.initialevent, $scope.event); //restore on cancel
        $modalInstance.dismiss('cancel');
    };


    // setup editor options
    $scope.editorOptions = {
      language: 'en',
      removeButtons: 'Source',
      height: '100px'
      //uiColor: '#000000'
    };
    $scope.$on("ckeditor.ready", function( event ) {
      $scope.isReady = true;
    });

    $scope.submitEvent = function(url, isValid) {
        $scope.submitted = true;
        if(isValid) {
            console.log("posting data: " + $scope.event);
            $http.post(url, JSON.stringify($scope.event)).success(function () {
                $rootScope.$broadcast('eventAddedOrUpdated', { 'event': $scope.event });
                $scope.ok();
            });
        }
    };
}]);
