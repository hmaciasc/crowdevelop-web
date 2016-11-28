'use strict';

angular.module('crowDevelop')

.controller('ProjectsCategoryCtrl', ['$rootScope', '$scope', '$firebaseArray', '$location', '$routeParams', 'ProjectService', function($rootScope, $scope, $firebaseArray, $location, $routeParams, ProjectService) {

    var category = $routeParams.category;

    $scope.getCategoryProjects = function() {
        $rootScope.projectSearch = ProjectService.findProjects('category', category);
        if (!$rootScope.projectSearch.length) addEmptyMessage();
    };

    function addEmptyMessage() {
        $scope.errorMessage = {};
        $scope.errorMessage.big = 'No projects found in that category';
        $scope.errorMessage.small = 'Look for something else';
    }

    $scope.findProject = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('name').equalTo($scope.query);
        var list = $firebaseArray(query);
        $rootScope.projectSearch = list;
        $location.path('/projects/index');
    };


    $scope.getCategoryProjects();
}]);
