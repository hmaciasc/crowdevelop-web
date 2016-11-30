'use strict';

angular.module('crowDevelop')

.controller('MyProjectsCtrl', ['$rootScope', '$scope', '$firebaseArray', 'ProjectService', function($rootScope, $scope, $firebaseArray, ProjectService) {

    $scope.getOwnProjects = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('ownerId').equalTo($rootScope.firebaseUser.uid);
        var list = $firebaseArray(query);
        $rootScope.projectSearch = list;
        if (!list.length) {
            $scope.errorMessage = {};
            $scope.errorMessage.big = 'You have not yet created a project';
            $scope.errorMessage.small = 'Go ahead, get funded.';
        }
    };

    $scope.findProject = function() {
        $rootScope.projectSearch = ProjectService.findProjects('name', $scope.query);
        if (!$rootScope.projectSearch.length) addEmptyMessage();
    };


    function addEmptyMessage() {
        $scope.errorMessage = {};
        $scope.errorMessage.big = 'No projects found with that name';
        $scope.errorMessage.small = 'Look for something else';
    }

    $scope.getOwnProjects();
}]);
