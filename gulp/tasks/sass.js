var gulp          = require('gulp');
var config        = require('../config');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var browser       = require("browser-sync");

var sass          = require('gulp-sass');
var bourbon       = require('node-bourbon');
var bulkSass      = require('gulp-sass-bulk-import');
var autoprefixer  = require('gulp-autoprefixer');
var csso          = require('gulp-csso');

bourbon.with('scss/');

gulp.task('sass', function() {
  return gulp.src([
      config.source.sass + '**/*.scss',
      '!' + config.source.sass + '**/_*.scss'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(bulkSass())
    .pipe(sass({includePaths: bourbon.includePaths}))
    .pipe(csso())
    .pipe(gulp.dest(config.dest.css))
    .pipe(browser.reload({stream:true}));
});
