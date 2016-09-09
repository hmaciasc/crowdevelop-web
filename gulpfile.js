// Load Gulp
var gulp = require('gulp'),
cssmin = require('gulp-cssmin'),
less = require('gulp-less'),
path = require('path'),
plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-live-server': 'serve',
    'gulp-autoprefixer': 'autoprefixer'
  }
});

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

gulp.task('less', function(){
  gulp.src('app/styles/less/*.less')
  .pipe(less())
  .pipe(plugins.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssmin())
  .pipe(gulp.dest('app/styles/css'));
});

// Default task
gulp.task('watch', function () {
  gulp.watch('app/styles/less/**/*.less', ['less']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
  var server = plugins.serve.static('app/', 5000);
  server.start();
  gulp.watch(['app/*'], function (file) {
    server.notify.apply(server, [file]);
  });
});
