'use strict';

angular.module('crowDevelop')

.controller('HeaderCtrl', ['$rootScope', '$scope', 'AuthService', function($rootScope, $scope, AuthService) {

    $scope.logout = function() {
        $rootScope.authService.logout();
    }
}]);
