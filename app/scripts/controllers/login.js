'use strict';

angular.module('crowDevelop')

.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'AuthService', function($rootScope, $scope, $location, AuthService) {


    $scope.login = function(provider) {
        $rootScope.authService.login(provider).then(function(user) {
            console.log(user);
            $rootScope.firebaseUser = user;
            if (user != null) {
                $location.path('/');
            }
        }, function(error) {
            $scope.loginError = error;
        });
    };


    $scope.logout = function() {
        $rootScope.authService.logout();
        $location.path('/');
    };

}]);
