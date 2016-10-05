var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(){
  return gulp.src('assets/less/main.less')
    .pipe(less()) // Using gulp-sass
    .pipe(gulp.dest('assets/css'))
});

gulp.task('watch', function(){
  gulp.watch('assets/less/main.less', ['less']); 
});