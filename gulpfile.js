const gulp = require('gulp'); // <-- "pipes" modules
const babel = require('gulp-babel'); // <-- transpiles es6 into es5
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');


gulp.task('buildJS', function () {
	// Grabs all JS files in browser
	// Grabs app.js FIRST
	return gulp.src(['./browser/app/app.js','./browser/**/*.js'])
 				// convert into ES6
 				.pipe(babel({
 					// configure babel presets for transpiling
 					presets: ["es2015"]
 				}))
    		// concats everything into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the public dir
        .pipe(gulp.dest('./public/'));
});

gulp.task('buildCSS', function () {
	return gulp.src('./browser/sass.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('./public/'));
});

gulp.task('transferHTML', function () {
	return gulp.src('./browser/**/*.html')
				 .pipe(gulp.dest('./public/'));
});

gulp.task('transferMedia', function () {
	return gulp.src('./browser/media/*.*')
					.pipe(gulp.dest('./public/media'));
});

gulp.task('watch', function () {
	gulp.watch('./browser/**/*.js', ['buildJS']);
	gulp.watch('./browser/**/*.scss', ['buildCSS']);
	gulp.watch('./browser/**/*.html', ['transferHTML']);
	gulp.watch('./browser/media/*.*', ['transferMedia']);
});

gulp.task('build', ['buildJS', 'buildCSS','transferHTML','transferMedia']);

gulp.task('default', ['build','watch']);
