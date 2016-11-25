'use strict';

angular.module('crowDevelop')

.controller('ProjectsIndexCtrl', ['ProjectService', '$rootScope', '$scope', '$firebaseArray', '$location', function(ProjectService, $rootScope, $scope, $firebaseArray, $location) {

    $scope.findProject = function() {
        $rootScope.projectSearch = ProjectService.findProjects('name', $scope.query);
        if (!$rootScope.projectSearch.length) addEmptyMessage();
    };


    function addEmptyMessage() {
        $scope.errorMessage = {};
        $scope.errorMessage.big = 'No projects found with that name';
        $scope.errorMessage.small = 'Look for something else';
    }

    if (!$rootScope.projectSearch.length) addEmptyMessage();

}]);
