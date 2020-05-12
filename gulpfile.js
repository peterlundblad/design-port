var gulp = require("gulp")
var sass = require("gulp-sass")

var defaultTask = function() {
    }

gulp.task("sass", function(){
    return gulp.src("scss/input.scss")
        .pipe(sass())
        .pipe(gulp.dest("css/style.css"))
})

gulp.task("watch", function() {
    gulp.watch("css/input.scss" ["sass"])
})

exports.default = defaultTask