'use strict';

angular.module('crowDevelop')

.controller('HomeCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.init = function() {
        var projectRefs = firebase.database().ref('projects/');
        projectRefs.on('value', function(snapshot) {
            console.log(snapshot.val());
            var data = snapshot.val();
            var projects = [];
            for (var projectId in data) {
                projects.push(data[projectId].project);
            }
            console.log(projects);
            $rootScope.projects = projects;
        });
    };

    $scope.logout = function() {
        $rootScope.firebaseUser = null;
    }

    $scope.init();
}]);
