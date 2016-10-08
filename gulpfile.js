var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(){
  return gulp.src('client/assets/less/main.less')
    .pipe(less()) // Using gulp-sass
    .pipe(gulp.dest('client/assets/css'))
});

gulp.task('watch', function(){
  gulp.watch('client/assets/less/main.less', ['less']); 
});