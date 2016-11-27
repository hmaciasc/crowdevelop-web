'use strict';

angular.module('crowDevelop').factory('AuthService', ['$rootScope', '$firebaseAuth', '$location', '$q', '$localStorage', '$firebaseObject', function($rootScope, $firebaseAuth, $location, $q, $localStorage, $firebaseObject) {

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
            $localStorage.firebaseUser = firebaseUser.user;
            deferred.resolve(firebaseUser.user);
            addTokenToDatabase(firebaseUser.user);
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

    function addTokenToDatabase(user) {
        var notificationsRef = firebase.database().ref('notificationRequests');
        var key = notificationsRef.push().key;
        var user = {
            username: user.displayName,
            token: $rootScope.fcmToken
        };
        firebase.database().ref('notificationRequests/' + user.uid).set(user);
    }

    AuthService.prototype.logout = function() {
        var auth = $firebaseAuth();
        auth.$signOut();
        $localStorage.$reset();
        $rootScope.firebaseUser = null;
    };

    return AuthService;

}]);
