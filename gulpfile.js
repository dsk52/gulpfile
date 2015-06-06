'use strict';

var gulp     = require('gulp');
var slim     = require("gulp-slim");
var sass     = require('gulp-ruby-sass');
var coffee   = require('gulp-coffee');
var csso     = require('gulp-csso');
var rename   = require('gulp-rename');
var plumber  = require('gulp-plumber');
var uglify   = require("gulp-uglify");
var browser  = require("browser-sync");

gulp.task('slim', function(){
  gulp.src("slim/**/*.slim")
    .pipe(plumber())
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./"))
    .pipe(browser.reload({stream:true}));
});

gulp.task('sass', function () {
    return sass('scss/', {
      style: 'expanded'
    })
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('css/'))
    // .pipe(csso())
    // .pipe(rename('style.min.css'))
    // .pipe(gulp.dest('css/'));
    .pipe(browser.reload({stream:true}));
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./js/'))
});

gulp.task('js', function() {
  gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browser.reload({stream:true}));
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
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('coffee/**/*.coffee', ['coffee']);
    gulp.watch('js/**/*.js', ['js']);
});
