//这个为机器人脚本保留入口， 不建议修改

global.args = JSON.parse(app.arguments);

var fname = args._entry;
console.log('>>>>');
if (fname) {
	require('./' + fname + '.js');
}
