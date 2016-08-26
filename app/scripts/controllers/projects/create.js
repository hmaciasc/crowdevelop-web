'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', '$sce', function($rootScope, $scope, $firebaseObject, $location, $sce) {

    $scope.categories = ["Development", "Game", "Education", "Social"];

    $scope.create = function() {
        var project = $scope.project;

        $scope.project.owner = $rootScope.firebaseUser.user.uid;
        $scope.project.day = $scope.project.selectedDate.getDay();
        $scope.project.month = $scope.project.selectedDate.getMonth();
        $scope.project.year = $scope.project.selectedDate.getFullYear();

        $scope.project.video = $scope.project.video.replace("/watch?v=", "/embed/");
        var vid = $scope.project.video;
        var initIndex = $scope.project.video.lastIndexOf("/");
        var videoId = $scope.project.video.slice(initIndex + 1, vid.length);
        $scope.project.video = videoId;
        console.log(videoId);
        /*console.log("Antes SCE " + $scope.project.video);
        $scope.project.video = $sce.trustAsUrl($scope.project.video);
        console.log($scope.project.video);*/

        var rootRef = firebase.database().ref().child('projects');
        var ref = rootRef.push($scope.project);
        var obj = $firebaseObject(ref);
        obj.project = $scope.project;

        obj.$save().then(function(ref) {
            ref.key === obj.$id; // true
        }, function(error) {
            console.log("Error:", error);
        });


        obj.$loaded().then(function() {
            $location.path('/');
        });

        $location.path('/');
    };

}]);
