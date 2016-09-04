'use strict';

angular.module('crowDevelop')

.controller('ProjectsDetailsCtrl', ['$rootScope', '$scope', '$firebaseObject', '$routeParams', function($rootScope, $scope, $firebaseObject, $routeParams) {

    var pid = $routeParams.pid;

    $scope.getProject = function(pid) {
        var projectRef = firebase.database().ref('projects/' + pid);
        var obj = $firebaseObject(projectRef);
        $scope.project = obj;
        console.log(obj);
    };

    $scope.getOwner = function(uid) {
        var userRef = firebase.database().ref('users/' + uid);
        var obj = $firebaseObject(userRef);
        console.log(obj);
        userRef.on('value', function(snapshot) {
            $scope.owner = snapshot.val();
        });
    }

    $scope.getProject(pid);
}]);
