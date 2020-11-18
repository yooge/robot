<script>
	global.MINI_UI_CLEAR = true; //最小的UI，去掉了乱七八糟的功能
	global.userLogin_done = false;
	
	global.IS_H5 = false;

	// #ifndef APP-PLUS
	global.IS_H5 = true;
	
	//#endif
	console.log('global.IS_H5= ' + global.IS_H5);

	//var User = require('@/common/user.js');
	
	
	export default {
		onLaunch: function() {
			//robot.permission();
			//User.login();
			require('app.style.js');
			

			
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'common/css/common.css';
    @import 'common/css/nav.css';
	
</style>
