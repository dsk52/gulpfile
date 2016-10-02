var gulp       = require('gulp');
var config     = require('../config');
var plumber    = require('gulp-plumber');
var fs         = require("fs");
var browser    = require("browser-sync");

var browserify = require("browserify");
var source     = require('vinyl-source-stream');
var babelify   = require('babelify');

gulp.task('js', function() {
  // `src/scripts/main.js` を `assets/scripts.js` にビルド
  browserify({
    entries: config.source.js + 'script.js',
    transform: 'babelify'
  })
  .bundle()
  .pipe(source('scripts.js'))
  .pipe(gulp.dest(config.dest.js));
});
