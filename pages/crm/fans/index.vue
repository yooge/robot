<template>
	<view id="addFansPage">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" class="return-bar">
			<block slot="backText">返回</block>
			<block slot="content">加粉管理</block>
		</cu-custom>
		<view class="nav-list-fans">
			<navigator hover-class="none" url="" class="list-fans-small" navigateTo>
				<view class="icon icon1"></view>
				<view class="nav-num">{{addFansData.wx_friend_num}}</view>
				<view class="nav-names">好友加粉</view>
			</navigator>
			<navigator hover-class="none" url="" class="list-fans-big" navigateTo>
				<view class="icon icon2"></view>
				<view class="nav-num">{{addFansData.total}}</view>
				<view class="nav-names">加粉总量</view>
			</navigator>
			<navigator hover-class="none" url="" class="list-fans-small bg-color" navigateTo>
				<view class="icon icon3"></view>
				<view class="nav-num">{{addFansData.order_friend_num}}</view>
				<view class="nav-names">订单加粉</view>
			</navigator>
		</view>
		<view class="today-task-tit">
			<text class="today-task-txt">今日任务</text>
			<text class="cuIcon-title text-success"></text><text class="status-name">成功</text>
			<text class="cuIcon-title text-failed"></text><text class="status-name">失败</text>
			<text class="cuIcon-title text-unknow"></text><text class="status-name">未知</text>
		</view>
		<view class="add-fan-task">
			<view class="add-fans-box">
				<view class="flex  padding  justify-between bg-white">
					<view class="tit-text">
						<text class="cuIcon-group text-blue icon4"></text>
						<text>好友加粉:</text>
						<text class="add-fans-num">{{addWxFansData.addedFasNum}}/{{addWxFansData.total}}个</text>
					</view>
					<button class="cu-btn" v-if="addWxFansData.show" @click.stop="doWxAddFans(addWxFansData.isAdding)" :class="[!addWxFansData.isAdding?'bg-blue':'bg-red']">{{!addWxFansData.isAdding?'启动':'停止'}}
					</button>
				</view>
				<view class="padding bg-white process-plus" style="padding-top: 0;">
					<view class="cu-progress radius striped  active">
						<view class="bg-success" :style="addWxFansData.progress">{{addWxFansData.progressVal}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add-fan-task">
			<view class="add-fans-box" v-for="(item,key) in addFanstask" :key="key">
				<view class="flex  padding  justify-between  bg-white">
					<view class="tit-text">
						<text class="cuIcon-cart text-orange icon4"></text>
						<text>订单加粉:</text>
						<text class="add-fans-num">{{item.success_cnt}}/{{item.all_cnt}}个</text>
					</view>
					<button class="cu-btn" v-if="item.show" @click.stop="doAddFans(item,key,'today')" :class="[item.flag==0?'bg-blue':item.flag==4?'bg-blue':'bg-red']">{{item.flag==0?'启动':item.flag==4?'启动':'停止'}}
					</button>
				</view>
				<view class="padding bg-white process-plus" style="padding-top: 0;">
					<view class="cu-progress radius striped  active">
						<view class="bg-success" :style="item.progress">{{item.progressVal}}</view>
						<view class="bg-failed" :style="item.failedprogress">{{item.failedprogressVal}}</view>
						<!-- <view class="bg-unknow" style="width:0%">0%</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="today-task-tit">
			<text class="today-task-txt">历史任务</text>
		</view>
		<view class="add-fan-task">
			<view class="add-fans-box" v-for="(item,key) in historyAddFanstask" :key="key">
				<view class="flex  padding  justify-between  bg-white">
					<view class="tit-text">
						<text class="icon4" :class="[item.type=='order'?'cuIcon-cart text-orange':'cuIcon-group text-blue']"></text>
						<text class="add-fans-time">{{item.date_str}}</text>
						<text>{{item.type=='order'?'订单':'好友'}}加粉:</text>
						<text class="add-fans-num">{{item.success_cnt}}/{{item.all_cnt}}个</text>
					</view>
					<button v-if="item.show" class="cu-btn " @click.stop="doAddFans(item,key,'history')" :class="[item.flag==0?'bg-blue':item.flag==4?'bg-blue':'bg-red']">{{item.flag==0?'启动':item.flag==4?'启动':'停止'}}
					</button>
				</view>
				<view class="padding bg-white process-plus" style="padding-top: 0;">
					<view class="cu-progress radius striped  active">
						<view class="bg-success" :style="item.progress">{{item.progressVal}}</view>
						<view class="bg-failed" :style="item.failedprogress">{{item.failedprogressVal}}</view>
						<!--<view class="bg-unknow" style="width:5%">5%</view> -->
					</view>
				</view>
			</view>
			<view class="prompt" @click="pageDataQuery">{{isNext}}</view>
		</view>
		<!-- 加粉好友招呼话术弹窗 -->
		<view class="wx-sayhi" v-if="wxHuashuModal">
			<view class="text-cyan">设置好友加粉打招呼话术</view>
			<input type="text" class="text-black" @input="sayhiVal" :value="addWxFansData.sayhi" placeholder="请输入话术" />
			<view class="btn-area">
				<button class="cu-btn bg-gray" @click.stop="cancelModal">取消</button>
				<button class="cu-btn bg-cyan" @click.stop="finishSayhi">确定</button>

			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	addFansQuery,
	// 	todayAddFansTaskQuery,
	// 	historyAddFansTaskQuery,
	// 	todayAddFansData,
	// 	addFansUpdate,
	// 	addFansTaskStatus,
	// 	addWxFansTask,
	// 	addWxFansUpdate,
	// 	queryWxFansTask
	// } from '@/common/api.js';
	// import Time from '@/common/date.js';
	
	
	 
	export default {
		data() {
			return {
				isPC: false,
				//userId: "D20145921",
				userId: uni.getStorageSync('userID'),
				addFansData: {
					order_friend_num: 0, //订单加粉数
					total: 0, //加粉总量
					wx_friend_num: 0, //好友加粉
				},
				addFanstask: [],
				historyAddFanstask: [],
				screenHeight: 0, //屏幕高度
				isLoading: false, //防止频繁触发
				bottomDistinct: 0, //滚动距离底部的距离
				page: 1,
				historyTaskDays: 5,
				isNext: '',
				hasTask: false,
				cacheName: "",
				addWxFansData: { //微信好友加粉
					taskid: "",
					total: 30, //总数
					addedFasNum: 0, //成功添加
					isAdding: false, //是否启动
					progress: 'width:0%',
					progressVal: '',
					show: true,
					sayhi: "你好，这是我的企业微信，你作为老会员，加我可以获得VIP福利"
				},
				wxHuashuModal: false,

			};
		},
		onLoad: function() {
			let that = this,
				key = new Date(Time.changeTimestamp(false)).getTime() / 1000 + "wxfans";
			this.cacheName = key;
			queryWxFansTask({
				wx_alisa: that.userId
			}).then(res => {
				console.log("====今日微信加粉任务查询===" + JSON.stringify(res))
				if (res.tag == 0 && res.data.result.length > 0) {
					let item = res.data.result[0];
					if (uni.getStorageSync(key) == "") {
						this.addWxFansData.taskid = item.id;
						this.addWxFansData.total = item.all_cnt;
						this.addWxFansData.addedFasNum = item.current_cnt;
						this.addWxFansData.progress = 'width:' + ((item.current_cnt / item.all_cnt) * 100).toFixed(2) + '%';
						if (((item.current_cnt / item.all_cnt) * 100).toFixed(2) == 0) {
							this.addWxFansData.progressVal = "";
						} else {
							this.addWxFansData.progressVal = ((item.current_cnt / item.all_cnt) * 100).toFixed(2) + '%';
						}

						if (item.current_cnt >= item.all_cnt) {
							this.addWxFansData.show = false;
							this.hasTask = false;
						}
						uni.setStorage({
							key: key,
							data: this.addWxFansData,
							success: function() {
								console.log("=======今日微信加粉任务缓存到本地====success")
							}
						});
					} else {
						this.addWxFansData = uni.getStorageSync(key);
						if (this.addWxFansData.isAdding) {
							this.hasTask = true;
						}
					}

				} else {
					addWxFansTask({
						wx_alisa: that.userId,
						flag: 0,
						count: that.addWxFansData.total,
						date_str: Time.changeTimestamp(false)
					}).then(res => {
						this.addWxFansData.taskid = res.ids[0];
						uni.setStorage({
							key: key,
							data: this.addWxFansData,
							success: function() {
								console.log("=======今日微信加粉任务创建====success")
							}
						});
					})
				}
			})
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			console.log(this.screenHeight, "屏幕高度")

			this.requestData();
			this.pageDataQuery();
		},
		methods: {
			requestData() {
				addFansQuery({
					wx_alisa: this.userId
				}).then(res => {
					console.log("====加粉数量统计===" + JSON.stringify(res))
					if (res.tag == 0) {
						this.addFansData = res.data.result;
					}
				})
				todayAddFansTaskQuery({
					wx_alisa: this.userId
				}).then(res => {
					if (res.tag == 0) {
						let param = res.data.result;
						if (param.length > 0) {
							for (let i in param) {
								/* 计算成功加粉数*/
								param[i].success_cnt = param[i].current_cnt - param[i].fail_cnt;
								/* 成功进度条 */
								let s_val = ((param[i].success_cnt / param[i].all_cnt) * 100).toFixed(2) + '%';
								param[i].progress = 'width:' + s_val;
								if (s_val == "0.00%") {
									param[i].progressVal = ""
								} else {
									param[i].progressVal = s_val
								}
								/* 失败进度条 */
								let f_val = ((param[i].fail_cnt / param[i].all_cnt) * 100).toFixed(2) + '%';
								param[i].failedprogress = 'width:' + f_val;
								if (f_val == "0.00%") {
									param[i].failedprogressVal = "";
								} else {
									param[i].failedprogressVal = f_val;
								}

								if (param[i].current_cnt >= param[i].all_cnt) {
									param[i].show = false;
								} else {
									param[i].show = true;
								}
								if (param[i].flag == 1) {
									this.hasTask = true;
								}
							}
						}
						this.addFanstask = param;
					}
					console.log("===今日加粉任务===" + JSON.stringify(res))
				})

			},
			pageDataQuery() { //历史订单加粉任务查询====分页
				if (this.isNext == '已加载全部' || this.isNext == '无历史任务加载') {
					return;
				}
				if (this.isLoading) {
					return;
				}
				this.isLoading = true;
				uni.showLoading({
					title: '加载中'
				});
				historyAddFansTaskQuery({
					wx_alisa: this.userId,
					page: this.page,
					days: this.historyTaskDays
				}).then(res => {
					setTimeout(function() {
						uni.hideLoading();
					}, 1000)
					if (res.tag == 0) {
						let param = res.data.result;
						for (let i in param) {
							/* 计算成功加粉数*/
							param[i].success_cnt = param[i].current_cnt - param[i].fail_cnt;
							/* 成功进度条 */
							let s_val = ((param[i].success_cnt / param[i].all_cnt) * 100).toFixed(2) + '%';
							param[i].progress = 'width:' + s_val;
							if (s_val == "0.00%") {
								param[i].progressVal = "";
							} else {
								param[i].progressVal = s_val;
							}

							/* 失败进度条 */
							let f_val = ((param[i].fail_cnt / param[i].all_cnt) * 100).toFixed(2) + '%';
							param[i].failedprogress = 'width:' + f_val;
							if (f_val == "0.00%") {
								param[i].failedprogressVal = "";
							} else {
								param[i].failedprogressVal = f_val;
							}

							if (param[i].flag == 1) {
								this.hasTask = true;
							}
							if (param[i].type == "order" && param[i].current_cnt < param[i].all_cnt) {
								param[i].show = true;

							} else {
								param[i].show = false;
							}
						}
						this.historyAddFanstask = this.historyAddFanstask.concat(param);
						this.isLoading = false;
						if (param.length == 0) {
							if (this.page == 1) {
								this.isNext = '无历史任务加载';
							} else {
								this.isNext = '已加载全部';
							}
						} else {
							this.isNext = '加载更多';
							this.page++;
						}
					}
					console.log("===历史加粉任务===" + JSON.stringify(res))
				})
			},
			addFansTaskStatus(data) {
				addFansTaskStatus(data).then(res => {
					console.log("===通知服务器加粉任务开始or停止====" + JSON.stringify(res))
				})
			},
			onPageScroll: function(e) {
				const {
					scrollTop //滚动条距离页面顶部的像素
				} = e;
				uni.createSelectorQuery().select('#addFansPage').boundingClientRect(data => {
					let {
						height //listArea节点的高度
					} = data;
					if (this.bottomDistinct >= height - this.screenHeight - scrollTop) {
						//阻止事件重复触发
						this.pageDataQuery();
					}
				}).exec();
			},
			/* 订单加粉启动or停止 */
			doAddFans(params, index, type) {
				if (global.IS_H5) {
					console.log("====PC端===")
					uni.showToast({
						title: '请在手机上执行任务',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				//加粉任务的下标====index
				//type === today or history 
				if (params.flag == 0 || params.flag == 4) {
					if (this.hasTask) { //有任务在执行中……
						uni.showToast({
							title: '有任务执行中',
							icon: 'none',
							duration: 2000
						});
						return;
					}
					//启动加粉
					uni.showLoading({
						title: '启动中'
					});
					todayAddFansData({
						wx_alisa: params.wx_alisa,
						taskid: params.taskid
					}).then(res => {
						console.log("===加粉任务粉丝的手机号===" + JSON.stringify(res))
						if (res.tag == 0) {
							let item = res.data.result[0],
								data = {
									action: 'fans',
									type: 'mobile',
									data: item
								};
							robot.start(data, (e) => {
								uni.hideLoading();
								//app返回数据
								// {
								// 	alias: '张三',
								// 	status: 'start/fail/success/abort',
								// 	failmsg: '查无此人',
								// 	stranger: {
								// 		"product": "狗粮",
								// 		"city": "温州市",
								// 		"mobile": "18958985722",
								// 		"name": "胡冬华",
								// 		"unicode": "1646166",
								// 		"id": 1621,
								// 		"time": 1552013160000
								// 	}
								// }
								console.log("===订单加粉回调===" + e)
								let item = JSON.parse(e);
								if (item.status == "start") {
									if (type == "today") {
										this.addFanstask[index].flag = 1;
									} else {
										this.historyAddFanstask[index].flag = 1;
									}
									this.addFansTaskStatus({
										id: params.id,
										flag: 1
									})
									this.hasTask = true;
								} else if (item.status == "abort") { //加粉停止
									this.addFansTaskStatus({
										id: params.id,
										flag: 4
									})
									this.hasTask = false;
									if (type == "today") {
										this.addFanstask[index].flag = 4;
									} else {
										this.historyAddFanstask[index].flag = 4;
									}

								} else {
									let status = "";
									if (item.status == "success") { //加粉成功
										status = 1;
										if (type == "today") {
											this.addFanstask[index].success_cnt++;
											let s_val = ((this.addFanstask[index].success_cnt / this.addFanstask[index].all_cnt) * 100).toFixed(2) +
												'%';
											this.addFanstask[index].progress = 'width:' + s_val;
											this.addFanstask[index].progressVal = s_val;
										} else {
											this.historyAddFanstask[index].success_cnt++;
											let s_val = ((this.historyAddFanstask[index].success_cnt / this.historyAddFanstask[index].all_cnt) * 100)
												.toFixed(2) + '%'
											this.historyAddFanstask[index].progress = 'width:' + s_val;
											this.historyAddFanstask[index].progressVal = s_val;
										}
									} else if (item.status == "fail") { //加粉失败
										status = -1;
										if (type == "today") {
											this.addFanstask[index].fail_cnt++;
											let f_val = ((this.addFanstask[index].fail_cnt / this.addFanstask[index].all_cnt) * 100).toFixed(2) +
												'%';
											this.addFanstask[index].failedprogress = 'width:' + f_val;
											this.addFanstask[index].failedprogressVal = f_val;
										} else {
											this.historyAddFanstask[index].fail_cnt++;
											let f_val = ((this.historyAddFanstask[index].fail_cnt / this.historyAddFanstask[index].all_cnt) * 100).toFixed(
												2) + '%'
											this.historyAddFanstask[index].failedprogress = 'width:' + f_val;
											this.historyAddFanstask[index].failedprogressVal = f_val;
										}
									}
									//加粉完成按钮隐藏
									if (type == "today") {
										if (this.addFanstask[index].success_cnt + this.addFanstask[index].fail_cnt >= this.addFanstask[index].all_cnt) {
											this.addFanstask[index].show = false;
											this.hasTask = false;
										}
									} else {
										if (this.historyAddFanstask[index].success_cnt + this.historyAddFanstask[index].fail_cnt >= this.historyAddFanstask[
												index].all_cnt) {
											this.historyAddFanstask[index].show = false;
											this.hasTask = false;
										}
									}
									addFansUpdate({
										id: item.stranger.id,
										status: status
									}).then(res => {
										console.log("===通知服务器加粉" + status + "状态===success")
									})
								}

							});
						}
					})


				} else {
					//停止加粉
					this.addFansTaskStatus({
						id: params.id,
						flag: 4
					})
					this.hasTask = false;
					if (type == "today") {
						this.addFanstask[index].flag = 4;
					} else {
						this.historyAddFanstask[index].flag = 4;
					}
					robot.stop();
				}


			},
			/* 微信好友加粉启动 or 停止 */
			doWxAddFans(status) {
				if (global.IS_H5) {
					console.log("====PC端===")
					uni.showToast({
						title: '请在手机上执行任务',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (status) { //停止加粉
					this.hasTask = false;
					this.addWxFansData.isAdding = false;
					uni.setStorage({
						key: this.cacheName,
						data: this.addWxFansData,
						success: function() {
							console.log('====微信加粉任务修改===success');
						}
					})
					robot.stop();
				} else { //启动加粉

					if (this.hasTask) { //有任务在执行中……
						uni.showToast({
							title: '有任务执行中',
							icon: 'none',
							duration: 2000
						});
						return;
					}
					this.wxHuashuModal = true;
				}
			},
			sayhiVal(event) {
				this.addWxFansData.sayhi = event.target.value;
			},
			finishSayhi() {
				let that = this;
				this.wxHuashuModal = false;
				uni.showLoading({
					title: '启动中'
				});
				let data = {
					action: 'fans',
					type: 'wxfriends',
					number: this.addWxFansData.total - this.addWxFansData.addedFasNum,
					sayhi: this.addWxFansData.sayhi
				};
				robot.start(data, (e) => {
					uni.hideLoading();
					console.log("===好友加粉回调===" + e)
					let item = JSON.parse(e);
					if (item.status == "start") {
						this.hasTask = true;
						this.addWxFansData.isAdding = true;
						uni.setStorage({
							key: this.cacheName,
							data: this.addWxFansData,
							success: function() {
								console.log('===微信加粉任务开启===success');
							}
						})
					} else if (item.status == "abort") {
						this.hasTask = false;
						this.addWxFansData.isAdding = false;
						uni.setStorage({
							key: this.cacheName,
							data: this.addWxFansData,
							success: function() {
								console.log('===微信加粉任务中断===success');
							}
						})
					} else if (item.status == "success") {
						//上报服务器并缓存到本地
						addWxFansUpdate({
							taskid: that.addWxFansData.taskid,
							wx_alisa: that.userId,
							status: 1
						}).then(res => {
							console.log("===通知加粉状态===+1")
						})
						this.addWxFansData.addedFasNum++;
						let val = ((this.addWxFansData.addedFasNum / this.addWxFansData.total) * 100).toFixed(2) + '%';
						this.addWxFansData.progress = 'width:' + val;
						this.addWxFansData.progressVal = val;
						if (this.addWxFansData.addedFasNum >= this.addWxFansData.total) {
							this.addWxFansData.show = false;
							this.hasTask = false;
						}
						uni.setStorage({
							key: this.cacheName,
							data: this.addWxFansData
						})

					}


				});


			},
			cancelModal() {
				this.wxHuashuModal = false;
			}
		}
	}
</script>

<style lang="scss">
	@media screen and (max-width: 500px) {
		.nav-list-fans {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-flex-wrap: wrap;
			flex-wrap: wrap;
			padding: 36rpx 25rpx 50rpx;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;

			.list-fans-small {
				width: 175rpx;
				height: 260rpx;
				background: linear-gradient(90deg, rgba(25, 145, 235, 1) 0%, rgba(45, 161, 248, 1) 100%);
				border-radius: 8px;
				padding-top: 60rpx;

			}

			.bg-color {
				background: linear-gradient(221deg, rgba(255, 139, 42, 1) 0%, rgba(255, 95, 107, 1) 100%);
			}

			.list-fans-big {
				flex: 1;
				margin: 0 22rpx;
				height: 260rpx;
				background: linear-gradient(47deg, rgba(37, 132, 255, 1) 0%, rgba(142, 93, 244, 1) 100%, rgba(145, 92, 244, 1) 100%);
				border-radius: 8px;
				padding-top: 60rpx;
			}

			.icon {
				width: 48rpx;
				height: 48rpx;
				margin: 0 auto;
			}

			.icon1 {
				background: url(../../../static/images/addFans1-1.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon2 {

				background: url(../../../static/images/addFans2-1.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon3 {
				background: url(../../../static/images/addFans3-1.png) no-repeat;
				background-size: 100% 100%;
			}

			.nav-num {
				text-align: center;
				font-size: 36rpx;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin: 10rpx auto;
			}

			.nav-names {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}

		}

		.today-task-tit {
			padding-left: 25rpx;

			.today-task-txt {
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
			}

			.cuIcon-title {
				margin-left: 10rpx;
			}

			.text-success {
				color: #36E08E;
			}

			.text-failed {
				color: #FC6C28;
			}

			.text-unknow {
				color: #1B98F9;
			}

			.status-name {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		.add-fan-task {
			padding: 0 25rpx;
			margin-top: 26rpx;

			.icon4 {
				font-size: 36rpx;
				margin-right: 6px;
			}

			.add-fans-box {
				width: 100%;
				height: 190rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 4px;
				border: 1px solid rgba(234, 237, 243, 1);
				margin-bottom: 20rpx;

				.tit-text {
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 60rpx;

					.add-fans-time {
						margin-right: 10rpx;
						color: #999999;
					}

					.add-fans-num {
						color: #FF685C;
						margin-left: 10rpx;
					}

				}

				.cu-progress {
					height: 20rpx;
					border-radius: 10rpx;
				}

				.bg-success {
					background-color: #36E08E;
				}

				.bg-failed {
					background-color: #FC6C28;
				}

				.bg-unknow {
					background-color: #1B98F9;
				}
			}

			.prompt {
				text-align: center;
				line-height: 60rpx;
				margin-bottom: 20rpx;
			}
		}

		.wx-sayhi {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 140upx;
			left: 0;
			margin: auto;
			width: 650rpx;
			height: 300upx;
			background-color: #ffffff;
			border-radius: 10upx;
			box-shadow: 0 0 0upx 2000upx rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-size: 28upx;
			z-index: 9999;
			line-height: 2.4em;

			input {
				width: 90%;
				height: 36px;
				border: 1px solid #ccc;
				border-radius: 4px;
				padding: 0 10px;
				font-size: 14px;
			}

			.btn-area {
				margin-top: 20px;

				button {
					margin: 0 20px;
				}
			}
		}
	}

	@media screen and (min-width: 500px) {
		.return-bar {
			display: none;
		}

		.nav-list-fans {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-flex-wrap: wrap;
			flex-wrap: wrap;
			padding: 36px 25px;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;

			.list-fans-small {
				width: 30%;
				height: 160px;
				background: linear-gradient(90deg, rgba(25, 145, 235, 1) 0%, rgba(45, 161, 248, 1) 100%);
				border-radius: 8px;
				padding-top: 30px;

			}

			.bg-color {
				background: linear-gradient(221deg, rgba(255, 139, 42, 1) 0%, rgba(255, 95, 107, 1) 100%);
			}

			.list-fans-big {
				flex: 1;
				margin: 0 22px;
				height: 160px;
				background: linear-gradient(47deg, rgba(37, 132, 255, 1) 0%, rgba(142, 93, 244, 1) 100%, rgba(145, 92, 244, 1) 100%);
				border-radius: 8px;
				padding-top: 30px;
			}

			.icon {
				width: 30px;
				height: 30px;
				margin: 0 auto;
			}

			.icon1 {
				background: url(../../../static/images/addFans1-1.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon2 {

				background: url(../../../static/images/addFans2-1.png) no-repeat;
				background-size: 100% 100%;
			}

			.icon3 {
				background: url(../../../static/images/addFans3-1.png) no-repeat;
				background-size: 100% 100%;
			}

			.nav-num {
				text-align: center;
				font-size: 28px;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin: 10px auto;
			}

			.nav-names {
				font-size: 20px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}

		}

		.today-task-tit {
			padding-left: 25px;

			.today-task-txt {
				font-size: 22px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
			}

			.cuIcon-title {
				font-size: 18px;
				margin-left: 10px;
			}

			.text-success {
				color: #36E08E;
			}

			.text-failed {
				color: #FC6C28;
			}

			.text-unknow {
				color: #1B98F9;
			}

			.status-name {
				font-size: 18px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		.add-fan-task {
			padding: 0 25px;
			margin-top: 20px;

			.icon4 {
				font-size: 20px;
				margin-right: 6px;
			}

			.add-fans-box {
				width: 100%;
				background: rgba(255, 255, 255, 1);
				border-radius: 4px;
				border: 1px solid rgba(234, 237, 243, 1);
				margin-bottom: 20px;

				.tit-text {
					font-size: 20px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 60px;

					.add-fans-time {
						margin-right: 10px;
						color: #999999;
					}

					.add-fans-num {
						color: #FF685C;
						margin-left: 10px;
					}

				}

				.cu-progress {
					height: 16px;
					border-radius: 10px;
				}

				.bg-success {
					background-color: #36E08E;
				}

				.bg-failed {
					background-color: #FC6C28;
				}

				.bg-unknow {
					background-color: #1B98F9;
				}
			}

			.prompt {
				text-align: center;
				line-height: 60px;
				margin-bottom: 20px;
				font-size: 20px;
			}
		}

		/* ===============main.css摘取=========== */
		.cu-btn {
			font-size: 20px;
			height: 40px;
			padding: 0 15px;
			margin-top: 10px;
		}

		.padding {
			padding: 20px;
		}

		.process-plus {
			font-size: 0;
		}

		.cu-progress uni-view {
			font-size: 14px;
		}

		.wx-sayhi {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 140px;
			left: 0;
			margin: auto;
			width: 650px;
			height: 300px;
			background-color: #ffffff;
			border-radius: 10px;
			box-shadow: 0 0 0upx 2000px rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-size: 28px;
			z-index: 9999;
			line-height: 2.4em;

			input {
				width: 90%;
				height: 36px;
				border: 1px solid #ccc;
				border-radius: 4px;
				padding: 0 10px;
				font-size: 14px;
			}

			.btn-area {
				margin-top: 20px;

				button {
					margin: 0 20px;
				}
			}
		}
	}
</style>
