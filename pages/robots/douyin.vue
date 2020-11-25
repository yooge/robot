<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">抖音</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">点赞概率</view>
				<input placeholder="-1表示全部" name="input"  v-model="zanMax"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">评论内容</view>
				<input placeholder="{name}几个字" name="input" v-model="comment"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">观看时长</view>
				<input placeholder="2" name="input"  v-model="interval"></input>(秒/随机)
			</view>
			<view class="cu-form-group ">
				<view class="title">观看量</view>
				<input placeholder="100" name="max"  v-model="max"></input>
			</view>
			 <view class="cu-form-group">
				Log: {{state.msg}}
			 </view>
			<view class="cu-form-group">
				<button class='cu-btn bg-mauve shadow lg' @click="start">在播放页面启动机器人</button>
				<button class='cu-btn bg-mauve shadow lg' @click="stop">停止</button>
			</view>
			 <view class="padding flex flex-direction">
			 	<button class="cu-btn bg-mauve shadow margin-tb-sm lg"  @click="startNow"> 直接启动 </button> 
			 </view>
			 
			<view class="padding">
				本页功能的代码: <br>
			 	[ui]: pages/robots/douyin.vue <br>
				[script]: static/robots/robot.douyin.js
			</view>
			 
		</form>
		 
	</view>
	
</template>

<script>

	var {robot} = require('robot-tools');
	
	export default {
		data() {
			return {
				state: {msg:''},
				zanMax: 5,
				comment:'不错哟',
				interval:2,
				max:100
			};
		},
		methods: {
			startNow() { 
				var param = { 
					vue: this, //可选,你也可以传别的对象，或者不传
					file: 'robot.douyin.js',
					arguments: {
						max: this.max	 
					}
				} 
				robot.stop();
				robot.start(param); 
			},
			start() { 
				var data = {
					max: this.max	 
				}; 
				var param = { 
					file: 'robot.douyin.js',
					arguments:data,
					onMessage:function(res){}
				}
				console.log("start At menu");
				robot.stop();
				robot.showMenu(param); 
			},
			stop() {
				 robot.stop();
			} 
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	 
</style>
