'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$rootScope', '$scope', '$firebaseArray', '$location', function($rootScope, $scope, $firebaseArray, $location) {
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

    $scope.log = function(image) {
        $scope.project.image = image.files[0];
        window.image = image.files[0];
        $scope.$apply();
    };

    $scope.create = function() {
        var project = $scope.project;

        $scope.project.ownerId = $rootScope.firebaseUser.uid;
        $scope.project.ownerName = $rootScope.firebaseUser.displayName;
        $scope.project.day = $scope.project.selectedDate.getDay();
        $scope.project.month = $scope.project.selectedDate.getMonth() + 1;
        $scope.project.year = $scope.project.selectedDate.getFullYear();
        $scope.project.donated = 0;
        $scope.project.status = "inProgress";
        $scope.project.imagesRef = "";

        var vid = $scope.project.videoUrl.replace("/watch?v=", "/embed/");
        var initIndex = vid.lastIndexOf("/");
        var videoId = vid.slice(initIndex + 1, vid.length);
        $scope.project.video = videoId;

        var ref = firebase.database().ref('projects');
        var list = $firebaseArray(ref);
        list.$add($scope.project).then(function(ref) {
            uploadPhoto(ref.key);
        });

        $location.path('/');
    };

    function uploadPhoto(projectKey) {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var imagesRef = storageRef.child('projectImages/' + projectKey).put($scope.project.image);
        var downUrl = imagesRef.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            function(error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object");
                        break;

                    case 'storage/canceled':
                        console.log('User canceled the upload');
                        break;

                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect error.serverResponse');
                        break;
                }
            },
            function() {
                $scope.project.imagesRef = imagesRef.snapshot.downloadURL;

                var ref = firebase.database().ref('projects/' + projectKey + '/imageRef');
                ref.set(imagesRef.snapshot.downloadURL);

                return imagesRef.snapshot.downloadURL;
            });
    }

}]);
