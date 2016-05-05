'use strict';

var gulp     = require('gulp');

var slim     = require("gulp-slim");
var jade     = require('gulp-jade');

var sass     = require('gulp-sass');
var bourbon = require('node-bourbon');
var bulkSass = require('gulp-sass-bulk-import');
var autoprefixer = require('gulp-autoprefixer');
var csso     = require('gulp-csso');

var coffee   = require('gulp-coffee');
var concat   = require('gulp-concat');

var uglify   = require("gulp-uglify");
var plumber  = require('gulp-plumber');
var fs = require("fs");
var browserify = require("browserify");
var browser  = require("browser-sync");
var notify = require('gulp-notify');


bourbon.with('scss/');

gulp.task('slim', function(){
  gulp.src("slim/*.slim")
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./"))
    .pipe(browser.reload({stream:true}));
});

gulp.task('jade', function() {
  gulp.src([
      './jade/*.jade',
      '!./jade/_*.jade'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('sass', function() {
  return gulp.src([
      './scss/**/*.scss',
      '!./scss/**/_*.scss'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(bulkSass())
    .pipe(sass({includePaths: bourbon.includePaths}))
    .pipe(csso())
    .pipe(gulp.dest('css/'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('script.min.js'))
    .pipe(coffee())
    .pipe(gulp.dest('./js/'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('js', function() {
  browserify("./js/script.js") // entry point
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream("./js/bundle.js"))
});

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch',["server"], function () {
    gulp.watch('slim/**/*.slim', ['slim']);
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('coffee/**/*.coffee', ['coffee']);
    gulp.watch('js/**/*.js', ['js']);
});
