var gulp     = require('gulp');
var config   = require('../config');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var browser  = require("browser-sync");

var jade     = require('gulp-jade');

gulp.task('jade', function() {
  gulp.src([
      config.source.jade + '**/*.jade',
      '!' + config.source.jade + '**/_*.jade'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest.html))
    .pipe(browser.reload({stream:true}));
});
