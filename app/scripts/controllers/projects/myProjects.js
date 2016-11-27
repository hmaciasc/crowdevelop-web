'use strict';

angular.module('crowDevelop')

.controller('MyProjectsCtrl', ['$rootScope', '$scope', '$firebaseArray', function($rootScope, $scope, $firebaseArray) {

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

    $scope.getOwnProjects();
}]);
