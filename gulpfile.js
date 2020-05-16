var gulp = require("gulp")
var sass = require("gulp-sass")
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var postcss = require("gulp-postcss")
var autoprefixer = require("autoprefixer")
var browserSync = require('browser-sync').create()

	
// Put this after including our dependencies
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "SCSS/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "css"
    }
 
    // Easily add additional paths
    // ,html: {
    //  src: '...',
    //  dest: '...'
    // }
};

// Define tasks after requiring dependencies
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src("SCSS/*.scss")
            .pipe(sourcemaps.init())
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('.'))
             // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
            .pipe(browserSync.reload())
            
    );
}

// A simple task to reload the page
function reload(done) {
    browserSync.reload();
    done();
}


function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style);
    gulp.watch("*.html", reload);
    }
    
// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style

//from the great tutorial on gulp 4
//https://goede.site/setting-up-gulp-4-for-automatic-sass-compilation-and-css-injection