// Karma configuration
// Generated on Sat Sep 24 2016 17:38:39 GMT+0100 (WEST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/firebase/firebase.js',
            'app/bower_components/angularfire/dist/angularfire.min.js',
            'app/bower_components/angular-strap/dist/angular-strap.min.js',
            'app/bower_components/angular-strap/dist/angular-strap.tpl.min.js',
            'app/scripts/**/*.js',
            'units/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
