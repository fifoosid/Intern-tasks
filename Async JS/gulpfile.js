//Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
    destSass: './Styles/style.css'
}

gulp.task('sass', function() {
    gulp.src('**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', function() {
    gulp.watch('**/*.scss',['sass']);
})