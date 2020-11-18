device.vibrate(1000); 
toast("Hello, test");
log('start');
console.show();
text("消息");
log('1111');

text("消息").findOne();
log('222');
text("消息").findOne(3000);
log('333');


exit();
//app.launchApp("企业微信");
for(var i=0; i<30;i++){
	sleep(1000);
	recents();
	sleep(1000);
	app.launchApp("企业微信");
	log('test-2: '+i);
}
	
 