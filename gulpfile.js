// gulpfile.js
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	spritesmith = require("gulp.spritesmith");

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
	var spriteData = gulp.src("./src/img/sprites/*.png").pipe(
		spritesmith({
			retinaSrcFilter: "./src/img/sprites/*@2x.png",
			imgName: "../img/sprites/sprite.png",
			retinaImgName: "../img/sprites/sprite@2x.png",
			padding: 4,
			cssName: "sp_sprite.css"
		})
	);
	spriteData.img.pipe(gulp.dest("./dist/img/sprites"));
	spriteData.css.pipe(gulp.dest("./dist/css"));
	done();
});

// Clean Sprite
gulp.task("clean-sprite", function() {
	return del("./dist/img/sprites");
});
