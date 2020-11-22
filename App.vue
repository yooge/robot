<script>
global.IS_H5 = false;

// #ifndef APP-PLUS
global.IS_H5 = true;
//#endif

console.log('global.IS_H5= ' + global.IS_H5);
export default {
	onLaunch: function() {
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
