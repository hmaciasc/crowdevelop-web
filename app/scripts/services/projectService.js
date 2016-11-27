'use strict';

angular.module('crowDevelop').factory('ProjectService', ['$rootScope', '$firebaseArray', '$location', '$q', '$localStorage', function($rootScope, $firebaseArray, $location, $q, $localStorage) {

    var ProjectService = function(properties) {
        angular.extend(this, properties);
    };

    ProjectService.findProjects = function(field, query) {
        var projectsRef = firebase.database().ref('projects/');
        var orderedProjects = projectsRef.orderByChild(field).equalTo(query);
        var projectList = $firebaseArray(orderedProjects);
        return projectList;
    };

    return ProjectService;

}]);
