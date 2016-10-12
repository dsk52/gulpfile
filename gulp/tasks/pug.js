var gulp     = require('gulp');
var config   = require('../config');
var plumber  = require('gulp-plumber');
var notify   = require('gulp-notify');
var browser  = require("browser-sync");

var pug     = require('gulp-pug');

gulp.task('pug', function() {
  gulp.src([
      config.source.pug + '**/*.pug',
      '!' + config.source.pug + '**/_*.pug'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest.html))
    .pipe(browser.reload({stream:true}));
});
