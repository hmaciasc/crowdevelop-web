'use strict';

angular.module('crowDevelop').factory('AuthService', ['$rootScope', '$firebaseAuth', '$location', '$q', function($rootScope, $firebaseAuth, $location, $q) {

    /**
     * @constructor
     */
    function AuthService(params) {

    };

    AuthService.prototype.login = function(provider) {
        var auth = $firebaseAuth();
        var deferred = $q.defer();
        console.log("LOGIN SERVICE");

        auth.$signInWithPopup(provider).then(function(firebaseUser) {
            console.log(firebaseUser);
            deferred.resolve(firebaseUser.user);
        }).catch(function(error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                firebase.auth().currentUser.link(error.credential).then(function(firebaseUser) {
                    console.log("Account linking success", firebaseUser);
                    deferred.resolve(firebaseUser);
                }, function(error) {
                    console.log("Account linking error", error);
                    deferred.reject('Error linking');
                });
            }
        });
        return deferred.promise;
    };

    AuthService.prototype.logout = function() {
        console.log("LOGOUT");
        var auth = $firebaseAuth();
        auth.$signOut();
        $rootScope.firebaseUser = null;
    };

    return AuthService;

}]);
