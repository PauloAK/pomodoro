
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const tailwindcss = require('tailwindcss');
const gulpTS = require('gulp-typescript');

function css() {
    return gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(postcss([
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(purgecss({ content: ['./src/**/*.ejs', './src/**/*.scss'] }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public'));
}

function ts() {
    return gulp.src('./src/js/**/*.ts')
        .pipe(gulpTS())
        .pipe(babel())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
}

function js() {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
}

function watch() {
    gulp.watch('./src/css/*.scss', css);
    gulp.watch('./src/js/**/*.js', js);
    gulp.watch('./src/js/**/*.ts', ts);
    gulp.watch('./src/views/**/*.ejs', css);
}

gulp.task(css);
gulp.task(js);
gulp.task(ts);
gulp.task(watch);

gulp.task('default', gulp.series(css, ts, js, watch));