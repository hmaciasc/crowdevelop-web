describe('Home controller suite', function() {

    beforeEach(module('crowDevelop'));

    var $rootScope, $controller, $firebaseArray, $location;

    beforeEach(inject(function(_$rootScope_, _$controller_, _$firebaseArray_, _$location_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $firebaseArray = _$firebaseArray_;
        $location = _$location_;
    }));

    describe('$scope.findProject function tests', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('HomeCtrl', {
                $scope: $scope
            });
        });

        it('gets a list of projects from search form', function() {
            // $scope.query = 'Test1';
            // $scope.findProject();
            // var searchResults = $rootScope.projectSearch;
            expect($scope.msg).toBeDefined();
            // expect(searchResults.length).toBe(1);
        });
    });

    describe('$scope.init', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('HomeCtrl', {
                $scope: $scope,
                $firebaseArray: $firebaseArray
            });
        });

        it('gets a list of projects from db', function() {
            $scope.init();
            console.log($scope.projects);
            expect($scope.projects.length).not.toBe(0);
        });
    });

});
