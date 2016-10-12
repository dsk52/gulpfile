var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch',["server"], function () {
    gulp.watch('slim/**/*.slim', ['slim']);
    gulp.watch(config.source.pug + '**/*.pug', ['pug']);
    gulp.watch(config.source.sass + '/**/*.scss', ['sass']);
    gulp.watch(config.source.coffee + '/**/*.coffee', ['coffee']);
    gulp.watch(config.source.js + '/**/*.js', ['js']);
});
