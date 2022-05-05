//【重要】 本文件为系统入口文件，请问轻易修改
 
var fname = app.args._entry;
var path = './' + fname + '.js';


if (fname == '_blank') {
	// 防止它提前死掉 
	var wait4stop = setInterval(function() {
		clearInterval(wait4stop); 
	}, 2000);
}  else if (app.args._debug && !files.exists(path)) {
	//调试环境中，找不到文件
	console.log('文件找不到: ' + path);
} else if (fname) {
	require('./' + fname + '.js');
}
