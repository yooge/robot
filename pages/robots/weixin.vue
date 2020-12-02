<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">点赞评论/朋友圈</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">点赞率</view>
				<input placeholder="-1表示全部" name="input"  v-model="zanMax"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">评论内容</view>
				<input placeholder="{name}几个字" name="input" v-model="comment"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">时间间隔</view>
				<input placeholder="2" name="input"  v-model="interval"></input>(秒)
			</view>
			 <view class="cu-form-group ">
			 	<view class="title">阅读量</view>
			 	<input placeholder="100" name="max"  v-model="max"></input>
			 </view>
			<view class="cu-form-group">
				<button class='cu-btn bg-green shadow' @click="start">  启动 </button>
				<button class='cu-btn bg-green shadow' @click="stop">停止</button>
			</view>
			 <view class="padding flex flex-direction">
			 	<button class="cu-btn bg-green shadow margin-tb-sm lg"  @click="start"> 启动朋友圈骚扰 </button>
			 	<button class='cu-btn bg-green shadow' @click="stop">停止</button>
			 </view>
			 
			 <view class="padding">
				本页功能的代码: <br>
			  	[ui]: pages/robots/weixin.vue <br>
			 	[script]: static/robots/robot.weixin.js
			 </view>
		</form>
		<view class="align-bottom">
			<navigator url="../index-ui/index"> 
			   <button class='cu-btn bg-gray shadow margin'>UI教程</button>
			</navigator> 
			<navigator url="../my/developer/robot"> 
			   <button class='cu-btn bg-gray shadow'>robot教程</button>
			</navigator>
			
			
		</view>
	</view>
	
</template>

<script>

	var {robot} = require('robot-tools');
	
	export default {
		data() {
			return {
				state: {msg:''},
				zanMax: '100%',
				comment:'不错哟',
				interval:2,
				max:100
			};
		},
		methods: {
			start() {
				 robot.stop(); 
				 var param = { 
					 vue: this, //可选,你也可以传别的对象，或者不传。 用来给机器人直接访问的
					 file: 'robot.weixin.js',
					 //file: '/sdcard/demo.js',
					 //file:'https://yooge.github.io/robot/remote_script.js',
					 //arguments:{},  //如果传入了vue，则自动会取它的data数据
					 onMessage:function(res){} 
				 }
				 console.log("start"); 
				 robot.start(param);
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
	.align-bottom{position: absolute; bottom: 30px;}
</style>
