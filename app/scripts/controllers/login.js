'use strict';

angular.module('crowDevelop').controller('LoginCtrl', ['$rootScope', '$scope', '$firebaseAuth', function($rootScope, $scope, $firebaseAuth) {

    /**
     * @return void
     */
    $scope.login = function() {
        $rootScope.authService.login();
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
