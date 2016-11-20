'use strict';

// var config = {
//     apiKey: "AIzaSyDP4kTth7VjRSaNosacjj3PKGKM76OJKD0",
//     authDomain: "crowdevelop-40f3c.firebaseapp.com",
//     databaseURL: "https://crowdevelop-40f3c.firebaseio.com",
//     storageBucket: "crowdevelop-40f3c.appspot.com",
// };
var config = {
    apiKey: "AIzaSyDP4kTth7VjRSaNosacjj3PKGKM76OJKD0",
    authDomain: "crowdevelop-40f3c.firebaseapp.com",
    databaseURL: "https://crowdevelop-40f3c.firebaseio.com",
    storageBucket: "crowdevelop-40f3c.appspot.com",
    messagingSenderId: "598401583655"
};

firebase.initializeApp(config);

angular.module('crowDevelop', ['firebase', 'ngRoute', 'ngStorage', 'ngAnimate'])

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
            templateUrl: 'views/shared/tos.html'
        })
        .when('/myProjects', {
            templateUrl: 'views/projects/index.html',
            controller: 'MyProjectsCtrl'
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
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + url);
    };
}])

.filter('formatText', function($sce) {
    return function(description) {
        if (!description) return description;
        var text = description.replace(/\n/g, '<br />');
        return $sce.trustAsHtml(text);
    }
})

.filter('capitalize', function() {
    return function(input, scope) {
        if (input != null)
            input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
})

.run(['$rootScope', function($rootScope) {
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('../sw.js').then(function(registration) {
    //         // Registration was successful
    //         console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }).catch(function(err) {
    //         // registration failed :(
    //         console.log('ServiceWorker registration failed: ', err);
    //     });
    // }
    var messaging = firebase.messaging();
    messaging.requestPermission()
        .then(function() {
            console.log('Hurray');
            return messaging.getToken();
        })
        .then(function(token) {
            console.log(token);
        })
        .catch(function(err) {
            console.log('Notifications cancelled by user');
        })

    messaging.onMessage(function(payload) {
        $rootScope.notifications.push(payload.notification);
        $rootScope.$apply();
        // $rootScope.addNotification(payload);
    });
}])

.run(['$rootScope', '$location', '$localStorage', 'AuthService', function($rootScope, $location, $localStorage, AuthService) {
    $rootScope.notifications = [];
    $rootScope.firebaseUser = $localStorage.firebaseUser;
    $rootScope.categories = ["Development", "Game", "Education", "Social", "Art", "Sports", "Health", "News"];
    $rootScope.authService = new AuthService({
        provider: 'google'
    });
    $rootScope.addNotification = function(payload) {
        if ($rootScope.notifications) {
            $rootScope.notifications.push(payload.notification);
        } else {
            $rootScope.notifications = [];
            $rootScope.notifications.push(payload.notification)
        }
        console.log($rootScope.notifications);
    };
    $rootScope.goTo = function(path) {
        $location.path(path);
    };
}]);
