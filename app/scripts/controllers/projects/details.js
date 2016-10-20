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
        $scope.comments = obj;
    };

    $scope.getOwner = function(uid) {
        var userRef = firebase.database().ref('users/' + uid);
        var obj = $firebaseObject(userRef);
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

    $scope.addFeature = function() {
        var root = firebase.database().ref().child('features/' + $scope.project.pid);
        var featureRef = root.push().key;
        var feature = {
            description: $scope.newFeature,
            points: 1
        };
        firebase.database().ref('features/' + $scope.project.pid + '/' + featureRef).set(feature)
            .catch(function(e) {
                $scope.error = e;
            });
    }

    $scope.voteFeature = function(fid, status) {
        var voteRef = firebase.database().ref('featureVotes/' + pid + '/' + $rootScope.firebaseUser.uid);
        var state = $firebaseArray(voteRef.child(fid));
        state.$loaded().then(function() {
            for (let i = 0; i < $scope.features.length; i++) {
                if ($scope.features[i].$id == fid) {
                    $scope.features[i].status = status;
                }
            }
            voteRef.child(fid).set(status);
        });
    }

    $scope.getFeatures = function(pid) {
        var featuresRef = firebase.database().ref('features/' + pid);
        var obj = $firebaseArray(featuresRef);
        $scope.features = obj;
    }

    function getUserFeatureVotes(pid) {
        var userFeaturesRef = firebase.database().ref('featureVotes/' + pid + '/' + $rootScope.firebaseUser.uid);
        var votes = $firebaseArray(userFeaturesRef);
        votes.$loaded().then(function() {
            for (var i = 0; i < $scope.features.length; i++) {
                for (var j = 0; j < votes.length; j++) {
                    if ($scope.features[i].$id == votes[j].$id) {
                        $scope.features[i].status = votes[j].$value;
                    }
                }
            }
        });
    }

    $scope.saveComment = function() {
        var commentRef = firebase.database().ref('comments/' + $scope.project.pid);
        var comment = {
            writer: $rootScope.firebaseUser.displayName,
            text: $scope.comments.newComment,
            photo: $rootScope.firebaseUser.photoURL
        };
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

    $scope.changeProjectStatus = function(status) {
        var projectRef = firebase.database().ref('projects/' + $scope.project.pid);
        var obj = $firebaseObject(projectRef);
        obj.$loaded(
            function(data) {
                data.status = status;
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
    $scope.getFeatures(pid);
    if ($rootScope.firebaseUser) {
        $scope.getFavourite(pid);
        getUserFeatureVotes(pid);
    }
}]);
