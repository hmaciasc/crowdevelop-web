'use strict';

angular.module('crowDevelop')

.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'AuthService', function($rootScope, $scope, $location, AuthService) {


    $scope.login = function(provider) {
        console.log("LOGIN CTRL");
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
        console.log("LOGIN CTRL");
        $rootScope.authService.logout();
        $location.path('/');
    };
    /**
    //var auth = $firebaseAuth();
    $scope.authObj = $firebaseAuth();
    //var currentUser = $scope.authObj.$getAuth();

    $scope.authObj.signIn = function() {
        $scope.firebaseUser = null;
        $scope.error = null;

        $scope.authObj.$signInWithPopup("google").then(function(firebaseUser) {
            console.log(firebaseUser);
            $scope.firebaseUser = firebaseUser;
        }).catch(function(error) {
            $scope.error = error;
        });
    };

    $scope.authObj.signOut = function() {
        $scope.firebaseUser = null;
        firebase.auth().signOut();
    };

    $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
        } else {
            console.log("Signed out");
        }
    });*/
}]);
