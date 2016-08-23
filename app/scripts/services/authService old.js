angular.module("authService", ['firebase'])
    .factory("Auth", function($http, $firebaseAuth) {
        var authFactory = {};
        var auth = $firebaseAuth();
        //initApp();

        authFactory.login = function () {
            if (!firebase.auth().currentUser) {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    document.getElementById('quickstart-oauthtoken').textContent = token;
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('You have already signed up with a different auth provider for that email.');
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.
                    } else {
                        console.error(error);
                    }
                });
                // [END signin]
            } else {
                firebase.auth().signOut();
            }
        }
        
        function toggleSignIn(auth) {
            if (!firebase.auth().currentUser) {
                
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    document.getElementById('quickstart-oauthtoken').textContent = token;
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('You have already signed up with a different auth provider for that email.');
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.
                    } else {
                        console.error(error);
                    }
                });
                // [END signin]
            } else {
                firebase.auth().signOut();
            }
            document.getElementById('quickstart-sign-in').disabled = true;
        }

        authFactory.isLoggedIn = function () {
            console.log("holi");
            if (firebase.auth()) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * initApp handles setting up the Firebase context and registering
         * callbacks for the auth status.
         *
         * The core initialization is in firebase.App - this is the glue class
         * which stores configuration. We provide an app name here to allow
         * distinguishing multiple app instances.
         *
         * This method also registers a listener with firebase.auth().onAuthStateChanged.
         * This listener is called when the user is signed in or out, and that
         * is where we update the UI.
         *
         * When signed in, we also authenticate to the Firebase Realtime Database.
         */
        function initApp() {
            // Listening for auth state changes.
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var refreshToken = user.refreshToken;
                    var providerData = user.providerData;
                    document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                    document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                    document.getElementById('quickstart-account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        photoURL: photoURL,
                        isAnonymous: isAnonymous,
                        uid: uid,
                        refreshToken: refreshToken,
                        providerData: providerData
                    }, null, '  ');
                } else {
                    // User is signed out.
                    document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                    document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                    document.getElementById('quickstart-account-details').textContent = 'null';
                    document.getElementById('quickstart-oauthtoken').textContent = 'null';
                }
                document.getElementById('quickstart-sign-in').disabled = false;
            });

            document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false); 
        }
        return authFactory;
    });
/*
window.onload = function() {
    initApp();
};
*/