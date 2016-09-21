var gulp       = require('gulp');
var config     = require('../config');
var plumber    = require('gulp-plumber');
var fs         = require("fs");
var browser  = require("browser-sync");

var browserify = require("browserify");

gulp.task('js', function() {
  browserify(config.source.js + "script.js") // entry point
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(fs.createWriteStream(config.dest.js + 'script.js'))
});
