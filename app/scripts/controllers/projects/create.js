'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {

    $scope.categories = ["Development", "Game", "Education", "Social"];

    $scope.create = function() {
        var project = $scope.project;

        $scope.project.ownerId = $rootScope.firebaseUser.user.uid;
        $scope.project.ownerName = $rootScope.firebaseUser.user.displayName;
        $scope.project.donated = 0;
        $scope.project.negativeDonated = 0;
        $scope.project.day = $scope.project.selectedDate.getDay();
        $scope.project.month = $scope.project.selectedDate.getMonth();
        $scope.project.year = $scope.project.selectedDate.getFullYear();

        $scope.project.video = $scope.project.video.replace("/watch?v=", "/embed/");
        var vid = $scope.project.video;
        var initIndex = $scope.project.video.lastIndexOf("/");
        var videoId = $scope.project.video.slice(initIndex + 1, vid.length);
        $scope.project.video = videoId;

        var rootRef = firebase.database().ref().child('projects');
        var ref = rootRef.push().key;
        $scope.project.pid = ref;
        //var obj = $firebaseObject(ref);
        //obj.project = $scope.project;

        firebase.database().ref('projects/' + ref).set($scope.project);

        $location.path('/');
    };

}]);
