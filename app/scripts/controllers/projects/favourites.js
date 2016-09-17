'use strict';

angular.module('crowDevelop')

.controller('ProjectsFavouritesCtrl', ['$rootScope', '$scope', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseObject, $location) {

    var user = $rootScope.firebaseUser;

    $scope.getFavouriteProjects = function() {
        var uid = user.uid;
        var favsRef = firebase.database().ref('favourites/' + uid);
        favsRef.on('value', function(snapshot) {
            var pid;
            var projects = [];
            for (pid in snapshot.val()) {
                if (snapshot.val()[pid]) {
                    projects.push(getProject(pid));
                }
            }
            $scope.favProjects = projects;
        });
    }

    $scope.go = function(ref) {
        $location.path(ref);
    }

    function getProject(pid) {
        var projectRef = firebase.database().ref('projects/' + pid);
        return $firebaseObject(projectRef);
    };

    $scope.getFavouriteProjects();
}]);
