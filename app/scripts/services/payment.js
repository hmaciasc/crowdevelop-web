'use strict';

angular.module('crowDevelop').factory('Payment', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {

    var Payment = function(properties) {
        angular.extend(this, properties);
    };


    /**
     * @constructor
     */
    function Payment(params) {

    };

    Payment.prototype.pay = function(params) {
        var auth = $firebaseAuth();
        var deferred = $q.defer();
        console.log("Payment SERVICE");
        $http.post(domain + '/pay', params)
            .success(function(res) {
              deferred.resolve(res);
            })
            .error(function(res) {
              deferred.reject(res.error);
            });
        return deferred.promise;
    };

    return Payment;

}]);
