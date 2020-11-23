 
## 特性

1. 全面支持(信息量很大):  [AutoJS](https://hyb1996.github.io/AutoJs-Docs/#/), [VUE](https://cn.vuejs.org/),
[color-Ui](http://demo.color-ui.com/),
[HTML5plus](http://www.html5plus.org/doc/), 
以及一些主流App的SDK调用，
[N多接口](https://github.com/dcloudio/uni-app/tree/master/docs/api), 

2. 给AutoJS增加了一些好用的封装
3. 项目自动部署，自动升级，代码加密
4. 无目标APP限制

#### QQ群： 1037025652


## 开始
1. 下载本源码，(你也可以下载一个最简单的)

   `(参考代码: 目录 pages/robots/ 和  static/robots/)`
   
2. 用[HbuilderX](https://www.dcloud.io/hbuilderx.html) (绿色图标那个) 打开项目

3. **配置菜单：**

   a. 运行/手机或模拟器/运行基座选择/(勾选)自定义基座。
   **（如果忘记勾选，会意外安装错误的手机程序，会提示Robot对象不存在）**
   
   b. 运行/运行到终端, 依次运行这 命令 1,2
   ```js
   {
    "1.初始化/依赖包": "npm install",
    "2.更新/安装基座": "robot-tools init"
   }
   ```
4. **执行 (调试/运行)**: 

	`a. 连接手机(需ADB生效)`
	`b. 菜单：运行/手机或模拟器/选择你的手机名字`
5. **发布/升级** 

    (最终用户端手机自动升级)
    
    `(a) 发行/本地打包/生成app资源 `  
	`(b) 运行/运行到终端/发布`
    
[为啥截图经常不展示,github兄 ？]
<img src='http://robots.vnool.com:81/static/git/1.jpg'>
<img src='http://robots.vnool.com:81/static/git/3.jpg' width="300">
<img src='http://robots.vnool.com:81/static/git/6.jpg' width="300">
<img src='http://robots.vnool.com:81/static/git/5.jpg' width="300">
 
 
## 开始 ##
#### 1. 你可以直接修改本项目代码
目录 UI：pages/robots/ 和 脚本 static/robots/

#### 2. 也可以手动编写，如下
或者克隆小项目: http://稍等一下

## 从UI启动机器人

#### 【第1步】. 新建机器人脚本： 在项目路径~/static/robots下新建文件demo.js
```js
launchApp("微信"); 
click("发现"); 
click("朋友圈");
desc("评论").find()[0].click();
click("赞");
```
 

#### 【第2步】. 修改页面内容 pages/index/index.vue
```html
<template>
<view> 
	<button class="cu-btn bg-green shadow" @tap="test">启动</button>
	<button class="cu-btn bg-green shadow" @tap="stop">停止</button>
</view>
</template>
<script> 
var {robot} = require('robot-tools');
export default {
    methods: {
		test(){
			var param = { 
			   file: 'demo.js', 
			}
			robot.stop();
			robot.start(param);
		}
}
</script>
```
#### 【第3步】. 在Hbuilder中启动，菜单
`运行/手机或模拟器/选择你的手机`
(此时手机上会自动安装running这个app)，请为这个app授权”无障碍“，”悬浮窗“，”从后台启动”

.
.
.
#### 参数解释
```js
var {robot} = require('robot-tools');
var param = { 
     file: 'demo.js', //机器人脚本(static/robots/目录下)，也可以是绝对路径，或URL
     arguments: {}, //json,传递给机器人的参数
     onMessage: ()=>{} //回调函数，机器人给VUE发送消息
}
robot.start(param); 
```
#### 机器人获取VUE发过来的参数
```js
app.args //json对象
app.arguments
```
#### 机器人给VUE层发消息
```js
app.post2host("message"); //机器人用这个方法给VUE层发消息
```

#### 机器人脚本直接访问VUE页面对象
```js
app.vue  //机器人直接访问vue对应模块
app.vue.abc   //访问data里的abc变量
app.vue.abc = 999; //给data里面的abc赋值
app.vue.test() //访问methods里面的 test函数

```
#### 例index.vue
```html
<template>
<view> 
	{{abc}}
</view>
</template>
<script> 
var {robot} = require('robot-tools');
export default {
	data:{
		abc: 123
	}
    methods: {
		test(){
			console.log('call test');
		}
}
</script>
```




# AutoJs新手/老手，阅读
### 支持AutoJS的全部API， 补充了一些 
1. 启动app
```js
app.launch("企业微信");
```
## 1. 点击
```js
click全局函数[推荐] *无论元素是否有clickable属性，都会强制点击到对应的坐标上
click("按钮1");
click("赞", 0);  //点击第0个赞
```
点击文字为“按钮1”的界面元素(按钮，文字等)

```js
click("*入购物车");  //点击包含这个文字的元素

click(desc('购物车').findOne());	
click(desc('购物车'),  0);	
```
点击文字包含"入购物车"的界面元素(按钮，文字等)

```js
click(300,500); //点击坐标(300,500)


click('购物车', 10,10);  //右下角偏移 10,10
click('购物车', -10,10); //左下角
click('购物车', 10,-10); //右上角
click('购物车', -10,-10); //左上角 
click(desc('购物车'));	 //新
click(desc('购物车'), 2);	 //新
click(desc('购物车').findOne());	 //
click(desc('购物车').findOne(), -10,-10);	 //购物车的左上角 10,10点击一下 ，以购物车的左上角为参考
click(desc('购物车').findOne(), 10,10);	 //购物车的右下角 10,10点击一下 ，以购物车的 右下角为参考
click(desc('购物车'), 10,10);
text('购物车').findOne().click(); //点击购物车，此方法点击的是元素本身(如果元素只是普通文本，则会失效)
click(text('购物车').findOne()); //(推荐)点击购物车，此方法点击的是屏幕，如果自己不可点击，会把事件传递给父控件
```

#### 点击进入页面，然后再回来
* 适合多页面跳来跳去的交互场景 *
```js
click(desc('购物车'), function(){
	;;//进去页面了，干点啥
	//处理完毕后，会回到原页面
});
click('粉丝', () => { 
		var pp = desc('粉丝列表').findOne();
		var fanslist = listChildren(pp);
		dosomthing(fanslist);
	});
```

## 2. 输入
向本界面中的输入框输入文字
```js
setText("你好");
setText(0, "你好"); //第几个输入框
```

## 3. 查找控件
```js
//1. 查找界面上是否有文字为“消息”的控件，返回数组
text("消息"); 

//2. 界面上是否有控件包含“入购物车”这几个字，返回数组
text("*入购物车"); 

//3. 查找并返回一个
text("消息").findOne(); 
//4. 查找并返回一个，超时5秒
text("消息").findOne(5000);
// 是否存在
text("消息").exists();

//5. 等待界面出现“”这个字的控件，等5秒(默认20秒)
text("消息").waitFor(5000); 
waitFor("消息");
waitFor("消息", 5000);

//6. 等待这个文字消失, 默认超时20秒
waitGone("消息");
waitGone("消息", 5000);
//7. 
textEx  //是text的临时增强版
textEx("#") //查找输入框
textEx("#139101") //查找输入框，里面内容为139101
textEx("#*请输入") //查找输入框，里面内容 包含 请输入

//8.
desc("赞").findOne(); //控件的Content-Description属性
descContains("评论数").findOne(); 

//9.
//对象在屏幕内，比如查找抖音的点赞按钮时，会有两个在屏幕外。就需要这个函数来锁定
inScreen(desc('赞'))  
inScreenOne(desc('赞')) 
```
### 3.0 控件的[属性]
`** 控件有很多属性，请打印一下获取的对象看看`

### 3.1 控件的【方法】
```js
var box = desc('body').findOne();
box.click(); //点击控件
box.longClick();
box.text();  //获取控件的文本
box.setText('xxx'); //设置文本
box.bounds();  //获取控件的坐标 top, left, right, bottom
box.paste();; //粘贴 ， setClip("你好");
box.children(); //子元素的数组
listChildren(box); //新增，同上， 增加了 textAll属性，所有的子元素的文本
box.child(i); //第3个子元素
box.parent(); //父控件
box.findOne(desc("赞")); //查找子元素
box.find(desc("赞")).get(1); //查找子元素，获取第2个
box.find(desc("赞")).empty(); //是否为空
```


### 3.2 页面是否匹配某些内容

根据页面是否匹配某些内容，来判断页面功能
```js
//函数
matchContents(matchkeys);

//查找当前页面是否同时包含 这4个项(企业微信主界面)
matchContents("消息 & 通讯录 & 工作台 & *待办");
//查找当前页面是否有如下情况(企业微信搜索手机号页面)
// A. 手机号 与 输入框  B. 出现文字‘搜索’ 与输入框
matchContents("手机号 & # | *搜索 & #");
//企业微信，添加wx好友页面
matchContents("从微信好友中添加 & 已发邀请 | 从微信好友中添加 & 添加");
```

 ### 3.3 复杂的查找/等待分支
 在流程中，可能出现任意个不同界面的时候，需要进行分支切换
 
```js
//等待出现两个控件中的一个， 返回 0或1，失败返回-1；超时5秒（默认20秒）
//这个功能 主要用在一个动作后，可能出现两个窗口中的一个。
var i = either("*加为好友", "用户不存在");
var i = either("*加为好友", "用户不存在", 5000);

```
```js
//1. 等待出现多个控件中的一个， 返回 0,1,2,3，失败返回-1； 超时5秒（默认20秒）
//这个功能 主要用在比如一个点击动作后，可能出现多个窗口中的一个。
var i = appear(["*加为好友", "用户不存在", "*无权限"], 5000);

//2. 或者，返回key, 失败则返回-1
var key = appear({"ok":"*加为好友", "unexist":"用户不存在", "denial": "*无权限"}, 5000);
```

## 4. 窗口操作（设计的不好）

1. 启动app
```js
app.launch("企业微信");
```
2. 获取当前的包名
//如 com.tencent.mm
```js
currentPackage();
```

3. 等待窗口出现
```js
waitForActivity("*.launch.WwMainActivity", 4000);
//建议多使用，等待内容出现的函数 waitFor
```
4. (从深层堆栈中回退)一直点击返回键，让页面一直返回，直至遇到某窗口(有点费劲， 推荐使用click的回调功能)
```js
//参数：窗口类名/或数组，包名，超时时间，忽略其他窗口的存在；
//返回: 该类名（有点复杂，可以放弃，请参考4.2）
back2activity("*.launch.WwMainActivity");
back2activity("*.launch.WwMainActivity","com.tencent.wework");
back2activity("*.launch.WwMainActivity","com.tencent.wework", 12000);
back2activity("*.launch.WwMainActivity","com.tencent.wework", 12000, ["*.xxActivity","*.yyyActivity"]);
//也可以是数组，返回对应的类名
back2activity(["*.launch.WwMainActivity", "*.LaunchSplashActivity"]);
```
4.2 从深层堆栈中回退) 一直点击返回键，让页面一直返回，直至遇到某窗口
```js
//自动点击返回键，回调页面包含xx内容的窗口
//matchList可以为字符串，或数组， 回到包含该内容的页面，参考 matchContents函数
back2activityEx(matchList, timeout)

back2activityEx("消息 & 通讯录", 5000);
back2activityEx(["消息 & 通讯录", "已发邀请 | 添加"], 5000);
```

5. 等待窗口消失
```js
activityWaitGone("*.launch.WwMainActivity", 5000);
```
推荐使用waitGone('文字')


## 5. 按键
```js
home(); //桌面
back(); //返回
recents(); //任务列表
notifications(); //拉出通知栏
```

## 6. 其他

```js
sleep(1000);//暂停1秒

console.log("xxxxx"); //会同时打印到电脑,手机
console.show();  //打开悬浮日志窗口(日志同时会往这里输出)
console.useNew(); //使用新的模式(使下面的这些功能)
console.useNew('patchs/log_layout.xml'); //指定layout
console.log2ide("xxxx"); //仅仅显示在电脑里
console.log2app("xxxx");  //仅仅显示在手机上
console.title('修改标题内容');
console.toast('修改标题内容');
toast('修改标题内容');
console.msg('修改日志内容/覆盖');

console.resize(400, 400);  //设置日志浮窗 宽度，高度
console.resize(-1, 400);  //宽度为全屏
console.setPosition(0, 502);  //设置位置

console.window 浮窗对象 
可以控制layout中的节点,比如:
console.window.resize(400, 400)
console.window.title.setText('hello') //设置文字
console.window.myid.setTextSize(20) //设置字体大小（请在自定义layout中加入这个myid节点）
```



## 7. 手指操作
 

```js
//滑动
swipeUp() //上滑
swipeUp(800)  //800px

swipeTo('张三') //滑到某个内容
swipeTo(desc('张三')) 
swipeTo({key:'张三'}) //滑到某个内容
swipeTo({key,timeout,length,to}) //滑到某个内容

//
scrollTo('添加');
scrollUp(1)
scrollDown(0)
scrollForward()
scrollLeft()
scrollRight()

longClick(text[, i])
click(text[, i])


swipe(200, 1500, 200, 400, 500); //500毫秒
swipe(x1, y1, x2, y2, 500); //500毫秒
//连续滑动
gesture(1000, [0, 0], [500, 500], [500, 1000])
//多指连续滑动
gestures([delay1, duration1, [x1, y1], [x2, y2], ...], [delay2, duration2, [x3, y3], [x4, y4], ...], ...)

gestures([0, 500, [800, 300], [500, 1000]],
         [0, 500, [300, 1500], [500, 1000]]);
```


### 截图 (原API，没有新增，老手请请忽略)
```js

//请求
requestScreenCapture(true);
//1,截图
var img = captureScreen(); 

var color = images.pixel(img, 100, 100);
//
toast(colors.toString(color));


//2,找到红色
while(true){
    var img = captureScreen();
    var point = findColor(img, "#ff0000");
    if(point){
        toast("找到红色，坐标为(" + point.x + ", " + point.y + ")");
    }
}

//3.
//指定找色区域(400, 500),宽为300,长为200的区域，色临界值 默认4 (范围:0-255) 
var point = findColor(img, "#00ff00", {
     region: [400, 500, 300, 200],
     threshold: 4
 });
 
 //4, 根据颜色找坐标
 var p = findColorEquals(captureScreen(), "#f64d30");
 
 //5. 找图片
 var img = images.read("/sdcard/大图.png");
 var template = images.read("/sdcard/小图.png");
 var p = findImage(img, template);
 if(p){
     toast("找到啦:" + p);
 }else{
     toast("没找到");
 }
 img.recycle();
 template.recycle();
 
 //在一定范围内找
 var p = findImage(captureScreen(), template, {
     region: [0, 50],
     threshold: 0.8 //相似度,默认值0.9
 });
 
 //
 var j=findImage(img, template, {
     region: [x, y, width, height],
     threshold: 0.8 //相似度
 })
 
 //找100个给给我
 var result = images.matchTemplate(img, template, {
     region: [x, y, width, height],
	 threshold:0.8,
	 max: 100
 });
 //result.matches 
```
.
.

 
## QQ群：  1037025652
 

