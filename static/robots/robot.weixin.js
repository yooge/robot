auto();
//觉得碍眼，就注释掉这几行。（悬浮半透明日志窗口） 
console.useNew();
console.show(); //日志输出到屏幕
console.title('任务：朋友圈骚扰');

launchApp("微信");
if (desc('拍照分享').findOne(3000) == null) {
	click("发现");
	click("朋友圈");
	sleep(3000);
}
console.log('进入朋友圈');

for (var i = 0; i < 10; i++) {
	click(desc("评论"));
	sleep(1000);
}
