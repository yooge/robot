<template name="my">
	<scroll-view id="mine">
		<view class="cu-load load-modal" v-if="loginModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">{{loginText}}</view>
		</view>
		<div class="vbox">
			<image class="top_back_img" src="../../static/dulin/set-top-bg.png" mode="aspectFit"></image>
			<view class="top">
				<view class="circle">
					<image class="head" :src="userInfo?userInfo.avatar: nullhead " mode="widthFix"></image>
				</view>
				<view class="top-texts" v-if="userInfo">
					<text class="name">{{userInfo.name}}</text>
					<image class="set-top-hr" src="../../static/dulin/set-top-hr.png" mode=""></image>
					<text class="depart">{{userInfo.department}}</text>
					<view>
						<text>账号：</text>
						<text class='userid'>{{userInfo.userid}}</text>
					</view>
				</view>
				<button v-if="!userInfo" class="cu-btn bg-white shadow margin-left"  @click="login">点击登录</button>
			</view>

			<!-- 中间部分 -->
			<view   class="middle shadow gray-delete">
				<view class="middle-left">
					<image class="middle-icon" src="../../static/dulin/cust.png"></image>
					<text>客户数：</text>
					<text class="middle-num">保密</text>
				</view>
				<view class="middle-line"></view>
				<view class="middle-right">
					<image class="middle-icon" src="../../static/dulin/loan.png"></image>
					<text>实时工资：</text>
					<text class="middle-num">¥保密(今天)</text>
				</view>
			</view>
		</div>
		<DIV >
			<!-- 九宫格开始 -->
			<div    class='  ' desc='九宫格列表'>
				<view class="cu-bar bg-white solid-bottom margin-top">
					<view class="action">
						<text class="cuIcon-title text-orange "></text>
						工作能力
					</view>
					<view v-if='0' class="action" >
						<button class="cu-btn  " @tap="showModal" data-target="gridModal">设置zhn</button>
					</view>
				</view>
				<view class="cu-modal" :class="modalName == 'gridModal' ? 'show' : ''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop>
						<radio-group class="block" @change="Gridchange">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item, index) in 3" :key="index">
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">{{ index + 3 }} 列</view>
										<radio class="round" :value="index + 3 + ''" :class="gridCol == index + 3 ? 'checked' : ''" :checked="gridCol == index + 3"></radio>
									</label>
								</view>
							</view>
						</radio-group>
						<view class="cu-list menu text-left solid-top">
							<view class="cu-item">
								<view class="content"><text class="text-grey">边框</text></view>
								<view class="action"><switch @change="Gridswitch" :class="gridBorder ? 'checked' : ''" :checked="gridBorder ? true : false"></switch></view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
					<view class="cu-item" v-for="(item, index) in cuIconList" :key="index" v-if="index < gridCol * 2">
						<view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge != 0">
								<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
							</view>
						</view>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</div>
		    <!-- 九宫格结束 -->
			
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>
					软件功能
				</view>
				<view v-if='0'  class="action">
					<button class="cu-btn" @tap="showModal" data-target="menuModal">设置</button>
				</view>
			</view>
			<view class="cu-modal" :class="modalName == 'menuModal' ? 'show' : ''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop>
					<view class="cu-list menu text-left solid-top">
						<view class="cu-item">
							<view class="content"><text class="text-grey">短边框</text></view>
							<view class="action"><switch @change="MenuBorder" :class="menuBorder ? 'checked' : ''" :checked="menuBorder ? true : false"></switch></view>
						</view>
						<view class="cu-item">
							<view class="content"><text class="text-grey">箭头</text></view>
							<view class="action"><switch @change="MenuArrow" :class="menuArrow ? 'checked' : ''" :checked="menuArrow ? true : false"></switch></view>
						</view>
						<view class="cu-item">
							<view class="content"><text class="text-grey">卡片</text></view>
							<view class="action"><switch @change="MenuCard" :class="menuCard ? 'checked' : ''" :checked="menuCard ? true : false"></switch></view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" :class="[menuBorder ? 'sm-border' : '', menuCard ? 'card-menu margin-top' : '']">
				<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<navigator class="content" hover-class="none" url="../my/developer/index"  >
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">开发者入口</text>
					</navigator>
				</view>
				
				<view    class="cu-item gray-delete" :class="menuArrow ? 'arrow' : ''">
					<navigator class="content" hover-class="none" url="../my/appstore/index"  >
						
						<text class="cuIcon-circlefill  text-gray xxxxx-text-mauve"></text>
						<text class="text-grey">功能列表</text>
					</navigator>
				</view>
				<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<view class="content" @click="upgrade">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">检查升级 {{version_code}}</text>
				        <text class="cu-tag radius sm bg-red" v-if="has_patch" >new</text>
					     
					</view>
				</view> 
				<view     class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-gray  xxxxx-text-olive"></text>
						<text class="text-grey">实验室</text>
					</button>
				</view>
				
				<view   class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<view class="content">
						<text class="cuIcon-emojiflashfill text-gray  xxxxx-text-pink"></text>
						<text class="text-grey">分享赚钱</text>
					</view>
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
						</view>
						<text class="text-grey text-sm">4 人</text>
					</view>
				</view>
			<!--  先留你在这里
			    <view class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
						<text class="text-grey">按钮</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow">
							<text class="cuIcon-upload"></text>
							上传
						</button>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">标签</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">文本</text>
					</view>
					<view class="action"><text class="text-grey text-sm">小目标还没有实现！</text></view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-clothesfill text-blue margin-right-xs"></text>
							多行Item
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>
							小目标还没有实现！
						</view>
					</view>
					<view class="action"><switch class="switch-sex" @change="SwitchSex" :class="skin ? 'checked' : ''" :checked="skin ? true : false"></switch></view>
				</view>
				
				 -->
			</view>
 

			<!-- 退出登录 -->
			<view class="logout">
				<button type="warn" @click="logout">退出登录</button>
			</view>
		</div>
	</scroll-view>
</template>

<script src='./my.js'></script>

<style scoped src="./my.css">
