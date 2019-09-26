const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');


const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]
const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]

// Task for css 
function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['build/*']);
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch("./*.html").on('change', browserSync.reload);
}

function sassCompile() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css'))
}

gulp.task('styles1', styles);
gulp.task('scripts1', scripts);

gulp.task('del', clean);
gulp.task('watching', watching);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('sass-compile', sassCompile)
gulp.task('dev', gulp.series('sass-compile', 'build', 'watching', ));