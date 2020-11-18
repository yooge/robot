//1.  获得一个listview 或 recycleview  等的子成员信息


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
global.loopElementsText = function(pp, onlyText) {
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
