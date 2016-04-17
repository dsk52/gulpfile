'use strict';

var gulp     = require('gulp');
var slim     = require("gulp-slim");
var jade     = require('gulp-jade');
var sass     = require('gulp-ruby-sass');
var coffee   = require('gulp-coffee');
var autoprefixer = require('gulp-autoprefixer');
var csso     = require('gulp-csso');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var plumber  = require('gulp-plumber');
var uglify   = require("gulp-uglify");
var browser  = require("browser-sync");
var notify = require('gulp-notify');

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
  gulp.src(['./jade/*.jade', '!./jade/_*.jade'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('sass', function () {
    return sass('scss/**/**.scss', {
      style: 'expanded'
    })
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    // .pipe(csso())
    // .pipe(rename('style.min.css'))
    // .pipe(gulp.dest('css/'));
    .pipe(browser.reload({stream:true}));
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('script.min.js'))// 結合 & rename
    .pipe(coffee())
    .pipe(gulp.dest('./js/'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src('js/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
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
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('coffee/**/*.coffee', ['coffee']);
    gulp.watch('js/**/*.js', ['js']);
});
