/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [
    ["/bower_components/angular-animate/angular-animate.js", "622db889dbf7347ae160be1560cc2dcf"],
    ["/bower_components/angular-animate/angular-animate.min.js", "be3e9252465c508fa88c2f2ba9108348"],
    ["/bower_components/angular-animate/index.js", "eca59ea32960ae595dd18ad9480185b1"],
    ["/bower_components/angular-mocks/angular-mocks.js", "bc501cca67446a1c077f784c98b003d0"],
    ["/bower_components/angular-mocks/ngAnimateMock.js", "ed7195f7cbba99b06f95a715d6027375"],
    ["/bower_components/angular-mocks/ngMock.js", "38d4e7768ae37daa27dd22d750d062fd"],
    ["/bower_components/angular-mocks/ngMockE2E.js", "afaf184834005c99ba7f80720439dba2"],
    ["/bower_components/angular-route/angular-route.js", "2bcf33d7b863367d4b7bb55f5b8f09ca"],
    ["/bower_components/angular-route/angular-route.min.js", "943c8bd5b40115471ded31bd66acf53e"],
    ["/bower_components/angular-route/index.js", "a3320f99fcd749cc422bb5add3888b34"],
    ["/bower_components/angular-ui-router/release/angular-ui-router.js", "a1279756d8925e905aec1bf3924c7e72"],
    ["/bower_components/angular-ui-router/release/angular-ui-router.min.js", "d2b6d0ce05898c582d48f5fc7562db83"],
    ["/bower_components/angular-ui-router/src/common.js", "464d431ef1a562e0568f28e12c4216bc"],
    ["/bower_components/angular-ui-router/src/resolve.js", "50bdaf08938a9eacc0abb5dc983989b3"],
    ["/bower_components/angular-ui-router/src/state.js", "069d14ec00ebb9785e865f702d59e883"],
    ["/bower_components/angular-ui-router/src/stateDirectives.js", "e4b63f56514252b1e23befa941bdb2e5"],
    ["/bower_components/angular-ui-router/src/stateFilters.js", "18b68f94ab548a82d5de148a4f2bb6d3"],
    ["/bower_components/angular-ui-router/src/templateFactory.js", "ae0763a83d877c17e33b577514d4ff51"],
    ["/bower_components/angular-ui-router/src/urlMatcherFactory.js", "dacf7aee3daf4264aba1f28619d9336b"],
    ["/bower_components/angular-ui-router/src/urlRouter.js", "9505c410ff39376cb28a79b5da390921"],
    ["/bower_components/angular-ui-router/src/view.js", "651abd1e858d67b2c066130966f047ec"],
    ["/bower_components/angular-ui-router/src/viewDirective.js", "7718706549ebbb0fb228893bcb7ab8b2"],
    ["/bower_components/angular-ui-router/src/viewScroll.js", "e45db2f223481f236dc05e1192eab2e0"],
    ["/bower_components/angular/angular-csp.css", "5d7bf1728c2447221cad6c6263557306"],
    ["/bower_components/angular/angular.js", "fea945437030dbaf178cc608f8cf24ff"],
    ["/bower_components/angular/angular.min.js", "c8ddded85c81cfcd8dd4e54b71724d85"],
    ["/bower_components/angular/index.js", "0d848853205d22ab8be985876aec948a"],
    ["/bower_components/angularfire/dist/angularfire.js", "1f9a0051a93b1e6222e7a321ea2b225d"],
    ["/bower_components/angularfire/dist/angularfire.min.js", "9f9a4e5492db9cfa0a1b2f7f360e32fd"],
    ["/bower_components/bootstrap/Gruntfile.js", "d10c395cd25d58954dcb53c27f8773a4"],
    ["/bower_components/bootstrap/dist/css/bootstrap.css", "5582a5c2e4ddb3a5a1ce367c7d7cbc49"],
    ["/bower_components/bootstrap/dist/css/bootstrap.min.css", "9c4cb4ff957dc75b4ad8ea73124a9025"],
    ["/bower_components/bootstrap/dist/js/bootstrap.js", "8f446247ac606dafa85939dc0da2aef2"],
    ["/bower_components/bootstrap/dist/js/bootstrap.min.js", "5e5c79d6d6acc502d8e0d2b4f9e0eed5"],
    ["/bower_components/bootstrap/grunt/bs-sass-compile/libsass.js", "930af091b839b21b53746c3caa7da296"],
    ["/bower_components/bootstrap/grunt/bs-sass-compile/sass.js", "9c351f25287c98c533cdce3dae8b8109"],
    ["/bower_components/bootstrap/grunt/change-version.js", "ff3af84a6e20c71b6b1357712daf1bf0"],
    ["/bower_components/bootstrap/grunt/postcss.js", "88b74c86a6ef4e8014b74249308d9719"],
    ["/bower_components/bootstrap/js/dist/alert.js", "62d7ddd6025432f2d9a8f1196effb931"],
    ["/bower_components/bootstrap/js/dist/button.js", "8b5463a21a7ab6c7fbaf8c3e798ed426"],
    ["/bower_components/bootstrap/js/dist/carousel.js", "9be1a5913fa5fc907022214f7b32ae61"],
    ["/bower_components/bootstrap/js/dist/collapse.js", "d323e13650d995bfa5c04838ba19c228"],
    ["/bower_components/bootstrap/js/dist/dropdown.js", "49c636137551ccb39b3f17f885a03e13"],
    ["/bower_components/bootstrap/js/dist/modal.js", "a7c6110319f1a537e31b6641ade2d355"],
    ["/bower_components/bootstrap/js/dist/popover.js", "19dd2932149415f492f3d57f6b3134d6"],
    ["/bower_components/bootstrap/js/dist/scrollspy.js", "be022db2b7c29fce385ce41c5f26a8cd"],
    ["/bower_components/bootstrap/js/dist/tab.js", "f1fb29df91b33075cd0ebf3e50bccc3c"],
    ["/bower_components/bootstrap/js/dist/tooltip.js", "e853dd965edd8e5fc51ecc7ab1ba023f"],
    ["/bower_components/bootstrap/js/dist/util.js", "363997f335c36f9f6c9e52fa38031b9d"],
    ["/bower_components/bootstrap/js/src/alert.js", "6287842e15caaa6c04ee2deba0263c07"],
    ["/bower_components/bootstrap/js/src/button.js", "41858d0f5a68f1c4ec4c9b81b59eee46"],
    ["/bower_components/bootstrap/js/src/carousel.js", "be3859ea276562119470b5faa01f0b52"],
    ["/bower_components/bootstrap/js/src/collapse.js", "571bf8fd391b2e9215c689378a7a4901"],
    ["/bower_components/bootstrap/js/src/dropdown.js", "0c56de63d810fca093231f9f076e542e"],
    ["/bower_components/bootstrap/js/src/modal.js", "978f07f7f4f234fe45c22e3d7212420a"],
    ["/bower_components/bootstrap/js/src/popover.js", "eefa64bfe3f9810524d52982216b7d8f"],
    ["/bower_components/bootstrap/js/src/scrollspy.js", "c53a74fce0c1707bae9710d58ea6deb1"],
    ["/bower_components/bootstrap/js/src/tab.js", "edf30e8086c3c3e7a29c4b3866726d33"],
    ["/bower_components/bootstrap/js/src/tooltip.js", "e20fcce07efc210dafe66d2b4c686934"],
    ["/bower_components/bootstrap/js/src/util.js", "b3b31628ff7c200c8b98176d12d430e5"],
    ["/bower_components/bootstrap/package.js", "552dd7c992f2e4cab61827b69d91af8c"],
    ["/bower_components/bower/Docs/En/Declare/transition-graph.png", "980440c36cf172f787a3bec7c72317a2"],
    ["/bower_components/bower/Source/Accessors.js", "ce5a719082c1516b792e70f0b717b0a0"],
    ["/bower_components/bower/Source/Ajax.Dom.js", "a8fdd83ec73e4d7bbb27286ad47170be"],
    ["/bower_components/bower/Source/Ajax.js", "7adaeb2eb0dd5faed2952fc7855240c0"],
    ["/bower_components/bower/Source/Class/BindAll.js", "878bfef602a089e9667ee896c0268ee6"],
    ["/bower_components/bower/Source/Class/Class.js", "f7d7f1071a755f5bd01816894c62c7f3"],
    ["/bower_components/bower/Source/Class/Events.js", "a875f803feaf3249d83b2876cd4d50da"],
    ["/bower_components/bower/Source/Class/Generators.js", "f924dc0e3ad407a919d88ae63e4d7563"],
    ["/bower_components/bower/Source/Class/Options.js", "87ffe2c49ff9786f458df30e9eef25b8"],
    ["/bower_components/bower/Source/Cookie.js", "c7886c6b5e1112d9e2576a05d8322adc"],
    ["/bower_components/bower/Source/Core.js", "951ccae05c48ad448ada05a1dbb51502"],
    ["/bower_components/bower/Source/CoreExtended.js", "36af6e5a35e2cd9c0e5e9e70a248887d"],
    ["/bower_components/bower/Source/Declare/Animatable.js", "c1e8913dc6a83a669a1831b06e26f07a"],
    ["/bower_components/bower/Source/Declare/ClassCompat.js", "a378c1dcd33bf41d07285b11d4a1ee5a"],
    ["/bower_components/bower/Source/Declare/Color.js", "4f42fd18af3355c0c668c1af7a2fba4c"],
    ["/bower_components/bower/Source/Declare/Declare.js", "b50f3d509a73a46366b9eafdf23a924a"],
    ["/bower_components/bower/Source/Declare/Events.js", "b5d752300c6d8d84c6225764947aef92"],
    ["/bower_components/bower/Source/Declare/ImagePreloader.js", "b094ec22cccb40bc0e38b932ebaa60d4"],
    ["/bower_components/bower/Source/Declare/Keyboard.js", "6e99922f9842c5a4ac59bb271fc5b330"],
    ["/bower_components/bower/Source/Declare/Registry.js", "a6751abd4a788150ca109dfe073b5f34"],
    ["/bower_components/bower/Source/Declare/Settings.js", "608707eca464a497067d0d192b7fe403"],
    ["/bower_components/bower/Source/Declare/Trace.js", "af483bab2e62a1ed8d830e0e5966e7f1"],
    ["/bower_components/bower/Source/Declare/Transition.js", "06978abc5d6c6a5c5ccae0e3e461ad2e"],
    ["/bower_components/bower/Source/Dom.js", "0a72a85c7b5ff929518c000198eb939c"],
    ["/bower_components/bower/Source/Frame.js", "e4f484e023375fe145fd6343e908c8a0"],
    ["/bower_components/bower/Source/Js185.js", "d9fbc73794477359cdc1400837b79b5e"],
    ["/bower_components/bower/Source/PointerLock.js", "b975b8951fb3892e76c82a9c9f91c8fc"],
    ["/bower_components/bower/Source/Prototypes/Abstract.js", "ff8b51b48fa922796d8c10614fcfae25"],
    ["/bower_components/bower/Source/Prototypes/Array.js", "666f78a6e6738af683b72e51363a3040"],
    ["/bower_components/bower/Source/Prototypes/Function.js", "3bb2e47b090cbdd8f832e476b761777e"],
    ["/bower_components/bower/Source/Prototypes/Number.js", "fe4624d8d6aaf82c4aede53dc840d431"],
    ["/bower_components/bower/Source/Prototypes/Object.js", "0bad4923f41474be637b06f2f7e05c9e"],
    ["/bower_components/bower/Source/Prototypes/String.js", "368ad2182f055a69df684dc9515d50c2"],
    ["/bower_components/bower/Source/Types/Array.js", "cfcf5716fefc714d40ffd6c0b48d685e"],
    ["/bower_components/bower/Source/Types/Function.js", "41d2a773b5c49cd1726f65667314b22c"],
    ["/bower_components/bower/Source/Types/Math.js", "b9ddd7104861b31ebafd55d739ce0cb8"],
    ["/bower_components/bower/Source/Types/Number.js", "b64a4e3fdc65cc5a34a0bf7281fbb1da"],
    ["/bower_components/bower/Source/Types/Object.js", "a7098f1cd3e07771c9da1ee00c72d00f"],
    ["/bower_components/bower/Source/Types/String.js", "d30930b87310691e766f3e6c670a503d"],
    ["/bower_components/bower/Source/Uri.js", "61c348681e87101a1f6aca55dfd612e6"],
    ["/bower_components/bower/Source/atom.css", "911ef0c80b30abb6d649bf6954eac297"],
    ["/bower_components/bower/Source/overall.js", "b9857fbd61066fbb9a49856b99349ed0"],
    ["/bower_components/bower/Tests/cells.png", "f1062a7683108a35a7be0afb4668deb6"],
    ["/bower_components/bower/Tests/index.html", "a1298f68ab36c5e12fabfad549e06340"],
    ["/bower_components/bower/Tests/lib/jquery.js", "276acf5f04c4c60aaf73e66177dc43f7"],
    ["/bower_components/bower/Tests/lib/qunit.css", "f367a1e4ef502aeda63045af845d3456"],
    ["/bower_components/bower/Tests/lib/qunit.js", "f1d1e2f68d95c7e42b2cdd1ecfa95e34"],
    ["/bower_components/bower/Tests/tests/class.js", "8ba67199eead49d29d3757743e87dad6"],
    ["/bower_components/bower/Tests/tests/color.js", "fc5a4268c232bddb4ba91f98707f4077"],
    ["/bower_components/bower/Tests/tests/core.js", "fe736d993a534184cd5e3d769d1ee57b"],
    ["/bower_components/bower/Tests/tests/declare.js", "c3a7ffadf8e1f9d81d3b3816c2b93e65"],
    ["/bower_components/bower/Tests/tests/dom.js", "7bf8ea71b6704b5946a746d8176a5c98"],
    ["/bower_components/bower/Tests/tests/mootools.js", "9fdc84a9814e9956e2c3ebdbd8c3a603"],
    ["/bower_components/bower/Tests/tests/prototypes.js", "6eff1906631ff4430569b5864a76e721"],
    ["/bower_components/bower/Tests/tests/uri.js", "179d16409126242001191b74b8a32aba"],
    ["/bower_components/bower/Tests/visual-tests.html", "31624d9f1345269225a4d0ec63a1aadc"],
    ["/bower_components/bower/atom-full-compiled.js", "3d6e81910d14c1d48c92a90ffbb20ab3"],
    ["/bower_components/firebase/firebase-app-externs.js", "fe922d8ccb7354de6239700e1f848a2a"],
    ["/bower_components/firebase/firebase-app.js", "1b5450a5910e8fdb50c2a4cca692261a"],
    ["/bower_components/firebase/firebase-auth-externs.js", "125cc110f7066c57820b8173c7670e07"],
    ["/bower_components/firebase/firebase-auth.js", "aa1898d31bd387c92b7ac221630bcc7d"],
    ["/bower_components/firebase/firebase-database-externs.js", "e615ca0142dcc2f363df31bddcee996b"],
    ["/bower_components/firebase/firebase-database.js", "81ad82c48997a81cdced18049595a9db"],
    ["/bower_components/firebase/firebase-messaging-externs.js", "1963cff7d22c54b5f78b93f4e7058081"],
    ["/bower_components/firebase/firebase-messaging.js", "0c6fae49a7f5a87630f6c47cc8003d8a"],
    ["/bower_components/firebase/firebase-storage-externs.js", "87948f9d9359a8d5a5d5b04e4c350b0a"],
    ["/bower_components/firebase/firebase-storage.js", "375fb91a89ae5948db4ea3ca722bca2e"],
    ["/bower_components/firebase/firebase.js", "24cf2da1908fe34cd1d842f3dfa50411"],
    ["/bower_components/install/detect-zoom.js", "55625b06f0343495fca3a9af61dcd3fb"],
    ["/bower_components/install/detect-zoom.min.js", "291452b830524909d0c60c68be5d56ab"],
    ["/bower_components/jquery.payment/lib/jquery.payment.js", "dbcc7d0f1c04a938618b2c76cf574995"],
    ["/bower_components/jquery/dist/core.js", "e947c0fa5428a8723e0fbd3eb04d984e"],
    ["/bower_components/jquery/dist/jquery.js", "46836bbc603c9565b5cc061100ccbac8"],
    ["/bower_components/jquery/dist/jquery.min.js", "e071abda8fe61194711cfc2ab99fe104"],
    ["/bower_components/jquery/dist/jquery.slim.js", "ce540e4747aeee3613024f0fd720e2a9"],
    ["/bower_components/jquery/dist/jquery.slim.min.js", "550ddfe84a114f79a767c087df97f3bc"],
    ["/bower_components/jquery/external/sizzle/dist/sizzle.js", "88f56d86d94c7e2f4589a9312c360c55"],
    ["/bower_components/jquery/external/sizzle/dist/sizzle.min.js", "a7da9ea7bd03729fae7b8a8c7a596ed1"],
    ["/bower_components/jquery/src/ajax.js", "9841f8f3cb2bca0cbc658dc9cef66edb"],
    ["/bower_components/jquery/src/ajax/jsonp.js", "54065d23a00581d31b4a33a24d4c1884"],
    ["/bower_components/jquery/src/ajax/load.js", "21d96252f08f9b355b349af39ce7236d"],
    ["/bower_components/jquery/src/ajax/parseXML.js", "1dc77355e5b4154006c86ed894e5095d"],
    ["/bower_components/jquery/src/ajax/script.js", "9878bca97ea247869613a955084e79c5"],
    ["/bower_components/jquery/src/ajax/var/location.js", "1effe93501b51c83d7825474e73a8aae"],
    ["/bower_components/jquery/src/ajax/var/nonce.js", "bd8ccf8ec6f7fb2ca1c87fa19b147d12"],
    ["/bower_components/jquery/src/ajax/var/rquery.js", "0cea5be4c1cb48604c76fe1e49501d9a"],
    ["/bower_components/jquery/src/ajax/xhr.js", "938cbba14002684850d1a5670f91e3c2"],
    ["/bower_components/jquery/src/attributes.js", "e3b938fc47b1ddf14846fc5cbede18a1"],
    ["/bower_components/jquery/src/attributes/attr.js", "41f70d52f33c2f7f29cc2990de650707"],
    ["/bower_components/jquery/src/attributes/classes.js", "4820005f22ce0cfa01918c4f80953fcf"],
    ["/bower_components/jquery/src/attributes/prop.js", "a3b5116692ba1c0c61d9daec297fa5e9"],
    ["/bower_components/jquery/src/attributes/support.js", "87c02d854903b60b55c82f12e5cbb951"],
    ["/bower_components/jquery/src/attributes/val.js", "1be20bf558e2e81d9fa6ac6245bfd201"],
    ["/bower_components/jquery/src/callbacks.js", "e1defa238b7e0f97d9ea89179a3f7102"],
    ["/bower_components/jquery/src/core.js", "e947c0fa5428a8723e0fbd3eb04d984e"],
    ["/bower_components/jquery/src/core/DOMEval.js", "89491487801516d0c1f73720288ef2c2"],
    ["/bower_components/jquery/src/core/access.js", "45967f27177636396bac684cd1229946"],
    ["/bower_components/jquery/src/core/init.js", "547c2871bd1e44ffc56cd8488193ae41"],
    ["/bower_components/jquery/src/core/parseHTML.js", "984984492643b1081f812b27558d4fd7"],
    ["/bower_components/jquery/src/core/ready-no-deferred.js", "65073614525d11a3abc9d14bcf6bfd23"],
    ["/bower_components/jquery/src/core/ready.js", "998548d0b1605da460aa3712b367d60d"],
    ["/bower_components/jquery/src/core/readyException.js", "a4eaadadf4d1420be6f30e03ba32c0b2"],
    ["/bower_components/jquery/src/core/stripAndCollapse.js", "fab52ba44e0e097a9d8f44c5a4c7fde6"],
    ["/bower_components/jquery/src/core/support.js", "a1fdd851ac2e51ceac1e388460c9ea9b"],
    ["/bower_components/jquery/src/core/var/rsingleTag.js", "d6ac5fb411468c45818898044af9ccc8"],
    ["/bower_components/jquery/src/css.js", "57bac89a37381f83297695155e899e3c"],
    ["/bower_components/jquery/src/css/addGetHookIf.js", "39e2ba4bf431074cde3dcef95d1ea269"],
    ["/bower_components/jquery/src/css/adjustCSS.js", "a5d386b2b941eed261637e63605026ff"],
    ["/bower_components/jquery/src/css/curCSS.js", "10ce79c4d2cf9fef9561c129b9d330a8"],
    ["/bower_components/jquery/src/css/hiddenVisibleSelectors.js", "46ad6606fc658bf81331ac866c8dff05"],
    ["/bower_components/jquery/src/css/showHide.js", "54cab17f823997ec76defd99a42fba25"],
    ["/bower_components/jquery/src/css/support.js", "a71ff6c5463e17ce7d3933f3dad0cadc"],
    ["/bower_components/jquery/src/css/var/cssExpand.js", "97946b11fa6b665f8107a0355ebd21a9"],
    ["/bower_components/jquery/src/css/var/getStyles.js", "6c085f1a5b10741fb4f47652d826e8b7"],
    ["/bower_components/jquery/src/css/var/isHiddenWithinTree.js", "3ab2e617a068a7281d1aa4bd5c00986b"],
    ["/bower_components/jquery/src/css/var/rmargin.js", "3e578e8aa9c5ce7ae7fd345f2768b91e"],
    ["/bower_components/jquery/src/css/var/rnumnonpx.js", "76441e4d11353acf6c624b9174c10d28"],
    ["/bower_components/jquery/src/css/var/swap.js", "caec1d33fb755d503bba6dde7135b888"],
    ["/bower_components/jquery/src/data.js", "9644b22ed614df5b6c5149695af89727"],
    ["/bower_components/jquery/src/data/Data.js", "f3b1ebd13c9cdbb0041fbf111b89a219"],
    ["/bower_components/jquery/src/data/var/acceptData.js", "784eb09770f6731c4fb5c57207955cfb"],
    ["/bower_components/jquery/src/data/var/dataPriv.js", "5793e35236c3a32cb1e4a6b4401211a3"],
    ["/bower_components/jquery/src/data/var/dataUser.js", "5793e35236c3a32cb1e4a6b4401211a3"],
    ["/bower_components/jquery/src/deferred.js", "6af8177fdb219ba9af13132fbfa393c9"],
    ["/bower_components/jquery/src/deferred/exceptionHook.js", "bdd1af0b6da071ae9fb638040e56493e"],
    ["/bower_components/jquery/src/deprecated.js", "511e2b3f55ecfd1cc77d6045955d8bae"],
    ["/bower_components/jquery/src/dimensions.js", "53e95f615dee5889f28329e344b47105"],
    ["/bower_components/jquery/src/effects.js", "422ed9e6045d806addf4ae616d256687"],
    ["/bower_components/jquery/src/effects/Tween.js", "1ededd3dbfc9d3ee6bb1ccd74a947c04"],
    ["/bower_components/jquery/src/effects/animatedSelector.js", "c6282b6a67db32fcf5e5ed312d8ae626"],
    ["/bower_components/jquery/src/event.js", "f84dcb79f50f4cd22659edb74260e629"],
    ["/bower_components/jquery/src/event/ajax.js", "ab2368042f88d56a4e8eb7ef0885d52d"],
    ["/bower_components/jquery/src/event/alias.js", "4d207f908b195d3cf91e31510e6b1165"],
    ["/bower_components/jquery/src/event/focusin.js", "a49297140eed77038234070114fc9e10"],
    ["/bower_components/jquery/src/event/support.js", "911a4c1a08cc3b6401cb2d046e148f6a"],
    ["/bower_components/jquery/src/event/trigger.js", "ab61fd013893279b68adf30e73ff6cff"],
    ["/bower_components/jquery/src/exports/amd.js", "0ce022aabd17f908da7d12221283b8ff"],
    ["/bower_components/jquery/src/exports/global.js", "17721874f4081fd75192ae8752ca1fe8"],
    ["/bower_components/jquery/src/jquery.js", "4d214954fbc2490c0b5a1757577e4cf7"],
    ["/bower_components/jquery/src/manipulation.js", "1f3d769713359ed2ab14e80ee984bf61"],
    ["/bower_components/jquery/src/manipulation/_evalUrl.js", "273280943dfd7c57f45e531df20aa797"],
    ["/bower_components/jquery/src/manipulation/buildFragment.js", "34a2d513f5ed7341c23d8d0d7a4444d4"],
    ["/bower_components/jquery/src/manipulation/getAll.js", "dd26ea739fa0a633620ad64b82f71da5"],
    ["/bower_components/jquery/src/manipulation/setGlobalEval.js", "45e10fe7bb054db32f6177ac8c190997"],
    ["/bower_components/jquery/src/manipulation/support.js", "7278ee59c62f54227229eab552dbe041"],
    ["/bower_components/jquery/src/manipulation/var/rcheckableType.js", "5f76cc651dda52520c04b10e96e56604"],
    ["/bower_components/jquery/src/manipulation/var/rscriptType.js", "2b1ecb3253a9115c7a0e14d7015d7e40"],
    ["/bower_components/jquery/src/manipulation/var/rtagName.js", "2fbe6bcebf3ef64351e4738514bee668"],
    ["/bower_components/jquery/src/manipulation/wrapMap.js", "bd6bd7cfc997ee4dbe32d0f46719b9a6"],
    ["/bower_components/jquery/src/offset.js", "08bd5d5a30c7df90d8f104daac8e0e87"],
    ["/bower_components/jquery/src/queue.js", "e7d425e97f2a193872b05755c22aac29"],
    ["/bower_components/jquery/src/queue/delay.js", "6b3b3baf444126f92d5fb08ad67e78ec"],
    ["/bower_components/jquery/src/selector-native.js", "09e3c6e382c9dc5e8b4ff8c0684dd0a8"],
    ["/bower_components/jquery/src/selector-sizzle.js", "e552c731b58c5253574ff6a4c72730df"],
    ["/bower_components/jquery/src/selector.js", "254a3ebd012ddf4c1268afb301fb0804"],
    ["/bower_components/jquery/src/serialize.js", "4c169a12be7d55051f4918e58f931ee8"],
    ["/bower_components/jquery/src/traversing.js", "4622abbea369ded55308e31be09e1c25"],
    ["/bower_components/jquery/src/traversing/findFilter.js", "dbfa25a469944debdc85213194aeaba1"],
    ["/bower_components/jquery/src/traversing/var/dir.js", "3e37162fe277c99009aef1bc3576cf66"],
    ["/bower_components/jquery/src/traversing/var/rneedsContext.js", "f8237f8e3c92d1846c801b8900e70285"],
    ["/bower_components/jquery/src/traversing/var/siblings.js", "872fe79c18c63237b878541e25f65792"],
    ["/bower_components/jquery/src/var/ObjectFunctionString.js", "c81564edaa40fb0aa2a6ff6eb363f2d6"],
    ["/bower_components/jquery/src/var/arr.js", "d88b9159a6350fa26ad2755c2c803842"],
    ["/bower_components/jquery/src/var/class2type.js", "8008cada8581f6317a43762b481af585"],
    ["/bower_components/jquery/src/var/concat.js", "7479d21ee167a8c9c5c0c6de20944e49"],
    ["/bower_components/jquery/src/var/document.js", "28ad506eb48f42c7144716e7f781513c"],
    ["/bower_components/jquery/src/var/documentElement.js", "b42747c44c5f46813de9cfc409863bd9"],
    ["/bower_components/jquery/src/var/fnToString.js", "779df484d863e0154c7d27ad74144b4b"],
    ["/bower_components/jquery/src/var/getProto.js", "cc39bf4d74b2346688c1289d64587ae9"],
    ["/bower_components/jquery/src/var/hasOwn.js", "ea807ca4509ac0a9337ee60c8e756acd"],
    ["/bower_components/jquery/src/var/indexOf.js", "91f549f495364b948fc51d475276baff"],
    ["/bower_components/jquery/src/var/pnum.js", "8bb2e88e531e9cd2bc9059df5b5f0595"],
    ["/bower_components/jquery/src/var/push.js", "0fbcbedbfc38e86883db047628486e6b"],
    ["/bower_components/jquery/src/var/rcssNum.js", "d05e443af01d56ae50f9ae29b516cdbb"],
    ["/bower_components/jquery/src/var/rnothtmlwhite.js", "cd00ba8a3e513c5456e44e91789dd9b4"],
    ["/bower_components/jquery/src/var/slice.js", "52a787d2ca995b614bd97d5bf8ae5218"],
    ["/bower_components/jquery/src/var/support.js", "2d3a2082ece44cf22f02c83ca6992615"],
    ["/bower_components/jquery/src/var/toString.js", "1a5b3ede2aafabfb4b6b1795a012b361"],
    ["/bower_components/jquery/src/wrap.js", "76586fa41ac42166ebabb38fed320248"],
    ["/bower_components/ngstorage/ngStorage.js", "587579c86a0ccf812c91ecb5905d98b6"],
    ["/bower_components/ngstorage/ngStorage.min.js", "ee45fc1dc996fc2033bc24c058f95fe4"],
    ["/bower_components/ngstorage/package.js", "62510ac35f392608ce18bf7872570f0b"],
    ["/bower_components/tether/dist/css/tether-theme-arrows-dark.css", "9bdaf7b51c21d97b8d99163b8bd2855b"],
    ["/bower_components/tether/dist/css/tether-theme-arrows-dark.min.css", "81d133231fdca6766390bd8d3f51cfcd"],
    ["/bower_components/tether/dist/css/tether-theme-arrows.css", "71a3f9ce7bb5200c0e31b0d44def1ea6"],
    ["/bower_components/tether/dist/css/tether-theme-arrows.min.css", "93cb0ccf16d69a1b6395a19fcde81768"],
    ["/bower_components/tether/dist/css/tether-theme-basic.css", "46d54e88ce1912145ac1a5f8d4908f51"],
    ["/bower_components/tether/dist/css/tether-theme-basic.min.css", "e01e283b5f75333211d7a10f5d5efe2a"],
    ["/bower_components/tether/dist/css/tether.css", "ae54ad768669744640d63a41f2c8691f"],
    ["/bower_components/tether/dist/css/tether.min.css", "62155a3948cbf17b1bf4b407c90ab84f"],
    ["/bower_components/tether/dist/js/tether.js", "69029c396068e7f0994829559e4a15b6"],
    ["/bower_components/tether/dist/js/tether.min.js", "99d5eb445062f5f3b82d29aa2680e4a2"],
    ["/bower_components/tether/docs/css/intro.css", "4f176dd6396608214f34dd5f28a7ffa6"],
    ["/bower_components/tether/docs/js/intro.js", "f0a7cd8d9d3c412f029b599d399db595"],
    ["/bower_components/tether/docs/js/markAttachment.js", "cba6aa0fdce724c5b1f64f18cf1aeb49"],
    ["/bower_components/tether/docs/welcome/browser-demo.html", "f81f5da3b921101f60c0d1e095eea893"],
    ["/bower_components/tether/docs/welcome/css/browser-demo.css", "2ad57d4618524003497ff3ee1625f23c"],
    ["/bower_components/tether/docs/welcome/css/prism.css", "9570476d70f5d8edd9ae6c2581864de8"],
    ["/bower_components/tether/docs/welcome/css/welcome.css", "88ff2d390eb79397e45c9426d0053621"],
    ["/bower_components/tether/docs/welcome/index.html", "2876380da5976550e978e2a0ddaf5c07"],
    ["/bower_components/tether/docs/welcome/js/drop.js", "b7461f9a88fae1520ea867bd321b8785"],
    ["/bower_components/tether/docs/welcome/js/jquery.js", "f16d4569fa38fb8a8f264cc832978824"],
    ["/bower_components/tether/docs/welcome/js/log.js", "a44578d6abd2c5477bd98191e4d600d6"],
    ["/bower_components/tether/docs/welcome/js/tether-v0.1.3.js", "2dd299f9a18e6fefc9e3a389d2e21921"],
    ["/bower_components/tether/docs/welcome/js/welcome.js", "9992c06215f7304166b0b9fda02dcf14"],
    ["/bower_components/tether/examples/chosen/chosen-sprite.png", "25b9acb1b504c95c6b95c33986b7317e"],
    ["/bower_components/tether/examples/chosen/chosen-sprite@2x.png", "614fad616d014daf5367e068505cad35"],
    ["/bower_components/tether/examples/chosen/chosen.css", "265e282e0809c9d0fd409e95480592a4"],
    ["/bower_components/tether/examples/chosen/chosen.js", "0c1f2d8c18a8cef65777c5a24254c06e"],
    ["/bower_components/tether/examples/chosen/index.html", "e965bd0d0dc4d2c84b8e496dba7a56a5"],
    ["/bower_components/tether/examples/common/css/style.css", "553b42b6808b1e2aa4930943c6aaa8c8"],
    ["/bower_components/tether/examples/content-visible/index.html", "be20942e083d80723c593300984142ab"],
    ["/bower_components/tether/examples/dolls/dolls.css", "37d5b7647989093f686e91a8093bd28b"],
    ["/bower_components/tether/examples/dolls/dolls.js", "135fec952bcc879cb24772efdc442c23"],
    ["/bower_components/tether/examples/dolls/index.html", "5b5557aca529b480941ea25218533dd6"],
    ["/bower_components/tether/examples/element-scroll/index.html", "f92ea019668a054487df19c6c9b48992"],
    ["/bower_components/tether/examples/enable-disable/index.html", "deeb6f742a200cf5b994de075e42c776"],
    ["/bower_components/tether/examples/facebook/facebook.css", "bc65c3d95a84750b8bb7fb3a4a30757c"],
    ["/bower_components/tether/examples/facebook/index.html", "8faaab09bdba9b8ac2abc4a32dbf5f8c"],
    ["/bower_components/tether/examples/out-of-bounds/index.html", "37c0946b128ec5f9e2d7f94c512273aa"],
    ["/bower_components/tether/examples/pin/index.html", "6632b16f442318ef634abb5f91348770"],
    ["/bower_components/tether/examples/resources/css/base.css", "96e174c1ca9a69a6e26a1a680c4d0156"],
    ["/bower_components/tether/examples/resources/js/jquery.js", "37cd58c5f1052b2673d2dfc2f3bc46e7"],
    ["/bower_components/tether/examples/resources/js/log.js", "a44578d6abd2c5477bd98191e4d600d6"],
    ["/bower_components/tether/examples/scroll/index.html", "d48d9be7d3ce589b05f27efa08928929"],
    ["/bower_components/tether/examples/simple/index.html", "a53ee6e06a3d6d1701070313f3533a30"],
    ["/bower_components/tether/examples/testbed/index.html", "1c04e76affb076ffcb0a55281ba3a75f"],
    ["/bower_components/tether/examples/tooltip/index.html", "7b5a6145cfa46b322b0ebbd291d556fd"],
    ["/bower_components/tether/examples/viewport/colors.css", "d88c0596a9157f99c35c1eb1e19b4279"],
    ["/bower_components/tether/examples/viewport/index.html", "78268c0baaaea19b6911cef3eae92807"],
    ["/bower_components/tether/gulpfile.js", "7564ed33d4a4356e36fd9cbf87576361"],
    ["/bower_components/tether/src/js/abutment.js", "87a099608ecbd742ff2998d4c0d09633"],
    ["/bower_components/tether/src/js/constraint.js", "1c1f7ce15702283745724f82b355fd7c"],
    ["/bower_components/tether/src/js/markAttachment.js", "35145291949fd17e1b5dc79cd90c9aa1"],
    ["/bower_components/tether/src/js/shift.js", "aab803d6a4df9c9294be34caadee4ec6"],
    ["/bower_components/tether/src/js/tether.js", "c3898225f4f30d6e91be10fc3526ac08"],
    ["/bower_components/tether/src/js/utils.js", "fa9938ddb2ab8703cf7a009b020ce34e"],
    ["/firebase-messaging-sw.js", "16ffe93294b2459a628ad335ee66cf2e"],
    ["/images/icon-notification-192x192.png", "153ec28d4a902ee51b7e6ccb127d092d"],
    ["/images/icons/icon-128x128.png", "93a402037a21745d81981edfbc64c850"],
    ["/images/icons/icon-144x144.png", "eafbe3387c7e8237670659675a0bd92d"],
    ["/images/icons/icon-152x152.png", "030e72d03ce15bfa8abab30c429c0440"],
    ["/images/icons/icon-192x192.png", "b6817b595223d05071a2c13c7b8cea31"],
    ["/images/icons/icon-384x384.png", "75cbaa6e3e9c5dd7700fe48a786adb2a"],
    ["/images/icons/icon-72x72.png", "65fc449f3abf8325922d069f6fbad9d6"],
    ["/images/icons/icon-96x96.png", "9b14d3618f14ec8d99f1ef1288c6975a"],
    ["/images/icons/search-icon.png", "9b273adad0d1945d0b6b0841af07cefc"],
    ["/images/title1.jpg", "3740064bbd83a0db3869f5eb8d3994ef"],
    ["/index.html", "64956ba525ce8f68f0fab1f94b481d89"],
    ["/scripts/app.js", "7d867bd7620782774a6c866d72fa06e3"],
    ["/scripts/controllers/header.js", "af1d22d5417835c12e49113ace36b76e"],
    ["/scripts/controllers/home.js", "1305b453f4e6cd82c75e6f1d596e52c9"],
    ["/scripts/controllers/login.js", "06f7d1c91a17f2e4feda0eef83eb64c1"],
    ["/scripts/controllers/projects/category.js", "567fb30733de83b7c86d5899d853c1e1"],
    ["/scripts/controllers/projects/create.js", "1fe9f738d224eebfa2c429af372a4693"],
    ["/scripts/controllers/projects/details.js", "58af3dfdaa46873d0a64e87c0622444e"],
    ["/scripts/controllers/projects/favourites.js", "995184aafa553f55efde83218edd947b"],
    ["/scripts/controllers/projects/index.js", "c6bbac43067cfa7afb133cea29cb7eb7"],
    ["/scripts/controllers/projects/myProjects.js", "0da3366052eddc2c6fa2c81626850fff"],
    ["/scripts/oneSignal/OneSignalConfig.js", "598bbf6e17e6cba2a2b53c9e551bca2f"],
    ["/scripts/oneSignal/OneSignalSDKUpdaterWorker.js", "a4f31b84d594856359f740d4fa3f088d"],
    ["/scripts/oneSignal/OneSignalSDKWorker.js", "a4f31b84d594856359f740d4fa3f088d"],
    ["/scripts/services/authService.js", "88fad6ec728484131fa78e845c57025f"],
    ["/scripts/services/projectService.js", "07a9221d25bbb1b54ebda2b7d6ffae1c"],
    ["/styles/css/app.css", "9b807f1be7a64d09295305f208e21e55"],
    ["/views/home.html", "ade191f75483471150cccaa2525800fa"],
    ["/views/login.html", "5a21335ed9005efaa24119e326ca6b83"],
    ["/views/projects/create.html", "7db21f56f72bf904961bd5ff761fc2cb"],
    ["/views/projects/details.html", "3e37c26b0915950adab706e9ab230d84"],
    ["/views/projects/favourites.html", "e0beea3fe52724c349a5c95a4907d25b"],
    ["/views/projects/index.html", "937a327a9a5623dc33304564bff6805c"],
    ["/views/shared/404.html", "a2e45c128eb2a0fab0c75aa9c88cb3ba"],
    ["/views/shared/contact.html", "078be41b0f6d1f9fb2d92a6c6cc7e68a"],
    ["/views/shared/footer.html", "04ec9c7131f9cd5e8267809f33dc4b4a"],
    ["/views/shared/header.html", "2616a0c8e16aa800aaf70d3672670cf6"],
    ["/views/shared/tos.html", "b0eb24053d502fdbe091fee29d1b6753"]
];
var cacheName = 'sw-precache-v10--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var createCacheKey = function(originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function(item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function(requests) {
        return requests.map(function(request) {
            return request.url;
        });
    }).then(function(urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return setOfCachedUrls(cache).then(function(cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
                        // If we don't have a key matching url in the cache already, add it.
                        if (!cachedUrls.has(cacheKey)) {
                            return cache.add(new Request(cacheKey, {
                                credentials: 'same-origin'
                            }));
                        }
                    })
                );
            });
        }).then(function() {

            // Force the SW to transition from installing -> active state
            return self.skipWaiting();

        })
    );
});

self.addEventListener('activate', function(event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.keys().then(function(existingRequests) {
                return Promise.all(
                    existingRequests.map(function(existingRequest) {
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function() {

            return self.clients.claim();

        })
    );
});


self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        // Should we call event.respondWith() inside this fetch event handler?
        // This needs to be determined synchronously, which will give other fetch
        // handlers a chance to handle the request if need be.
        var shouldRespond;

        // First, remove all the ignored parameter and see if we have that URL
        // in our cache. If so, great! shouldRespond will be true.
        var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
        shouldRespond = urlsToCacheKeys.has(url);

        // If shouldRespond is false, check again, this time with 'index.html'
        // (or whatever the directoryIndex option is set to) at the end.
        var directoryIndex = 'index.html';
        if (!shouldRespond && directoryIndex) {
            url = addDirectoryIndex(url, directoryIndex);
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond is still false, check to see if this is a navigation
        // request, and if so, whether the URL matches navigateFallbackWhitelist.
        var navigateFallback = '';
        if (!shouldRespond &&
            navigateFallback &&
            (event.request.mode === 'navigate') &&
            isPathWhitelisted([], event.request.url)) {
            url = new URL(navigateFallback, self.location).toString();
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond was set to true at any point, then call
        // event.respondWith(), using the appropriate cache key.
        if (shouldRespond) {
            event.respondWith(
                caches.open(cacheName).then(function(cache) {
                    return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
                        if (response) {
                            return response;
                        }
                        throw Error('The cached response that was expected is missing.');
                    });
                }).catch(function(e) {
                    // Fall back to just fetch()ing the request if some unexpected error
                    // prevented the cached response from being valid.
                    console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                    return fetch(event.request);
                })
            );
        }
    }
});

self.addEventListener('notificationclick', event => {
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
        clients.matchAll().then(matchedClients => {
            for (let client of matchedClients) {
                if (client.url === rootUrl) {
                    return client.focus();
                }
            }
            return clients.openWindow("/");
        })
    );
});
