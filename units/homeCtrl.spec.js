describe('Home controller suite', function() {

    window.MockFirebase.override();

    beforeEach(module('crowDevelop', 'firebase', function($provide) {
        $provide.value('')
    }));

    var $rootScope, $controller, $firebaseArray, $firebaseObject, $location;
    var firebaseRef;

    beforeEach(function() {
        module('firebase.database');

        inject(function(_$rootScope_, _$controller_, _$firebaseArray_, _$location_, _$firebaseObject_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $firebaseArray = _$firebaseArray_;
            $firebaseObject = _$firebaseObject_;
            $location = _$location_;
        });
    });

    describe('$scope.findProject function tests', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('HomeCtrl', {
                $scope: $scope
            });
        });

        it('gets a list of projects from search form', function() {
            var projectsRef = firebase.database().ref('projects/');
            var ref = projectsRef.child('-KQMm6HtJZ64VwmTFMj1');
            var obj = $firebaseObject(ref);
            console.log(obj);
            var query = projectsRef.orderByChild('name').equalTo('Test1');
            projectsRef.on('value', function(snapshot) {
                console.log(snapshot.val());
            });
            // var list = $firebaseArray(query);
            // console.log(list);
            expect(list[0]).toBe('Test1');
        });
    });

    // describe('$scope.init', function() {
    //     var $scope, controller;
    //
    //     beforeEach(function() {
    //         $scope = {};
    //         controller = $controller('HomeCtrl', {
    //             $scope: $scope,
    //             $firebaseArray: $firebaseArray
    //         });
    //     });
    //
    //     it('gets a list of projects from db', function() {
    //         $scope.init();
    //         console.log($scope.projects);
    //         expect($scope.projects.length).not.toBe(0);
    //     });
    // });

});
