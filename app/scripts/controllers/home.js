'use strict';

angular.module('crowDevelop')

.controller('HomeCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.alo = "asd";

    $scope.logout = function() {
        $rootScope.firebaseUser = null;
    }
}]);
