<template name="crm">
	<view>
		<scroll-view scroll-y class="page">
			<!-- <image src="/static/BasicsBg.png" mode="widthFix" class="response"></image> -->
			<view class="bgImg">
				<view class="into-management" @click="enterManagement">系统管理</view>
			</view>
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/crm/' + item.name + '/index'" class="nav-li" navigateTo :class="'bg-' + item.color"
				 :style="[{ animation: 'show ' + ((index + 1) * 0.2 + 1) + 's 1' }]" v-for="(item, index) in elements" :key="index">
					<view class="nav-title">{{ item.title }}</view>
					<view class="nav-name">{{ item.name }}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		name: 'crm',
		data() {
			return {
				elements: [{
						title: '加粉/任务',
						name: 'fans',
						color: 'pink',
						cuIcon: 'friendadd'
					},
					{
						title: '群发/任务',
						name: 'publish',
						color: 'gray', //green',
						cuIcon: 'wifi'
					},
					{
						title: '待办/任务',
						name: 'todo',
						color: 'gray', //cyan',
						cuIcon: 'list'
					},

					{
						title: '朋友圈/任务',
						name: 'blog',
						color: 'gray', //'red',
						cuIcon: 'we'
					},
					{
						title: '下单/订单',
						name: 'shop',
						color: 'gray', //'blue',
						cuIcon: 'cart'
					},
					{
						title: '客户画像',
						name: 'group',
						color: 'gray', //'purple',
						cuIcon: 'group_fill'
					},
					{
						title: '话术管理',
						name: 'words',
						color: 'gray', //'mauve',
						cuIcon: 'comment'
					},

					{
						title: '内容/监控',
						name: 'monitor',
						color: 'gray', //'orange',
						cuIcon: 'safe'
					},
					{
						title: '维护剧本',
						name: 'script',
						color: 'gray', //'olive',
						cuIcon: 'service'
					},
					{
						title: '产品知识库',
						name: 'library',
						color: 'gray', //'brown',
						cuIcon: 'crown'
					}
				]
			};
		},
		methods: {
			enterManagement: function() {
				//TODO 进入管理后台
				location.href="http://wework.shen-x.com/admin/index.jsp?page=wkhome&firstid=462"

			},

		}
	};
</script>

<style>
	.page {
		height: 100vh;
	}

	.bgImg {
		width: 100%;
		height: 250px;
		background: url(../../static/BasicsBg.png) no-repeat;
		background-size: cover;
	}

	.into-management {
		display: none;
	}

	@media screen and (min-width: 500px) {
		.bgImg {
			width: 100%;
			height: 300px;
			background: url(../../static/BasicsBg.png) no-repeat;
			background-size: 100% 100%;
			margin-bottom: 30px;
			position: relative;
		}

		.into-management {
			display: block;
			font-size: 30px;
			color: #FFFFFF;
			position: absolute;
			top: 20px;
			right: 20px;
			cursor: pointer;
		}
		.into-management:hover{
			color: #CCE6FF;
		}

		.nav-list {
			-webkit-justify-content: flex-start;
			justify-content: flex-start;
			padding: 0 29px 0;
		}

		.nav-li {
			width: 222px;
			padding: 20px;
			border-radius: 6px;
		}

		.nav-title {
			font-size: 22px;
		}

		.nav-title::first-letter {
			font-size: 30px;
			margin-right: 0px;
		}

		.nav-name {
			font-size: 16px;
			margin-top: 10px;
		}

		.nav-name::first-letter {
			font-size: 20px;
			margin-right: 0px;
		}

		.nav-name::before {
			content: '';
			position: absolute;
			display: block;
			width: 30px;
			height: 6px;
			background: #fff;
			bottom: 0;
			right: 0;
			opacity: 0.5;
		}

		.nav-name::after {
			content: '';
			position: absolute;
			display: block;
			width: 70px;
			height: 1px;
			background: #fff;
			bottom: 0;
			right: 20px;
			opacity: 0.3;
		}

		.nav-li uni-text {
			position: absolute;
			right: 15px;
			top: 20px;
			font-size: 32px;
			width: 35px;
			height: 35px;
			text-align: center;
			line-height: 35px;
		}
	}
</style>
