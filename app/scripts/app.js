'use strict';

var config = {
    apiKey: "AIzaSyDP4kTth7VjRSaNosacjj3PKGKM76OJKD0",
    authDomain: "crowdevelop-40f3c.firebaseapp.com",
    databaseURL: "https://crowdevelop-40f3c.firebaseio.com",
    storageBucket: "crowdevelop-40f3c.appspot.com",
};

firebase.initializeApp(config);

angular.module('crowDevelop', ['firebase', 'ngRoute', 'ngStorage', 'mgcrea.ngStrap'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                templateUrl: 'views/404.html'
            });
        $locationProvider.html5Mode(true);
    }])
    .run(['$rootScope', 'AuthService', function($rootScope, AuthService) {
        $rootScope.authService = new AuthService({
            provider: 'google'
        });
    }]);
