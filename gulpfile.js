var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src('javascripts/**')
    .pipe(react())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./'));
})
