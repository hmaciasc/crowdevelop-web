'use strict';

angular.module('crowDevelop')

.controller('HomeCtrl', ['$rootScope', '$scope', '$firebaseArray', '$location', function($rootScope, $scope, $firebaseArray, $location) {

    $scope.findProject = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('name').equalTo($scope.query);
        var list = $firebaseArray(query);
        $rootScope.projectSearch = list;
        console.log(list);
        $location.path('/projects/index');
    };

    $scope.init = function() {
        var projectRef = firebase.database().ref('projects/');
        var query = projectRef.orderByChild('donated').limitToLast(10);
        $scope.projects = $firebaseArray(query);
        console.log($scope.projects);
    };

    $scope.go = function(ref) {
        $location.path(ref);
    }

    $scope.init();
}]);
