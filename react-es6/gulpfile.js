var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var config = require("./gulp.config.js")();

function copy(settings) {
	return gulp.src(settings.from)
		.pipe(gulp.dest(settings.to))
		.pipe(connect.reload());
}

gulp.task("browserify", function() {
	return browserify(config.source + "jsx/index.jsx")
		.transform("babelify", {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.build + "js/"))
		.pipe(connect.reload());
});

gulp.task("copy", function() {
	
	// Copy all HTML files
	copy({
		from: config.source + "*.html",
		to: config.build
	});

	// Copy all Images files
	copy({
		from: config.source + "images/**/*",
		to: config.build + "images/"
	});
});

gulp.task("sass", function() {
	var options = {
		outputStyle: "compressed"
	}
	return gulp.src(config.source + "scss/style.scss")
		.pipe(sass(options))
		.pipe(gulp.dest(config.build + "css/"))
		.pipe(connect.reload());
});

gulp.task("watch", ["sass", "copy", "browserify"], function() {
	gulp.watch(config.source + "scss/**/*", ["sass"]);
	gulp.watch([config.source + "images/**/*", ".src/*.html"], ["copy"]);
	gulp.watch(config.source + "jsx/**/*", ["browserify"]);
});

gulp.task("connect", function() {
	connect.server({
		root: "build",
		livereload: true
	})
})

gulp.task("default", ["connect", "watch"]);