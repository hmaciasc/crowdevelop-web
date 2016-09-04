'use strict';

angular.module('crowDevelop').factory('AuthService', ['$rootScope', '$firebaseAuth', '$location', function($rootScope, $firebaseAuth, $location) {

    /**
     * @constructor
     */
    function AuthService(params) {

    };

    AuthService.prototype.login = function() {
        var auth = $firebaseAuth();
        var firebaseUser = null;
        var error = null;
        console.log("LOGIN SERVICE");

        auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log(firebaseUser);
            $rootScope.firebaseUser = firebaseUser;
            $location.path('/');
        }).catch(function(error) {
            $rootScope.logginError = error;
        });
    };

    AuthService.prototype.logout = function() {
        console.log("LOGOUT");
        var auth = $firebaseAuth();
        auth.$signOut();
        $rootScope.firebaseUser = null;
    };

    return AuthService;

}]);
