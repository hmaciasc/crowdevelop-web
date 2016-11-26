'use strict';

angular.module('crowDevelop')

.controller('HomeCtrl', ['$rootScope', '$scope', '$firebaseArray', '$firebaseObject', '$location', function($rootScope, $scope, $firebaseArray, $firebaseObject, $location) {

    $scope.queryFilter = {};
    $scope.queryBy = '$';


    $scope.findProject = function() {
        var projectsRef = firebase.database().ref('projects/');
        var query = projectsRef.orderByChild('name').equalTo($scope.query);
        var list = $firebaseArray(query);
        $rootScope.projectSearch = list;
        $location.path('/projects/index');
    };

    $scope.init = function() {
        var projectRef = firebase.database().ref('projects/');
        var query = projectRef.orderByChild('donated').limitToLast(10);
        $scope.projects = $firebaseArray(query);
        updateStatuses($scope.projects);
    };


    function updateStatuses(projects) {
        projects.$loaded(
            function(projects) {
                for (var i = 0; i < projects.length; i++) {
                    var expireDate = new Date(projects[i].year, projects[i].month, projects[i].day);
                    var now = new Date();
                    now.setHours(0, 0, 0, 0);
                    if (expireDate < now) endProject(projects[i]);
                }
            },
            function(err) {
                console.log(err);
            });
    }

    function endProject(project) {
        var projectRef = firebase.database().ref('projects/' + project.$id);
        var project = $firebaseObject(projectRef);
        project.status = 'closed';
        project.$save();
    }

    $scope.init();
}]);
