var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyInline = require('gulp-minify-inline');
var htmlmin = require('gulp-htmlmin');
var strip = require('gulp-strip-comments');

//javascript
gulp.task('clean:app-js', function () {
    return del([
        './public/dist/js/site.min.js'
    ]);
});
gulp.task('build:app-js', ['clean:app-js'], function () {
    return gulp.src([
            './public/assets/js/jquery-2.1.0.min.js',
            './public/assets/js/popper.js',
            './public/assets/js/bootstrap.min.js',            
            './public/assets/js/particles.js',
            './public/assets/js/jquery.twbsPagination.min.js',
            './public/assets/js/custom.js'
        ])
        .pipe(strip())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('site.min.js'))                
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./public/dist/js'));
});
//css
gulp.task('clean:app-css', function () {
    return del([
        './public/dist/css/site.min.css'
    ]);
});
gulp.task('build:app-css', ['clean:app-css'], function () {
    return gulp.src([
            './public/assets/css/bootstrap.min.css',
            './public/assets/css/font-awesome.min.css',
            './public/assets/css/dark.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('site.min.css'))
        .pipe(minify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./public/dist/css'));
});

//html
gulp.task('clean:html', function () {
    return del([
        './views-min'
    ]);
});
gulp.task('build:html', ['clean:html'], function () {
    return gulp.src([
            './views-new/**/*.html',
            './views-new/*.html'
        ])
        .pipe(minifyInline())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./views-min'));
});

gulp.task('default', ['build:app-js', 'build:app-css', 'build:html']);