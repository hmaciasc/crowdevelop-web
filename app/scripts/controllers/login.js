'use strict';

angular.module('crowDevelop').controller('LoginCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

  /**
   * @return void
   */
  $scope.login = function() {
    $rootScope.authService.login();
  };

}]);
