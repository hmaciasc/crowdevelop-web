'use strict';

var config = {
    apiKey: "AIzaSyDP4kTth7VjRSaNosacjj3PKGKM76OJKD0",
    authDomain: "crowdevelop-40f3c.firebaseapp.com",
    databaseURL: "https://crowdevelop-40f3c.firebaseio.com",
    storageBucket: "crowdevelop-40f3c.appspot.com",
};

firebase.initializeApp(config);

angular.module('crowDevelop', ['firebase', 'ngRoute', 'ngAnimate', 'credit-cards'])

// .constant('domain', 'http://urekon-api.herokuapp.com')
.constant('domain', 'http://localhost:3000')

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
        .when('/tos', {
            templateUrl: 'views/shared/tos.html',
            controller: 'TosCtrl'
        })
        .when('/projects/create', {
            templateUrl: 'views/projects/create.html',
            controller: 'ProjectsCreateCtrl'
        })
        .when('/projects/favourites', {
            templateUrl: 'views/projects/favourites.html',
            controller: 'ProjectsFavouritesCtrl'
        })
        .when('/projects/index', {
            templateUrl: 'views/projects/index.html',
            controller: 'ProjectsIndexCtrl'
        })
        .when('/projects/category/:category', {
            templateUrl: 'views/projects/index.html',
            controller: 'ProjectsCategoryCtrl'
        })
        .when('/projects/index/:pid', {
            templateUrl: 'views/projects/details.html',
            controller: 'ProjectsDetailsCtrl'
        })
        .otherwise({
            templateUrl: 'views/shared/404.html'
        });
    $locationProvider.html5Mode(true);
}])

.filter('trusted', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + url);
    };
}])

.filter('formatText', function($sce) {
    return function(description) {
        if (!description) return description;
        var text = description.replace(/\n/g, '<br />');
        return $sce.trustAsHtml(text);
    }
})

.run(['$rootScope', function($rootScope) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/scripts/serviceWorker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}])

.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
    $rootScope.categories = ["Development", "Game", "Education", "Social", "Art", "Sports", "Health", "News"];
    $rootScope.authService = new AuthService({
        provider: 'google'
    });
    $rootScope.goTo = function(path) {
        $location.path(path);
    }
}]);
