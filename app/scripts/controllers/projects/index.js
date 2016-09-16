'use strict';

angular.module('crowDevelop')

.controller('ProjectsIndexCtrl', ['$rootScope', '$scope', '$firebaseArray', '$location', function($rootScope, $scope, $firebaseArray, $location) {

    $scope.findProject = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('name').equalTo($scope.query);
        var list = $firebaseArray(query);
        $rootScope.projectSearch = list;
        // $location.path('/projects/index');
    };

    $scope.go = function(ref) {
        $location.path(ref);
    }

}]);
