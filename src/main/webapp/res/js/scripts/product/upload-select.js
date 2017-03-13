var attitudes = new Array();
// 选中不同尺寸类型的样式
function changeAtt() {
	// 清空列表中的所有值

	for (var i = 0; i < attitudes.length; i++) {
		$("#" + attitudes[i]).removeClass("select");
	}
	attitudes.length = 0;
	var att = document.getElementById("sel_att");
	var index = att.selectedIndex;
	var value = att.options[index].getAttribute("value");

	if (value == "DNA") {
		// DNA数据
		$("#DNA").show();
		$("#SIZE").hide();
		$("#NUM").hide();
		$("#SIZE_SHOP").hide();
		$("#SIZE_COAT").hide();
		$("#SIZE_BAS").hide();
	} else if (value == "NUM") {
		// 尺码
		$("#DNA").hide();
		$("#NUM").show();
		$("#SIZE").hide();
		$("#SIZE_SHOP").hide();
		$("#SIZE_COAT").hide();
		$("#SIZE_BAS").hide();
	} else if (value == "SIZE") {
		// 尺寸
		$("#SIZE").show();
		$("#DNA").hide()
		$("#NUM").hide()
		$("#SIZE_SHOP").hide();
		$("#SIZE_COAT").hide();
		$("#SIZE_BAS").hide();
	}else if (value == "SIZE_SHOP"){
		$("#SIZE").hide();
		$("#DNA").hide()
		$("#NUM").hide()
		$("#SIZE_SHOP").show();
		$("#SIZE_COAT").hide();
		$("#SIZE_BAS").hide();
	}else if (value == "SIZE_COAT"){
		$("#SIZE").hide();
		$("#DNA").hide()
		$("#NUM").hide()
		$("#SIZE_SHOP").hide();
		$("#SIZE_COAT").show();
		$("#SIZE_BAS").hide();
	}else if (value == "SIZE_BAS"){
		$("#SIZE").hide();
		$("#DNA").hide()
		$("#NUM").hide()
		$("#SIZE_SHOP").hide();
		$("#SIZE_COAT").hide();
		$("#SIZE_BAS").show();
	}
}

Array.prototype.remove = function(dx) {
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != dx) {
			this[n++] = this[i];// 重构新数组,
		}
	}
	this.length -= 1;// 改变length属性
}

function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] == obj) {
			return true;
		}
	}
	return false;
}
