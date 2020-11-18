<template>
	<scroll-view>
	    <cu-custom bgColor="bg-gradual-blue" >
			<block slot="content">功能测试</block>
		</cu-custom>
		 
		<view class="cu-list menu" :class="[menuBorder ? 'sm-border' : '', menuCard ? 'card-menu margin-top' : '']">
			<view class="cu-item big" :class="menuArrow ? 'arrow' : ''">
				<navigator class="content" hover-class="none" url="../robots/weixin">
					<view class="content ">
						<text class="cuIcon-game text-mauve icon"> </text>
						<text class="text-grey">微信朋友圈</text>
					</view>
				</navigator>
			</view>
			<view class="cu-item big" :class="menuArrow ? 'arrow' : ''">
				<navigator class="content" hover-class="none" url="../robots/douyin">
					<view class="content ">
						<text class="cuIcon-cascades text-mauve icon"> </text>
						<text class="text-grey">抖音养号</text>
					</view>
				</navigator>
			</view>
			<view class="cu-item big" :class="menuArrow ? 'arrow' : ''">
				<navigator class="content" hover-class="none" url="./index">
					<view class="content ">
						<image src="/static/logo.png" class="png" mode="aspectFit" style="width: 28px;height: 28px;margin:6px"></image>
						<text class="text-grey">UI-DEMO</text>
					</view>
				</navigator>
			</view>
			
			<view class="cu-item big"  >
				<view class="content" hover-class="none"  >
					<view class="content ">
				 
				   
					</view>
				</view>
			</view>
			
			<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
				<navigator class="content" url="../my/developer/robot">
					<text class="cuIcon-discoverfill text-orange icon"></text>
					<text class="text-grey">机器人调试</text>
				</navigator>
			</view>
			<view class="cu-item  grayscale" :class="menuArrow ? 'arrow' : ''">
				<view class="content">
					<text class="cuIcon-emojiflashfill text-pink"></text>
					<text class="text-grey">我的收入</text>
				</view>
			</view>
			<view class="cu-item grayscale" :class="menuArrow ? 'arrow' : ''">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">提交应用</text>
				</view>
				<view class="action">
					<button class="cu-btn round bg-green  ">
						<text class="cuIcon-upload"></text>
						上传
					</button>
				</view>
			</view>
			<view class="cu-item grayscale" :class="menuArrow ? 'arrow' : ''">
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">开发文档</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">工具</view>
					<view class="cu-tag round bg-olive light">文档</view>
					<view class="cu-tag round bg-blue light">社区</view>
				</view>
			</view>
			<view class="cu-item grayscale" :class="menuArrow ? 'arrow' : ''">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">项目管理</text>
				</view>
				<view class="action"><text class="text-grey text-sm">小目标还没有实现！</text></view>
			</view>
			<view class="cu-item grayscale" :class="menuArrow ? 'arrow' : ''">
				<view class="content">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">检查升级</text>
				</view>
			</view>
			<view class="cu-item grayscale" :class="menuArrow ? 'arrow' : ''">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-btn text-olive"></text>
					<text class="text-grey">实验室</text>
				</button>
			</view>
			<view class="cu-item ">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-clothesfill text-blue margin-right-xs"></text>
						3分钟学会
					</view>
					<view class="text-gray text-sm">
						<text class="cuIcon-infofill margin-right-xs"></text>
						3分钟开发第一个外挂
					</view>
				</view>
				<view class="action"><switch class="switch-sex"  :class="skin ? 'checked' : ''" :checked="skin ? true : false"></switch></view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	var data = function() {
		return {
			 
			index:0,
			modalName: null,
			gridCol: 3,
			gridBorder: false,
			menuBorder: true,
			menuArrow: true,
			menuCard: true,
			skin: true,
			listTouchStart: 0,
			listTouchDirection: null,
		};
	}
	export default {
		data 
	};
	
</script>

<style>
	.big{ 
		margin-left: 0px;
		padding-left: 0px !important;
	}
	.big .icon{font-size:25px; color: #9c26b0;} 
	
</style>
