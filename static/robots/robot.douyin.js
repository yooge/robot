auto();
launchApp("抖音"); //请手动打开试试
sleep(3000);


var Max = 10;
for (var i = 0; i < Max; i++) {
	swipeUp();
	
	sleep(2000);
	if(text('点击进入直播间').exists()){
		continue;
	}
	like();
	sleep(2000);
	comment();
	sleep(2000);
}

//点赞
function like() {
	var likeBtn = inScreenOne(descContains('喜欢'));
	if (!likeBtn) return false;
	click(likeBtn);
	return true;
}
//评论
function comment() {
	var commentBtn = inScreenOne(descContains('评论'));
	if (!commentBtn) return false;

	click(commentBtn, function() {
		sleep(1000);
		setText('不错哟'); //留下你的精彩评论吧
		sleep(500);
		var face = desc('表情').findOne();
		if (face != null) {
			var x = face.bounds().right + 50;
			var y = face.bounds().top + 50;
			click(x, y);
		}
		sleep(1000);
	});

}
