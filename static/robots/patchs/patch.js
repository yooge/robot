//1.  获得一个listview 或 recycleview  等的子成员信息

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
String.prototype.subStrs = function(s1, s2) {
	var p1 = this.indexOf(s1);
	if (p1 < 0) return null;
	p1 += s1.length;
	var p2 = this.indexOf(s2, p1);

	return this.substring(p1, p2);
}


//查找尺寸的图片，取第一个
global.findPicture = function(ppObj, ckRect) {
	var list = findPictures(ppObj, ckRect);

	if (list && list.length > 0) {
		return list[0];
	}
	return;
}
//查找尺寸的图片
//ckRect= {w1:100}  大于100的图片
//ckRect = {w2:200} 宽度小于200的图片
//ckRect = {h1:100, h2:500} 高度在100-500之间的图片
//或者 ckRect = [w1,w2,h1,h2] 
global.findPictures = function(ppObj, ckRect) {
	var list = ppObj.find(className('ImageView'));
	return findsize(list, ckRect);
}
//从列表中，过滤出尺寸在某个范围内的对象
// ckRect  同上
global.findsize = function(list, ckRect) {
	var children = [];
	for (var i = 0; i < list.length; i++) {
		var img = list[i];
		var rect = img.bounds();
		var W = rect.width();
		var H = rect.height();

		if (sizeIn(ckRect, W, H)) {
			children.push(img);
		}

	}
	return children;
}
function sizeIn(rect, W, H) {
	if (typeof(rect) == 'number') {
		rect = {
			w1: rect
		};
		//rect.w1 = rect;
	}
	if (Array.isArray(rect)) {
		rect.w1 = rect[0];
		rect.w2 = rect[1];
		rect.h1 = rect[2];
		rect.h2 = rect[3];
	}
	if (rect.w1 == undefined) rect.w1 = -999;
	if (rect.w2 == undefined) rect.w2 = 999999;
	if (rect.h1 == undefined) rect.h1 = -999;
	if (rect.h2 == undefined) rect.h2 = 999999;

	if (W > rect.w1 && W < rect.w2 &&
		H > rect.h1 && H < rect.h2) {
		return true;
	}
	return false;

}
global.listChildren = function(pp, tmp) {

	var len = pp.childCount();
	var data = []
	for (var i = 0; i < len; i++) {
		var cc = pp.child(i);
		if (!cc) continue;
		var d = loopElementsText(cc, true); //只要文字，不要结构
		var info = {};
		info.element = cc;
		info.textAll = listDataFormat(d); //节点内的所有文字
		data.push(info);
	}
	return data;
}

function listDataFormat(data, tmp) {
	if (!data) return null;
	var list = data.split(',');
	return list;
}
global.alltext = function(cc) {
	//console.log(cc);
	return loopElementsText(cc, true);
}
global.loopElementsText = function(pp, onlyText) {
	if (!pp) return;
	if (onlyText == undefined) onlyText = false;

	var len = pp.childCount();
	if (len == 0) {
		if (pp.text()) {
			return pp.text();
		} else {
			return null;
		}
	}
	var data = {};
	if (onlyText) data = '';
	var hasMax = false;
	var id = 0;
	for (var i = 0; i < len; i++) {
		var cc = pp.child(i);
		if (!cc) continue;
		id = simpleId(cc.id());
		if (!id) id = 'id_' + i;

		if (cc.childCount() == 0) {
			var txt = cc.text();
			if (txt && txt != '') {
				if (onlyText) data += txt + ',';
				else data[id] = txt;
				//console.log('--->' + txt);
			}
		} else {
			// console.log(cc);
			var d = global.loopElementsText(cc, onlyText);

			if (onlyText) {
				if (d && d != '') {
					data += d + ','
					//console.log('--->' + d);
				}
			} else {
				if (d && Object.keys(d).length > 0) {
					data[id] = d;
				}
			}
		}
	} //for
	if (onlyText && data.substr(data.length - 1) == ',') {
		data = data.substr(0, data.length - 1);
	}
	return data;
}

global.simpleId = function(cls) {
	if (!cls) return null;
	var p = cls.indexOf('id/');
	if (p < 0) return null;
	return cls.substr(p + 3);
}


//var oldparent = parent;
global.parent = function(obj, upLeve) {
	if (upLeve == undefined) {
		return obj.parent();
	}
	var pp = obj;
	for (var i = 0; i <= upLeve; i++) {
		pp = pp.parent();
	}
	return pp;
}

Object.prototype.lookup = function(s1, s2) {
	//return this.replace(new RegExp(s1, "gm"), s2);
	console.log('xxxxxxxxx');
}
//找到一个大物体，比如
global.BigSize = function(classname, height) {
	if (classname == undefined) classname = "RecyclerView";
	if (height == undefined) height = device.height / 2;
	var pp = classNameContains(classname).find();
	var list = [];
	for (var i = 0; i < pp.length; i++) {
		var ele = pp[i];
		var bs = ele.bounds();
		var h = bs.bottom - bs.top;
		//console.log(height); 
		if (h > height && ele.childCount() > 1) {
			 return ele;
		}
	}
	return list;
}

// var ppObj = lookup(text('回复').findOne() ,  className('androidx.recyclerview.widget.RecyclerView'));

//逆向搜索，从我开始
global.lookup = function(obj, sel) {
	if (!obj) return;

	var depth = obj.depth();
	var p = obj.parent();
	for (var i = depth; i > 0; i--) {
		if (!p) return null;
		var maq = ObjectMatchSelector(p, sel);
		if (maq) {
			return maq;
		}
		p = p.parent();
	}
}

function ObjectMatchSelector(obj, sel) {
	var depth = obj.depth();
	var index = obj.indexInParent();
	//console.log('depth=' + depth + ', index=' + index + ", class=" + obj.className());


	var p = obj.parent();

	var find1 = p.findOne(sel);

	if (find1 && find1.depth() + 1 == depth) {
		//console.log(find1);
		//console.log('>>> depth=' + find1.depth() + ', index=' + find1.indexInParent());
		return find1;
	}
	return false;

}
