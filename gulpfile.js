// Load Gulp
var gulp = require('gulp'),
    // cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    path = require('path'),
    browserSync = require('browser-sync'),
    // modRewrite = require('connect-modrewrite'),
    exec = require('child_process').exec,
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve',
            'gulp-autoprefixer': 'autoprefixer'
        }
    });

gulp.task('default', ['watch', 'firebase']);

gulp.task('generate-service-worker', function(callback) {
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = 'app';

    swPrecache.write(path.join(rootDir, 'sw.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
    }, callback);
});

gulp.task('serve', function() {
    browserSync.init(null, {
        notify: false,
        port: 8080,
        server: {
            baseDir: ['app'],
        }
    });
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
    gulp.watch(['app/**/*.*']).on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src('app/styles/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cssmin())
        .pipe(gulp.dest('app/styles/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
});

gulp.task('firebase', function(cb) {
    exec('sudo firebase serve', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
});
