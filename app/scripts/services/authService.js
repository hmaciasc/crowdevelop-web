'use strict';

angular.module('crowDevelop').factory('AuthService', ['$rootScope', '$firebaseAuth', '$location', '$q', '$localStorage', function($rootScope, $firebaseAuth, $location, $q, $localStorage) {

    var AuthService = function(properties) {
        angular.extend(this, properties);
    };

    AuthService.prototype.isLoggedIn = function() {
        return !!$localStorage.firebaseUser;
    }

    AuthService.prototype.getLocalUser = function() {
        return $localStorage.firebaseUser;
    }

    AuthService.prototype.login = function(provider) {
        var auth = $firebaseAuth();
        var deferred = $q.defer();

        auth.$signInWithPopup(provider).then(function(firebaseUser) {
            console.log(firebaseUser);
            $localStorage.firebaseUser = firebaseUser.user;
            deferred.resolve(firebaseUser.user);
        }).catch(function(error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                firebase.auth().currentUser.link(error.credential).then(function(firebaseUser) {
                    console.log("Account linking success", firebaseUser);
                    $localStorage.firebaseUser = firebaseUser.user;
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
        $localStorage.$reset();
        $rootScope.firebaseUser = null;
    };

    return AuthService;

}]);
