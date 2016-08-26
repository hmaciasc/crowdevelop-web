'use strict';

var config = {
    apiKey: "AIzaSyDP4kTth7VjRSaNosacjj3PKGKM76OJKD0",
    authDomain: "crowdevelop-40f3c.firebaseapp.com",
    databaseURL: "https://crowdevelop-40f3c.firebaseio.com",
    storageBucket: "crowdevelop-40f3c.appspot.com",
};

firebase.initializeApp(config);

angular.module('crowDevelop', ['firebase', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap'])

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
        .when('/projects/create', {
            templateUrl: 'views/projects/create.html',
            controller: 'ProjectsCreateCtrl'
        })
        .when('/projects/index', {
            templateUrl: 'views/projects/index.html',
            controller: 'ProjectsIndexCtrl'
        })
        .otherwise({
            templateUrl: 'views/404.html'
        });
    $locationProvider.html5Mode(true);
}])

.filter('trusted', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + url + "?rel=0");
    };
}])

.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
    $rootScope.authService = new AuthService({
        provider: 'google'
    });
    $rootScope.goTo = function(path) {
        $location.path(path);
    }
}]);
