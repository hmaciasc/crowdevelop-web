// protractor.conf.base.js
'use strict';

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the location of the spec file. They may
    // include glob patterns.
    specs: ['e2e/*.js'],

    // onPrepare: function() {
    //     // Disable animations so e2e tests run more quickly
    //     var disableNgAnimate = function() {
    //         angular.module('disableNgAnimate', []).run(function($animate) {
    //             $animate.enabled(false);
    //         });
    //     };
    //
    //     browser.addMockModule('disableNgAnimate', disableNgAnimate);
    //
    //     require('jasmine-reporters');
    //     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('xmloutput', true, true));
    // },
    rootElement: '.crowDevelop',
    onPrepare: function() {
        global.isAngularSite = function(flag) {
                console.log('Switching to ' + (flag ? 'Asynchronous' : 'Synchronous') + ' mode.')
                browser.ignoreSynchronization = !flag;
            },
            global.BROWSER_WAIT = 5000;
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    },

    baseUrl: 'https://localhost:5000',

    framework: 'jasmine'
};



// protractor.conf.phantom.js
'use strict';

var config = exports.config = require('./protractor.conf.js').config;

config.capabilities = {
    browserName: 'chrome',
    version: '',
    platform: 'ANY'
};

// Run by "protractor protractor.conf.phantom.js"
