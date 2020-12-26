<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">抖音</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">点赞概率</view>
				1/<input placeholder="请输入框点赞率" name="input" v-model="zanMax" />
			</view>
			<view class="cu-form-group ">
				<view class="title">评论内容</view>
				<input placeholder="{name}几个字" name="input" v-model="comment" />
			</view>
			<view class="cu-form-group ">
				<view class="title">观看时长</view>
				<input placeholder="2" name="input" v-model="interval" />
				(秒/随机)
			</view>
			<view class="cu-form-group ">
				<view class="title">观看量</view>
				<input placeholder="100" name="max" v-model="max" />
			</view>
			<view class="cu-form-group">Log: {{ state.msg }}</view>
			<view class="cu-form-group">
				<button class="cu-btn bg-cyan shadow lg" @click="start">在播放页面启动机器人</button>
				<button class="cu-btn bg-mauve shadow lg" @click="stop">停止</button>
				<button class="cu-btn bg-mauve shadow lg" @click="exec">exec</button>
			</view>
			<view class="padding flex flex-direction"><button class="cu-btn bg-mauve shadow margin-tb-sm lg" @click="startNow">直接启动</button></view>

			<view class="padding">
				本页功能的代码:
				<br />
				[ui]: pages/robots/douyin.vue
				<br />
				[script]: static/robots/robot.douyin.js
			</view>
		</form>
	</view>
</template>

<script>
var { robot } = require('robot-tools');

export default {
	data() {
		let default_val = {
			state: { msg: '' },
			zanMax: 5,
			comment: '不错哟',
			interval: 2,
			max: 100
		};
		//读取保存的数据  例子：
		var saved = uni.getStorageSync('config.douyin');
		//合并数据
		var new_val = Object.assign(default_val, saved);
		return new_val;
	},
	updated() {
		console.log('保存页面上的数据');
		uni.setStorageSync('config.douyin', this.$data);
	},
	methods: {
		startNow() {
			var param = {
				vue: this, //可选,你也可以传别的对象，或者不传。 用来给机器人直接访问的
				file: 'robot.douyin.js', //static/robots目录下， 也可以使用/sdcard/111.js, 或者http://xxxx/11.js
				arguments: {
					max: this.max
				} //如果传入了VUE，这个参数不传，则会自动使用vue的data数据作为参数
			};
			robot.stop();
			robot.start(param); //直接启动
			//autojs(param); //直接启动
		},
		exec() { 
			console.log('exec test'); 
			robot.exec(function(){
				console.log("xxxx");
				console.log('imei: '+device.getIMEI()); //autojs里面的函数
				//auto();
				//launchApp('抖音');
				
			}); 
		},
		start() {
			var param = {
				file: 'robot.douyin.js',
				arguments: {
					max: this.max
				},
				onMessage: function(res) {}
			};
			console.log('start At menu');
			robot.stop();
			robot.showMenu(param);//从菜单启动
			robot.moveMenu(100,100); //移动菜单到坐标
		},
		stop() {
			robot.stop();
		}
	}
};
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
