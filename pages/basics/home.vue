<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			<image   class="bgImg"></image> 
			
			
			<view class="flex solid-bottom padding justify-start">
				<view class="   "> 
					<a href="https://yooge.github.io/robot-docs/"
					class='cu-btn bg-gray shadow'>robot.Js文档</a>
				</view>
				<view class="  margin-left  ">
					<navigator url="../basics/design">
					 <button class='cu-btn bg-gray shadow  '>UI设计器</button>
					</navigator> 
					
				</view>
			</view>
			
			
			<view class="padding-sm bg-gray">robotJs测试</view>
			<view class="nav-list">
				
				
				<navigator hover-class="none" url="/pages/robots/weixin" class="nav-li bg-green" navigateTo
				 :style="[{animation: 'show 1.2s 1'}]"   >
					<view class="nav-title">微信(easy)</view>
					<view class="nav-name">刷朋友圈</view>
					<text class='cuIcon-weixin'></text>
				</navigator> 
				<navigator hover-class="none" url="/pages/robots/douyin" class="nav-li bg-mauve" navigateTo
				 :style="[{animation: 'show 1.2s 1'}]"   >
					<view class="nav-title">抖音(test)</view>
					<view class="nav-name">养号</view>
					<text class='cuIcon-musicfill'></text>
				</navigator> 
			</view>
			<view class="padding-sm bg-gray">样式</view>
			
			<view class="nav-list">
				
				
				<navigator hover-class="none" :url="'/pages/basics/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						cuIcon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						cuIcon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						cuIcon: 'cuIcon'
					},
					{
						title: '按钮',
						name: 'button',
						color: 'pink',
						cuIcon: 'btn'
					},
					{
						title: '标签',
						name: 'tag',
						color: 'brown',
						cuIcon: 'tagfill'
					},
					{
						title: '头像',
						name: 'avatar',
						color: 'red',
						cuIcon: 'myfill'
					},
					{
						title: '进度条',
						name: 'progress',
						color: 'orange',
						cuIcon: 'icloading'
					},
					{
						title: '边框阴影',
						name: 'shadow',
						color: 'olive',
						cuIcon: 'copy'
					},
					{
						title: '加载',
						name: 'loading',
						color: 'green',
						cuIcon: 'loading2'
					}
				],
			};
		},
		onShow() {
			console.log("success")
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.bgImg {
		width: 100%;
		height: 200px;
		background: url(../../static/BasicsBg.png) no-repeat;
		background-size: cover;
	}
</style>
