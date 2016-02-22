app.controller('MembersController', function($scope, $http, groupid, ismember){
    var memberslink = "/api/v1/group/"+ groupid + "/members";

    $scope.ismember = (ismember === 'true');

    $scope.allmembers = function(){
        $http.get(memberslink)
            .success(function(response) {
                $scope.members = response;
            });
    }

    $scope.allmembers();

    $scope.filterMembers = function(startletter) {
        $http.get(memberslink + "/" + startletter)
            .success(function(response) {
                $scope.members = response;
            });
    }
});