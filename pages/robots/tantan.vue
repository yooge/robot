<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">探探刷美女</block>
		</cu-custom>
		<form>
			 <view class="padding flex flex-direction">
			 		<button class="cu-btn bg-mauve shadow margin-tb-sm lg"  @click="playvideos">  -- OK -- </button>
			 		<text class="text-gray padding-right-xl" > . </text>
			 </view>			 
		</form>
		 
	</view>
	
</template>

<script>

	var {robot} = require('robot-tools');
	
	export default {
		methods: {
			playvideos() {
				 robot.stop();  
				 var param = { 
					 file: 'robot.tantan.js', 
					 onMessage:function(res){}
				 }
				 console.log("start"); 
				 robot.stop();
				 robot.start(param);
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
