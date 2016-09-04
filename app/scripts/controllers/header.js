'use strict';

angular.module('crowDevelop')

.controller('HeaderCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {

    $scope.logout = function() {
        $rootScope.firebaseUser = null;
    }
}]);
