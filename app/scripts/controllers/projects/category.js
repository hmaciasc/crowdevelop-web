'use strict';

angular.module('crowDevelop')

.controller('ProjectsCategoryCtrl', ['$rootScope', '$scope', '$firebaseArray', '$location', '$routeParams', function($rootScope, $scope, $firebaseArray, $location, $routeParams) {

    var category = $routeParams.category;

    $scope.getCategoryProjects = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('category').equalTo(category);
        var list = $firebaseArray(query);
        console.log("list ", list);
        $rootScope.projectSearch = list;
        // $location.path('/projects/index');
    };

    $scope.go = function(ref) {
        $location.path(ref);
    }

    $scope.getCategoryProjects();
}]);
