'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {
    $scope.project = {};
    $scope.currentDate = new Date();

    $scope.myDate = new Date();

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate());

    $scope.maxDate = new Date(
        $scope.myDate.getFullYear() + 2,
        $scope.myDate.getMonth() + 1,
        $scope.myDate.getDate());

    // window.sco = $scope;

    $scope.log = function(image) {
        $scope.project.image = image.files[0];
        window.image = image.files[0];
        console.log($scope);
        $scope.$apply();
    };

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
        $scope.project.imageRef = uploadPhoto(project.key);

        $location.path('/');
    };

    function uploadPhoto(projectKey) {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var imagesRef = storageRef.child('projectImages/' + projectKey).put($scope.project.image);

        console.log(imagesRef);

        return imagesRef;
    }

}]);
