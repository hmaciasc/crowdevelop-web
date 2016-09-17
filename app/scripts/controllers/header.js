'use strict';

angular.module('crowDevelop')

.controller('HeaderCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.logout = function() {
        $rootScope.firebaseUser = null;
    }
}]);
