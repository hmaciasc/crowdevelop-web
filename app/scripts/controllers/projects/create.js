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
        var ref = firebase.database().ref();

        var obj = $firebaseObject(ref);

        obj.$loaded().then(function() {
            $location.path('/');
        });


    };

}]);
