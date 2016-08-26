'use strict';

angular.module('crowDevelop')

.controller('HeaderCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.header = {
        name: "header.html",
        url: "header.html"
    };
}]);
