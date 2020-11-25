auto();
//setScreenMetrics(1080, 1920);

//觉得碍眼，就注释掉这几行。（悬浮半透明日志窗口） 
console.useNew('patchs/log_layout.xml');
console.show(); //日志输出到屏幕
console.title('任务：朋友圈骚扰');
console.log('start');

var args = app.args;

launchApp("微信");
if (desc('拍照分享').findOne(3000) == null) {
	click("发现");
	click("朋友圈");
}

sleep(3000);
swipeUp();

for (var i = 0; i < 10; i++) {
	sleep(3000);
	doit();
	sleep(3000);
	scrollForward(); //翻页
}

function doit() {

	var Point = swipeTo(desc("评论"));

	Point.click();

	if (text("赞").findOne(1000) != null) {
		click("赞");
		sleep(2000);
		Point.click();
	}


	click("评论");
	sleep(2000);
	setText(args.comment);
	sleep(500);

	click("发送");
	log('评论了：xxxxx');

	sleep(args.interval);

}


function log(txt) {
	console.log(txt);
}
