'use strict';

angular.module('crowDevelop')

.controller('MyProjectsCtrl', ['$rootScope', '$scope', '$firebaseArray', function($rootScope, $scope, $firebaseArray) {

    $scope.getOwnProjects = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('ownerId').equalTo($rootScope.firebaseUser.uid);
        var list = $firebaseArray(query);
        $rootScope.projectSearch = list;
    };

    $scope.getOwnProjects();
}]);
