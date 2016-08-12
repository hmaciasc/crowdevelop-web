angular.module('mainCtrl', [])
    .controller('mainController', function($scope, $firebaseObject) {
        var ref = firebase.database().ref().child("angular");
        // download the data into a local object
        var syncObject = $firebaseObject(ref);
        // synchronize the object with a three-way data binding
        // click on `index.html` above to see it used in the DOM!
        syncObject.$bindTo($scope, "data");
});