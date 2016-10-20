'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {

    $scope.currentDate = new Date();

    $scope.create = function() {
        var project = $scope.project;

        $scope.project.ownerId = $rootScope.firebaseUser.uid;
        $scope.project.ownerName = $rootScope.firebaseUser.displayName;
        $scope.project.donated = 0;
        $scope.project.day = $scope.project.selectedDate.getDay();
        $scope.project.month = $scope.project.selectedDate.getMonth() + 1;
        $scope.project.year = $scope.project.selectedDate.getFullYear();
        $scope.project.status = "inProgress";

        var vid = $scope.project.video.replace("/watch?v=", "/embed/");
        var initIndex = vid.lastIndexOf("/");
        var videoId = vid.slice(initIndex + 1, vid.length);
        $scope.project.video = videoId;

        var projectsRef = firebase.database().ref('projects');
        var project = projectsRef.push();
        project.set($scope.project);

        $location.path('/');
    };

}]);
