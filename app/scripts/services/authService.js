'use strict';

angular.module('crowDevelop').factory('AuthService', ['$rootScope', '$firebaseAuth', '$location', '$q', '$localStorage', '$firebaseObject',
    function($rootScope, $firebaseAuth, $location, $q, $localStorage, $firebaseObject) {

        var AuthService = function(properties) {
            angular.extend(this, properties);
        };

        AuthService.prototype.isLoggedIn = function() {
            return !!$localStorage.firebaseUser;
        }

        AuthService.prototype.getLocalUser = function() {
            return $localStorage.firebaseUser;
        }

        AuthService.prototype.login = function(providerInput) {
            var auth = $firebaseAuth();
            var deferred = $q.defer();
            var provider = getProviderForProviderId(providerInput);
            auth.$signInWithPopup(provider).then(function(firebaseUser) {
                $localStorage.firebaseUser = firebaseUser.user;
                deferred.resolve(firebaseUser.user);
                addTokenToDatabase(firebaseUser.user);
            }).catch(function(error) {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    var pendingCred = error.credential;
                    var email = error.email;

                    firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
                        var provider = getProviderForProviderId(providers[0]);
                        firebase.auth().signInWithPopup(provider).then(function(firebaseUser) {
                            firebase.auth().currentUser.link(pendingCred).then(function(firebaseUser) {
                                console.log("Account linking success", firebaseUser);
                                $localStorage.firebaseUser = firebaseUser;
                                deferred.resolve(firebaseUser);
                                addTokenToDatabase(firebaseUser);
                            });
                        });
                    });
                }
            });
            return deferred.promise;
        };

        function getProviderForProviderId(provider) {
            if (provider === "google.com") return new firebase.auth.GoogleAuthProvider();
            if (provider === "facebook.com") return new firebase.auth.FacebookAuthProvider();
            if (provider === "twitter.com") return new firebase.auth.TwitterAuthProvider();
        }

        function addTokenToDatabase(user) {
            var notificationsRef = firebase.database().ref('notificationRequests');
            var key = notificationsRef.push().key;
            var user = {
                username: user.displayName,
                token: $rootScope.fcmToken
            };
            firebase.database().ref('notificationRequests/' + key).set(user);
        }

        AuthService.prototype.logout = function() {
            var auth = $firebaseAuth();
            auth.$signOut();
            $localStorage.$reset();
            $rootScope.firebaseUser = null;
        };

        return AuthService;

    }
]);
