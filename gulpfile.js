'use strict';

// install module
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var include = require('gulp-include');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var purify = require('gulp-purifycss');
var index = require('gulp-index');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
// var filenamesToJson = require('gulp-filenames-to-json');




// paths
var src = 'src';
var app = 'app';
var watchPaths = {
    html : src + '/**',
    css : src + '/css/**',
    js : src + '/js/**',
    img : src + '/images/*',
    fonts : src + '/fonts/*'
};
var inputPaths = {
    html : src + '/*.html',
    cmm : src + '/*/*.html',
    css : src + '/css/*.scss',
    libCss : src + '/css/lib/*.css',
    js : src + '/js/*.js',
    libJs : src + '/js/lib/*.js',
    img : src + '/images/**',
    font : src + '/fonts/**',
    favicon : src + '/favicon.ico'
};
var outputPaths = {
    html : app + '/',
    htmlFileName : app + '/*.html',
    css : app + '/assets/css',
    libCss : app + '/assets/css/lib',
    js : app + '/assets/js',
    libJs : app + '/assets/js/lib',
    img : app + '/assets/images',
    font : app + '/assets/fonts',
    json : app + '/assets/json'
};


// build html including
gulp.task('dev::html', function(){
  gulp.src(inputPaths.html)
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest(outputPaths.html))
      .pipe(browserSync.reload({
          stream : true
      }));

});

// build sass for dev
gulp.task('dev::css', function(){
  gulp.src(inputPaths.css)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded', indentType : 'tab', indentWidth : 1}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer('last 16 version')) // vender prefixe
      .pipe(purify(['app/**/*.js', 'app/*.html'])) // unuesd css remove
      .pipe(gulp.dest(outputPaths.css))
      .pipe(browserSync.reload({
          stream : true
      }));

  gulp.src(inputPaths.libCss)
      .pipe(gulp.dest(outputPaths.libCss))
      .pipe(browserSync.reload({
          stream : true
      }));
});

// build js compress
gulp.task('dev::js', function(){

  gulp.src([inputPaths.js])
      .pipe(concat('scripts.js'))
      .pipe(minify({ext:{min : '.min.js'}}))
      .pipe(gulp.dest(outputPaths.js))
      .pipe(browserSync.reload({
          stream : true
      }));

  gulp.src([inputPaths.libJs])
      .pipe(gulp.dest(outputPaths.libJs))
      .pipe(browserSync.reload({
          stream : true
      }));
});

// release images
gulp.task('dev::static', function(){
    gulp.src(inputPaths.favicon)
        .pipe(gulp.dest(outputPaths.html));

    gulp.src(inputPaths.font)
        .pipe(gulp.dest(outputPaths.font));

    gulp.src(inputPaths.img)
        .pipe(gulp.dest(outputPaths.img));

    //gulp.src('src/*.json')
    //    .pipe(concat('fileName.json'))
    //    .pipe(gulp.dest('app/guide'));
});

// gulp.task('hello', function () {
//     gulp.src(outputPaths.htmlFileName)
//         .pipe(filenamesToJson())
//         .pipe(gulp.dest(outputPaths.json));
//
// });

// gulp.task('hello', function() {
//     console.log(inputPaths.html);
// });


gulp.task('dev::browserSync', ['dev::html', 'dev::css', 'dev::js', 'dev::static'], function(){
    return browserSync.init({
        port : 8080,
        server: {
            baseDir: './app'
        }
    });
});

// watch
gulp.task('dev::watch', function() {
    gulp.watch('*');
    gulp.watch(watchPaths.html, ['dev::html'])
    gulp.watch(watchPaths.css, ['dev::css'])
    gulp.watch(watchPaths.js, ['dev::js'])
    gulp.watch(watchPaths.img, ['dev::static'])
    gulp.watch(watchPaths.fonts, ['dev::static'])
});


gulp.task('default', ['dev::browserSync', 'dev::watch']);
