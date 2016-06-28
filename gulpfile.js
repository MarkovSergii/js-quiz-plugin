/**
 * Created by user on 28.06.2016.
 */

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var wrap = require('gulp-wrap');
//var declare = require('gulp-declare');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');




gulp.task('css', function() {
    return gulp.src(['src/*.css'])
        .pipe(concat('js-quiz-plugin.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dest'));
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dest'));
});

gulp.task('js', function() {
    gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('js-quiz-plugin.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dest'));

});

gulp.task('watch', function() {

    gulp.run('css');
    gulp.run('js');
    gulp.run('html');

    gulp.watch('src/*.css', function() {
        gulp.run('css');
    });

    gulp.watch('src/*.js', function() {
        gulp.run('js');
    });

    gulp.watch('src/index.html', function() {
        gulp.run('html');
    });

    gulp.watch("dest/*.*").on('change', browserSync.reload);

    browserSync.init({
        server: {
            baseDir: './dest/'
           // index:'dest/index.html'
        },
        host: '127.0.0.1',
        port: 4444,
        open: false,
        notify: false,
        ui: false,
        ghostMode: false
    });
});


