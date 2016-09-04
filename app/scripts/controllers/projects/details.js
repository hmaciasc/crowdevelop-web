'use strict';

angular.module('crowDevelop')

.controller('ProjectsDetailsCtrl', ['$rootScope', '$scope', '$firebaseObject', '$firebaseArray', '$routeParams', function($rootScope, $scope, $firebaseObject, $firebaseArray, $routeParams) {

    var pid = $routeParams.pid;

    $scope.getProject = function(pid) {
        var projectRef = firebase.database().ref('projects/' + pid);
        var obj = $firebaseObject(projectRef);
        $scope.project = obj;
    };

    $scope.getComments = function(pid) {
        var commentsRef = firebase.database().ref('comments/' + pid);
        var obj = $firebaseObject(commentsRef);
        console.log(obj);
        $scope.comments = obj;
    };

    $scope.getOwner = function(uid) {
        var userRef = firebase.database().ref('users/' + uid);
        var obj = $firebaseObject(userRef);
        console.log(obj);
        userRef.on('value', function(snapshot) {
            $scope.owner = snapshot.val();
        });
    }

    $scope.saveComment = function() {
        var commentRef = firebase.database().ref('comments/' + $scope.project.pid);
        var comment = {
            writer: $rootScope.firebaseUser.user.displayName,
            text: $scope.comments.newComment
        };
        console.log($scope.comments.newComment);
        console.log(comment);
        var obj = $firebaseArray(commentRef).$add(comment);
    }

    $scope.getProject(pid);
    $scope.getComments(pid);
}]);
