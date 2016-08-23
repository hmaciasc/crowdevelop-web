'use strict';

angular.module('crowDevelop')

.controller('ProjectsCreateCtrl', ['$scope', '$firebaseObject', '$location', function($scope, $firebaseObject, $location) {

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

        $scope.name = $scope.project.name;
        $scope.category = $scope.project.category;
        $scope.email = $scope.project.email;
        $scope.description = $scope.project.description;
        $scope.goal = $scope.project.goal;
        $scope.achievement = $scope.project.achievement;
        $scope.selectedDate = $scope.project.selectedDate;

        console.log($scope.project);
        var ref = firebase.database().ref();

        var obj = $firebaseObject();
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
