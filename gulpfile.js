var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var minifyJS = require('gulp-minify');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

/**
 * Load generic webserver
 */
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

/**
 * Clone front-end dependencies from node_modules into assets directory
 */
gulp.task('clone-libraries', function() {
    // Copy SASS files to new location
    gulp.src([
        './node_modules/bootstrap-sass/assets/stylesheets/*',
        './node_modules/bootstrap-sass/assets/stylesheets/*/*',
        './node_modules/bootstrap-sass/assets/stylesheets/*/*/*',
    ]).pipe(gulp.dest('./assets/sass/bootstrap'));

    // Copy and minify JS files
    gulp.src('./node_modules/masonry-layout/dist/masonry.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./assets/dist/js/masonry'));

    gulp.src('./node_modules/jquery/dist/jquery.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./assets/dist/js/jquery'));

    gulp.src('./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./assets/dist/js/bootstrap'));
});

/**
 * Watch source assets for changes
 */
gulp.task('watch', function () {
    watch('./assets/sass/*.scss', function() {
        gulp.run(['build-sass','minify-css']);
    });
});
 
/**
 * Build all CSS from SASS for the project
 */
gulp.task('build-sass', function() {
    // Convert SASS to CSS
    gulp.src('./assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));

});

/**
 * Minify all CSS for the project
 */
gulp.task('minify-css', function() {
    // Minify CSS
    gulp.src('./assets/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/dist/css'));

});

