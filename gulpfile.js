// gulpfile.js
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	spritesmith = require("gulp.spritesmith"),
	del = require("del");

// 일반 컴파일
gulp.task("sass", function() {
	return gulp
		.src("./src/scss/*.scss") // 입력 경로
		.pipe(
			sass
				.sync({
					outputStyle: "compact"
				})
				.on("error", sass.logError)
		)
		.pipe(gulp.dest("./dist/css")); // 출력 경로
});

// 런타임 중 파일 감시
gulp.task("sass:watch", function() {
	gulp.watch("./src/scss/*.scss", ["sass"]); // 입력 경로와 파일 변경 감지 시 실행할 Actions(Task Name)
});

// image sprite
gulp.task("sprite", function(done) {
	const spriteData = gulp.src("./src/img/sprites/*.png").pipe(
		spritesmith({
			imgName: "sprite.png",
			imgPath: "../img/sprites/sprite.png",
			retinaSrcFilter: "./src/img/sprites/*@2x.png",
			retinaImgName: "../img/sprites/sprite@2x.png",
			cssName: "_sprite.scss",
			padding: 4,
			algorithm: "binary-tree",
			cssVarMap: function(sprite) {
				sprite.name = "sp-" + sprite.name;
			}
		})
	);

	const imgStream = new Promise(function(resolve) {
		spriteData.img.pipe(gulp.dest("dist/img/sprites")).on("end", resolve);
	});

	const cssStream = new Promise(function(resolve) {
		spriteData.css.pipe(gulp.dest("src/scss/common")).on("end", resolve);
	});

	return Promise.all([imgStream, cssStream]);
});

// Clean Sprite
gulp.task("clean-sprite", function() {
	return del("./dist/img/sprites");
});
