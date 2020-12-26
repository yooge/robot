var fname = app.args._entry;
var path = './' + fname + '.js';

console.log('>>>>');
if (fname == '_blank') {
	console.log('_blank'); 
	setTimeout(() => {
		console.log('_blank done!');
	}, 60 * 60 * 1000);

} else if (!files.exists(path)) {
	console.log('文件找不到: ' + path);
} else if (fname) {
	require('./' + fname + '.js');
}
