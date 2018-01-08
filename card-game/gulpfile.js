var browserSync = require("browser-sync"),
  gulp = require("gulp"),
  clean = require("gulp-clean"),
  rename = require("gulp-rename"),
  runSequence = require("run-sequence");

var paths = {
  src: "./src",
  build: "./build",
  assets: "/assets",
  css: "/css",
  js: "/js"
};

// browserSync

gulp.task("browserSync", () => {
  browserSync.init({
    server: paths.build,
    notify: false
  });
});

// clean

gulp.task('clean', () => {
  gulp.src([
    paths.build + paths.css + '/*.css',
    paths.build + paths.js + '/*.js'
  ], {
    read: false
  })
  .pipe(clean());
});

// scripts

gulp.task('scripts', () => {
  gulp.src([
    './node_modules/phaser/build/phaser.min.js',
    paths.src + paths.js + '/**/*.js'
  ])
  .pipe(gulp.dest(paths.build + paths.js));
});

// templates

gulp.task('templates', () => {
  gulp.src(paths.src + '/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch-templates', ['templates'], (done) => {
  browserSync.reload();
  done();
});

// watch

gulp.task('watch', ['browserSync'], () => {
  //gulp.watch(path.src + path.css + '/**/*.scss', ['styles']);
  gulp.watch(paths.src + paths.js + '/**/*.js', ['scripts']);
  gulp.watch(paths.src + '/**/*.html', ['templates']);
});

// build

gulp.task('build', () => {
  runSequence('clean', ['scripts'], 'templates');
});

// default

gulp.task('default', () => {
  gulp.start('watch');
});
