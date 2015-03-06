var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var sass = require('gulp-sass');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var runSeq = require('run-sequence');
var reload = browserSync.reload;

console.log($);

gulp.task('clean', function(cb) {
  return del([
      'dist/**/*.*'
    ], cb);
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  return gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
            errLogToConsole: true,
            sourceComments : false
        }))
    .pipe(sourcemaps.write())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
});

var bundler = _.memoize(function() {
  return watchify(browserify('./src/app/main.js', _.extend({ debug: true }, watchify.args)));
});

function bundle() {
  return bundler().bundle()
    .on('error', $.util.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function() {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  return bundle();
});

gulp.task('jshint', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

gulp.task('data', function() {
  return gulp.src(['./src/data/**/*.json'])
    .pipe(gulp.dest('./dist/data'));
});

gulp.task('media', function() {
  return gulp.src(['./src/media/**/*.*'])
    .pipe(gulp.dest('./dist/media'));
});

gulp.task('fonts', function() {
  return gulp.src(['./src/fonts/*.*'])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', function(cb) {
  runSeq('clean',
  'html',
  'styles',
  'jshint',
  'scripts',
  'data',
  'fonts',
  'media',
  cb);
});

gulp.task('watch', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  bundler().on('update', function() {
    gulp.start('scripts');
  });
  gulp.watch(['./src/**/*.*'], ['build']);
});

gulp.task('default', ['watch']);