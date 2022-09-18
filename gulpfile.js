//CONFIGURED: DO NOT TOUCH.

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

//compile scss into css
function style() {
  //where is the scss file
  return (
    gulp
      .src("./src/**/*.scss")
      //pass that file through sass compiler
      .pipe(sass().on('error', sass.logError))
      //where do i want to save the compiled CSS?
      .pipe(gulp.dest("./src/css"))
      //stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./src/sass/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./src/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
