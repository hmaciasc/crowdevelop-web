'use strict';

angular.module('crowDevelop')

.controller('ProjectsDetailsCtrl', ['$rootScope', '$scope', '$firebaseObject', '$firebaseArray', '$routeParams', function($rootScope, $scope, $firebaseObject, $firebaseArray, $routeParams) {

    var pid = $routeParams.pid;
    $scope.success = false;

    $scope.getProject = function(pid) {
        var projectRef = firebase.database().ref('projects/' + pid);
        var obj = $firebaseObject(projectRef);
        $scope.project = obj;
    };

    $scope.getComments = function(pid) {
        var commentsRef = firebase.database().ref('comments/' + pid);
        var obj = $firebaseObject(commentsRef);
        console.log(obj);
        $scope.comments = obj;
    };

    $scope.getOwner = function(uid) {
        var userRef = firebase.database().ref('users/' + uid);
        var obj = $firebaseObject(userRef);
        console.log(obj);
        userRef.on('value', function(snapshot) {
            $scope.owner = snapshot.val();
        });
    }

    $scope.favourite = function(pid) {
        var favRef = firebase.database().ref('favourites/' + $rootScope.firebaseUser.uid);
        var state = $firebaseObject(favRef.child(pid));
        state.$loaded().then(function() {
            favRef.child(pid).set(!state.$value);
            $scope.favourited = !state.$value;
        });
    }

    $scope.getFavourite = function(pid) {
        var favRef = firebase.database().ref('favourites/' + $rootScope.firebaseUser.uid);
        var state = $firebaseObject(favRef.child(pid));
        state.$loaded().then(function() {
            $scope.favourited = state.$value;
        });
    }

    $scope.saveComment = function() {
        var commentRef = firebase.database().ref('comments/' + $scope.project.pid);
        var comment = {
            writer: $rootScope.firebaseUser.displayName,
            text: $scope.comments.newComment,
            photo: $rootScope.firebaseUser.photoURL
        };
        console.log($scope.comments.newComment);
        console.log(comment);
        var obj = $firebaseArray(commentRef).$add(comment);
    }

    $scope.donate = function() {

        var donationsRef = firebase.database().ref('donations/' + $scope.project.pid);
        var donation = {
            payer: $rootScope.firebaseUser.displayName,
            amount: $scope.amount
        };
        $firebaseArray(donationsRef).$add(donation);

        updateProject();
    }

    function updateProject() {
        $('.loaderDiv').toggleClass('loader');
        var projectRef = firebase.database().ref('projects/' + pid);
        var obj = $firebaseObject(projectRef);
        obj.$loaded(
            function(data) {
                data.donated = parseInt(data.donated, 10) + parseInt($scope.amount, 10);
                data.$save().then(function(projectRef) {
                    projectRef.key === obj.$id;
                }, function(error) {
                    console.log("Error:", error);
                });
            },
            function(error) {
                console.error("Error:", error);
            }
        );
        setTimeout(endSpinner, 3000);
    }

    function endSpinner() {
        $('.loaderDiv').toggleClass('loader');
        $('.successDiv').toggleClass('invisible success');
    }

    $.fn.toggleInputError = function(erred) {
        this.parent('.form-group').toggleClass('has-danger', erred);
        this.toggleClass('form-control-danger', erred);
        return this;
    };
    $.fn.toggleInputSuccess = function(erred) {
        this.parent('.form-group').toggleClass('has-success', erred);
        this.toggleClass('form-control-success', erred);
        return this;
    };


    function creditCardValidation() {
        $('[data-numeric]').payment('restrictNumeric');
        $('.cc-number').payment('formatCardNumber');
        $('.cc-number').on('input', function(e) {
            e.preventDefault();
            var cardType = $.payment.cardType($('.cc-number').val());
            $('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
            $('.cc-number').toggleInputSuccess($.payment.validateCardNumber($('.cc-number').val()));
            $('.cc-brand').text(cardType);
        });
    }

    function expiryValidation() {
        $('[data-numeric]').payment('restrictNumeric');
        $('.cc-exp').payment('formatCardExpiry');

        $('.cc-exp').on('input', function(e) {
            e.preventDefault();
            var cardType = $.payment.cardType($('.cc-number').val());
            $('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
            $('.cc-exp').toggleInputSuccess($.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
        });
    }

    function cvcValidation() {
        $('[data-numeric]').payment('restrictNumeric');
        $('.cc-cvc').payment('formatCardCVC');
        $('.cc-cvc').on('input', function(e) {
            e.preventDefault();
            var cardType = $.payment.cardType($('.cc-number').val());
            $('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
            $('.cc-cvc').toggleInputSuccess($.payment.validateCardCVC($('.cc-cvc').val(), cardType));
        });
    }

    creditCardValidation();
    expiryValidation();
    cvcValidation();
    $scope.getProject(pid);
    $scope.getComments(pid);
    if ($rootScope.firebaseUser) {
        $scope.getFavourite(pid);
    }
}]);
