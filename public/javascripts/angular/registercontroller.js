app.controller('RegisterController', function($scope, $http, $window){
    $scope.user = {};
    $scope.submitted = false;

    $scope.submit = function(url, isValid) {
        $scope.submitted = true;
        if(isValid) {
            $http.post(url, JSON.stringify($scope.user)).success(function () {
                $window.location.href = "/";
            });
        }
    };
});
