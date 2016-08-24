'use strict';

angular.module('crowDevelop')

.controller('ProjectsIndexCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {

    $scope.categories = ["Development", "Game", "Education", "Social"];

    $scope.name;
    $scope.category;
    $scope.email;
    $scope.description;
    $scope.goal;
    $scope.achievement;
    $scope.selectedDate;


    $scope.getProjects = function() {
        var rootRef = firebase.database().ref().child('projects');
        console.log(rootRef);
        $scope.projects = rootRef;

        firebase.database().ref('/projects/').once('value').then(function(snapshot) {
          var projectID = snapshot.val();
        });
        //var ref = rootRef.push($scope.project);
        //var obj = $firebaseObject(ref);


        //$location.path('/');
    };

}]);
