var stylus = require('gulp-stylus');
var path = require('path');
var gulp = require('gulp');
var autoprefixer=require('gulp-autoprefixer')
gulp.task('styl', function () {
    return gulp.src('./src/css/*.styl')    
    .pipe(stylus({
        compress: true
      }))
      .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
})

 
gulp.task('default', gulp.parallel('styl'),function(){

});