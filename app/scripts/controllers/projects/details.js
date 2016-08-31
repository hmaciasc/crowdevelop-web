'use strict';

angular.module('crowDevelop')

.controller('ProjectsDetailsCtrl', ['$rootScope', '$scope', '$firebaseObject', '$routeParams', function($rootScope, $scope, $firebaseObject, $routeParams) {

    var pid = $routeParams.pid;

    function getProject(pid) {
        var projectRef = firebase.database().ref('projects/' + pid);
        projectRef.on('value', function(snapshot) {
            $scope.project = snapshot.val();
        });
    };

    $scope.getOwner = function(uid) {
        var userRef = firebase.database().ref('users/' + uid);
        userRef.on('value', function(snapshot) {
            $scope.owner = snapshot.val();
        });
    }

    getProject(pid);
}]);
