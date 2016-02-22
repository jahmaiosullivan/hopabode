app.controller('HomeController', function ($scope, $http) {
    $scope.groups = [];

    $scope.loadgroups = function(){
        $http.get("/api/v1/group/all")
            .success(function(response) {
                $scope.groups = response;
            });
    };

    $scope.memberString = function(memberCnt) {
        return memberCnt + " " + pluralize("member",memberCnt);
    }

    $scope.loadgroups();

});
