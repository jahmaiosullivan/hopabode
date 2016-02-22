app.controller('GroupController', function ($scope, $http, $modal, $timeout, $log, groupid, ismember, commonService) {
    $scope.commonService = commonService;
    $scope.ismember = (ismember === 'true');

    $scope.$on('eventAddedOrUpdated', function (event, args) {
        $scope.loadevents();
    });

    $scope.loadevents = function(){
        $http.get("/api/v1/event?groupid=" + groupid)
            .success(function(response) {
                $scope.events = response;
            });
    }

    $scope.update = function(eventid) {
        console.log('update link clicked for event ' + eventid);
        $('#eventCreateModal').foundation('reveal', 'open', "/event/create?eventid=" + eventid);
    };

    $scope.delete = function(eventid) {
        console.log('delete link clicked for event ' + eventid);
        $.ajax({
            'type': 'delete',
            'url': '/api/v1/event',
            'data': {id: eventid},
            'success': function (data) {
                console.log('deleted event ' + eventid);
            }
        });
        return false;
    };

    $scope.open = function (modalUrl, $event) {
        if(!$event)
            $event = {
                groupid: groupid
            };
        else {
            $event.start = commonService.formatDate($event.start);
            $event.end = commonService.formatDate($event.end);
        }

        var modalInstance = $modal.open({
            templateUrl: modalUrl,
            controller: 'eventModalController',
            resolve: {
                event: function () {
                    return $event;
                }
            }
        });

        modalInstance.opened.then(function() {
            $timeout(function() {
                OneToMany_Events.ConfigureStartEndDatePickers(commonService.dateFormat,$('#eventstartdate'), $('#eventenddate'), moment(), moment());
            }, 200);
        });

        modalInstance.opened.then(function (selectedItem) {

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

        modalInstance.result.then(function (selectedItem) {

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.loadevents();

});

app.controller('CreateGroupController', function ($scope, $http) {

    $scope.submitted = false;
    $scope.group = {};

    $scope.createGroup = function(url, isValid) {
        $scope.submitted = true;
        if(isValid) {
            console.log("creating group: " + $scope.group);
            $http.post(url, JSON.stringify($scope.group)).success(function () {
                alert('saved group');
            });
        }
    };

    $scope.imageChanged = function(result) {
        $scope.group.bannerurl = JSON.parse(result).path;
    };
});
