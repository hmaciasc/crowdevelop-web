(function(){

    var config = {
        apiKey: "AIzaSyDP4kTth7VjRSaNosacjj3PKGKM76OJKD0",
        authDomain: "crowdevelop-40f3c.firebaseapp.com",
        databaseURL: "https://crowdevelop-40f3c.firebaseio.com",
        storageBucket: "crowdevelop-40f3c.appspot.com",
    };
    firebase.initializeApp(config);

    angular.module('crowDevelop', ['app.routes', 'authService', 'mainCtrl', 'firebase'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]);


}());