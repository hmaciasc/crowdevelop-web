'use strict';

angular.module('crowDevelop')

.controller('HeaderCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.logout = function() {
        $rootScope.firebaseUser = null;
    }

    $scope.init = function() {
        var projectRefs = firebase.database().ref('projects/');
        projectRefs.on('value', function(snapshot) {
            console.log(snapshot.val());
            var data = snapshot.val();
            var projects = [];
            for (var projectId in data) {
                projects.push(data[projectId]);
            }
            console.log(projects);
            $rootScope.projects = projects;
        });
    };

    $scope.init();
}]);
