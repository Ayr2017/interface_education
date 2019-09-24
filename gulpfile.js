const gulp = require('gulp');
const concat = require('gulp-concat');

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
        .pipe(gulp.dest('./build/css'));
}

function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./build/js'));
}

gulp.task('styles1', styles);
gulp.task('scripts1', scripts);