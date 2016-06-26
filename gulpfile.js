var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var minifycss = require('gulp-minify-css');
var rimraf = require('gulp-rimraf');

// 清空生成文件
gulp.task('clean', function() {
    return gulp.src(['./build/*'], {
            read: false
        })
        .pipe(rimraf());
});

gulp.task('sass', function() {
    gulp.src('./src/css/*.scss').pipe(sass()).pipe(minifycss()).pipe(gulp.dest('./build/css'));
})
// 复制所有html到build目录
gulp.task('html', function() {
    return gulp.src(['./src/**/*.html'])   
        .pipe(gulp.dest('./build'));
});


gulp.task('images', function() {
    return gulp.src(['./src/images/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js').pipe(uglify()).pipe(gulp.dest('./build/js'))
})
gulp.task('watch', function() {
   gulp.watch('./src/css/*.scss').on('change', function(event) {
            runSequence(['sass']);
        });
 gulp.watch('./src/**/*.html').on('change', function(event) {
            runSequence(['html']);
        });
  gulp.watch('./src/js/*.js').on('change', function(event) {
            runSequence(['js']);
        });
})

/*生产环境*/
gulp.task('default', runSequence('clean',['sass', 'html','images','watch','js']));
