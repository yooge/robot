

var data = function() {
	/*setTimeout(() => {
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			this.version_code = wgtinfo.version;
		});
		version.remoteVersion().then((manifest) => {
			if (this.version_code != manifest.version.name) {
				this.has_patch = true;
			}
		});
		// #endif 
	}, 200);
		*/
	   var userInfo = null;// User.info();
	

	return {
		loginModal: false,
		'loginText': '登陆中...',
		version_code: '-.-.-',
		has_patch: false,
		userInfo: userInfo,
		// userInfo: { //个人资料
		// 	'name': '王迪',
		// 	'department': '大健康/美容巴',
		// 	'avatar': '../../static/dulin/head.jpg',
		// 	'userid': '11111999999999909999911'
		// },
		cuIconList: [{
			cuIcon: 'cardboardfill',
			color: 'red',
			badge: 120,
			name: '绩效'
		}, {
			cuIcon: 'upstagefill',
			color: 'cyan',
			badge: 0,
			name: '排行榜'
		}, {
			cuIcon: 'group',
			color: 'orange',
			badge: 1,
			name: '团队'
		}, {
			cuIcon: 'picfill',
			color: 'yellow',
			badge: 0,
			name: '学习'
		}, {
			cuIcon: 'noticefill',
			color: 'olive',
			badge: 22,
			name: '通知'
		}, {
			cuIcon: 'clothesfill',
			color: 'blue',
			badge: 0,
			name: '内购'
		}, {
			cuIcon: 'discoverfill',
			color: 'purple',
			badge: 0,
			name: '发现'
		}, {
			cuIcon: 'questionfill',
			color: 'mauve',
			badge: 0,
			name: '帮助'
		}, {
			cuIcon: 'commandfill',
			color: 'purple',
			badge: 0,
			name: '问答'
		}, {
			cuIcon: 'brandfill',
			color: 'mauve',
			badge: 0,
			name: '版权'
		}],
		'nullhead': '../../static/dulin/head.jpg',
		index: 0,
		modalName: null,
		gridCol: 3,
		gridBorder: false,
		menuBorder: true,
		menuArrow: true,
		menuCard: true,
		skin: false,
		listTouchStart: 0,
		listTouchDirection: null,
	};
};
var methods = {
	showModal(e) {
		this.modalName = e.currentTarget.dataset.target
	},
	hideModal(e) {
		this.modalName = null
	},
	Gridchange(e) {
		this.gridCol = e.detail.value
	},
	Gridswitch(e) {
		this.gridBorder = e.detail.value
	},
	MenuBorder(e) {
		this.menuBorder = e.detail.value
	},
	MenuArrow(e) {
		this.menuArrow = e.detail.value
	},
	MenuCard(e) {
		this.menuCard = e.detail.value
	},
	SwitchSex(e) {
		this.skin = e.detail.value
	},

	// ListTouch触摸开始
	ListTouchStart(e) {
		this.listTouchStart = e.touches[0].pageX
	},

	// ListTouch计算方向
	ListTouchMove(e) {
		this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
	},

	// ListTouch计算滚动
	ListTouchEnd(e) {
		if (this.listTouchDirection == 'left') {
			this.modalName = e.currentTarget.dataset.target
		} else {
			this.modalName = null
		}
		this.listTouchDirection = null
	}
};
methods.login = function() {
	console.log("login--->");
	this.loginModal = true;
	this.loginText = '登录中..';
	var that = this;
	var info = User.info();
	if (info == undefined || !info) {
		User.login((userInfo) => { //登录
			if (userInfo == undefined) {
				uni.showModal({
					title: '提示',
					content: '获取用户资料失败'
				});
			} else {
				this.userInfo = userInfo;
			}
			this.loginModal = false;
		});
	} else {
		this.loginModal = false;
		this.userInfo = info;
	}


};
methods.logout = function() {
	var that = this;
	uni.showModal({
		title: '提示',
		content: '确认退出登陆？',
		success: function(res) {
			if (res.confirm) {
				User.logout();
				that.userInfo = null;
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
};

methods.upgrade = function() {
	this.loginModal = true;
	this.loginText = '升级中..';
	version.upgrade((status) => {
		this.loginModal = false;
		if (status != 'ok') uni.showToast({
			title: '完成，无更新',
			icon: 'none',
			duration: 3000
		});
	});
	[]

}
export default {
	data,
	onLoad: function() {
		console.log("onLoad--->");
		//this.login();
	},
	onLaunch: function() {
		// console.log("onLaunch--->");
		// var info = User.info();
		// if (info != undefined && info != null) {
		// 	this.userInfo = info;
		// }
	},
	methods

};
