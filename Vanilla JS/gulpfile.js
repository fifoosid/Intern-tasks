const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// gulp.task('scripts', () =>
//     gulp.src('./scripts(es6)/**/*.js')
//         .pipe(babel({
//             presets: ['env']
//         }))
//         .pipe(gulp.dest('scripts'))
// );

gulp.task('scripts', () => {
    gulp.src('./scripts(es6)/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('scripts'))
});

gulp.task('sass', () => {
    gulp.src('./uncompiled_styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'));
});

gulp.task('watch',() => {
    gulp.watch('./scripts(es6)/**/*.js', ['scripts']);
    gulp.watch('./uncompiled_styles/**/*.scss', ['sass']);
});