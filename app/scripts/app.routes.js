angular.module('app.routes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'mainController',
                controllerAs: 'main'
            });
        $locationProvider.html5Mode(true);
    });