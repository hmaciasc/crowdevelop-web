'use strict';

angular.module('crowDevelop').factory('AuthService', ['$localStorage', '$rootScope', function($localStorage, $rootScope, $firebaseAuth) {

  /**
   * @constructor
   */
  function AuthService(params) {
    this.authProvider = params.provider;
  };

  /**
   * @public
   * @return void
   */
  AuthService.prototype.login = function() {
    var firebaseUser = null;
    var error = null;

    $firebase().$signInWithPopup("google").then(function(firebaseUser) {
        console.log(firebaseUser);
        $rootScope.firebaseUser = firebaseUser;
    }).catch(function(error) {
        $rootScope.logginError = error;
    });
  };


  return AuthService;

}]);
