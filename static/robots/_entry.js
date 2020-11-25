//这个为机器人脚本保留入口， 不建议修改
// app.args; vue发过来的参数 

var fname = app.args._entry;
console.log('>>>>');
if (fname) {
	require('./' + fname + '.js');
}
