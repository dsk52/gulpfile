var gulp     = require('gulp');
var browser  = require("browser-sync");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});
