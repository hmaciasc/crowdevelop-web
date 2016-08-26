'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {

    $scope.categories = ["Development", "Game", "Education", "Social"];

    $scope.name;
    $scope.category;
    $scope.email;
    $scope.description;
    $scope.goal;
    $scope.achievement;
    $scope.selectedDate;

    $scope.create = function() {
        var project = $scope.project;
        console.log("date " + $scope.project.selectedDate.getDate());

        $scope.project.day = $scope.project.selectedDate.getDay();
        $scope.project.month = $scope.project.selectedDate.getMonth();
        $scope.project.year = $scope.project.selectedDate.getFullYear();

        $scope.project.owner = $rootScope.firebaseUser.user.uid;
        console.log($scope.project);
        var rootRef = firebase.database().ref().child('projects');
        var ref = rootRef.push(project);
        var obj = $firebaseObject(ref);
        obj.project = project;

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
