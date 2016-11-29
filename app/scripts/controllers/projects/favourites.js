'use strict';

angular.module('crowDevelop')

.controller('ProjectsFavouritesCtrl', ['$rootScope', '$scope', '$firebaseObject', '$firebaseArray', '$location', function($rootScope, $scope, $firebaseObject, $firebaseArray, $location) {

    var user = $rootScope.firebaseUser;

    $scope.getFavouriteProjects = function() {
        var uid = user.uid;
        var favProjectsRef = firebase.database().ref('favourites/' + uid);
        var favourites = $firebaseArray(favProjectsRef);
        favourites.$loaded().then(function() {
            var projects = [];
            for (var i = 0; i < favourites.length; i++) {
                if (favourites[i].$value) {
                    projects.push(getProject(favourites[i].$id));
                }
            }
            $scope.favProjects = projects;
        });
        if (!favourites.length) addEmptyMessage();
    }

    function getProject(pid) {
        var projectRef = firebase.database().ref('projects/' + pid);
        return $firebaseObject(projectRef);
    };

    function addEmptyMessage() {
        $scope.errorMessage = {};
        $scope.errorMessage.big = 'You have no favourite projects...Yet!';
        $scope.errorMessage.small = 'Favourite a project first';
    }

    $scope.getFavouriteProjects();
}]);
