<template>
   <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">机器人测试</block>
		</cu-custom>
 
		<button class="cu-btn bg-green shadow lg  margin" @tap="start">启动</button>
		<button class="cu-btn bg-green shadow lg" @tap="stop">停止</button>
		 <view class="cu-form-group align-start">
		 	 
		 	<textarea maxlength="-1" v-model="code" placeholder="多行文本输入框" style='height: 180px;'>

			</textarea>
		 </view>
		 
	     
</view>
</template>
 <script>
 
 	var {robot} = require('robot-tools');
 	
 	export default {
 		data(){
			return{ code: `
			var {robot} = require('robot-tools');
			 robot.stop(); 
			 var param = {
				 file: 'test.js',
				 arguments:{}, 
				 onMessage:function(res){}
			 } 
			 robot.start(param);
			 `};
		},
		onLoad(){
           // this.code =  this.$options.methods.start.toString();
		},
 		methods: { 
 			start() {
 				 robot.stop(); 
 				 
 				 var param = { 
 					 file: 'test.js', //请放置  static/robots/test.js 
 					 arguments:{}, 
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
 
<style></style>
