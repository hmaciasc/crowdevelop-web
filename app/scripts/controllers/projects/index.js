'use strict';

angular.module('crowDevelop')

.controller('ProjectsIndexCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {

    $scope.categories = ["Development", "Game", "Education", "Social"];

    $scope.getProject = function(id) {
        var rootRef = firebase.database().ref('projects/' + id);
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
