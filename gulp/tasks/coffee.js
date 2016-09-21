var gulp     = require('gulp');
var config   = require('../config');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var browser  = require("browser-sync");

var coffee   = require('gulp-coffee');
var concat   = require('gulp-concat');

gulp.task('coffee', function() {
  gulp.src([
    config.source.coffee + '**/*.coffee',
    '!' + config.source.coffee + '**/_*.coffee'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('script.min.js'))
    .pipe(coffee())
    .pipe(gulp.dest(config.dest.js))
    .pipe(browser.reload({stream:true}));
});
