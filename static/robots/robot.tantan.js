 
console.show();
requestScreenCapture(true);

launchApp('探探'); 
 

setTimeout(function(){
while (1) {
    var path = getImage();
    var face = faceDetect(path);
	console.title(face.beauty  +'分');
    if (face.beauty < 95) {
        swipeLeft();
    } else {
        swipeRight();
    }
    //sleep(500);
}
},4000);




















function faceDetect(path) {
    sleep(500);
	return {beauty: Math.round(90+ Math.random()*10)};
	
    var url = 'http://192.168.86.145:8080/friendnews/backend/web/index.php?'
              + 'r=tools/face-detect';
    var res = http.postMultipart(url, {
        file: open(path)
    });
    console.log(res.body.string());
    return JSON.parse(res.body.string());
}

function swipeLeft() {
    swipe(500, 500, 0, 800, 500);
}

function swipeRight() {
    swipe(500, 500, 1000, 800, 500);
}

function getImage() {
    var path = "/sdcard/screencapture.png"
    
    captureScreen(path);
    return path;
}