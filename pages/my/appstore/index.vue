<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">功能中心</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				功能列表
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar   lg" style="background-image:url(https://img.tukuppt.com//png_preview/00/03/79/7XcgPbiNM2.jpg!/fw/180);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">抢红包助手</view>
						<view class="cu-tag round bg-green sm">免费</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							自动帮你抢红包，不要谢谢我哦
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22520人</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://img.tukuppt.com//png_preview/00/03/94/unODLgaGrH.jpg!/fw/180);">
					<view class="cu-tag badge">99+</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">朋友圈助手</view>
						<view class="cu-tag round bg-green sm">免费</view>
					</view>
					<view class="text-gray text-sm flex"><view class="text-cut">朋友圈全自动点赞，评论，回复</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">20746人</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>
			<view class="cu-item ">
				<view class="cu-avatar round lg" style="background-image:url(https://img.tukuppt.com//png_preview/00/13/58/Bh13nRtMLh.jpg!/fw/180);"></view>
				<view class="content">
					<view class="text-grey"><view class="text-cut">群聊天机器人</view></view>
					<view class="text-gray text-sm flex"><view class="text-cut">人工智能，群内活跃，知识百科，僚机神奇</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">18764人</view>
					<view class="cu-tag round  sm">5</view>
				</view>
			</view>
			<view class="cu-item  ">
				<view class="cu-avatar round lg" style="background-image:url(https://img.tukuppt.com//png_preview/00/26/73/NgpmXyQV7G.jpg!/fw/180);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">消息群发</view>
						<!-- <view class="cu-tag round bg-orange sm hide">断开连接...</view> -->
					</view>
					<view class="text-gray text-sm flex"><view class="text-cut">等我回来一个打十个</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">15620人</view>
					<view class="cu-tag round sm">5</view>
				</view>
			</view>
			<view class="cu-item cur">
				<view class="cu-avatar round lg" style="background-image:url('https://5b0988e595225.cdn.sohucs.com/images/20170905/70cd2f2f70c94707bb8f7c68bb987715.jpeg');">
					<view class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">支付宝-蚂蚁森林能量收集</view>
						<!-- <view class="cu-tag round bg-orange sm hide">6人</view> -->
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							环保，我最积极..
							<text class="cuIcon-locationfill text-orange margin-right-xs"></text>
							还能偷...
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">10043人</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
