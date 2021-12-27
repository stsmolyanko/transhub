const gulp = require("gulp");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const squoosh = require("gulp-libsquoosh");
const terser = require("gulp-terser");
const webp = require("gulp-webp");
const sync = require("browser-sync").create();



// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;



// Copy

const copy = (done) => {
  gulp.src([
    "src/fonts/*.{woff2,woff}",
    "src/css/swiper-bundle.css",
    "src/js/swiper-bundle.min.js",
    "src/js/swiper-bundle.min.js.map",
    "src/js/jquery-3.6.0.min.js",
    "src/*.ico",
    "src/manifest.webmanifest",
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;



// HTML

const html = () => {
  return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;



// Copy images

const copyImages = () => {
  return gulp.src([
    "src/img/**/*.{png,jpg,jpeg,svg}",
  ])
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;



// Optimize images

const optimizeImages = () => {
  return gulp.src([
    "src/img/**/*.{png,jpg,svg}"
  ])
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;



// Styles

const styles = () => {
  return gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;



// Scripts

const scripts = () => {
  return gulp.src([
    "src/js/*.js",
    "!src/js/swiper-bundle.min.js",
    "!src/js/jquery-3.6.0.min.js",
  ])
    .pipe(terser())
    .pipe(rename(path => ({
      dirname: path.dirname,
      basename: path.basename + ".min",
      extname: ".js"
  })))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;



// WebP

const createWebp = () => {
  return gulp.src([
    "src/img/**/*.{jpg,jpeg,png}",
    "!src/img/favicons/**/*.*"
  ])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;



// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;



// Reload

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;



// Watcher

const watcher = () => {
  gulp.watch("src/less/**/*.less", gulp.series(styles));
  gulp.watch("src/js/**/*.js", gulp.series(scripts));
  gulp.watch("src/*.html", gulp.series(html, reload));
}



// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  html,
  gulp.parallel(
    styles,
    scripts,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);

exports.build = build;



// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  html,
  gulp.parallel(
    styles,
    scripts,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
