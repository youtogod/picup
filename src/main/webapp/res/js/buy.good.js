$(document).ready(function() {
	
	initProvince(); // 初始化省市区
	
	$(".midleft").each(function() {
		$(this).mouseover(function() {
			$(this).find('.adr_delete').show();
		});

		$(this).mouseout(function() {
			$(this).find('.adr_delete').hide();
		});

	});
	
	$(".midright").click(function() {

		$(".cover").show();
		$(".alert").show();


		$("textarea").val("");
		$("select").val("");
	});
	$(".cover").click(function() {
		$(".alert").hide();
		$(".cover").hide();
		$(".alert1").hide();
	});

	$("#button_div").on("click", function() {
		nameBlur();
		addressBlur();
		postBlur();
		telBlur();
		codeBlur();
//		var data = $("#address").serilize(); // 序列化表单
//		$("#address").post('../address/add', data, function(result) {
//			window.location.reload();
//		});
		$("#address").ajaxSubmit({ // 必须引用ajaxform.js插件
			success: function(reslut) {
				window.location.reload();
			}
		});
	}); 
	
});

function f2(e, tag, id) {//选择地址
	$(tag).find(".adr_select").toggle();
	$("#addsId").val(id);
	$(tag).siblings().find(".adr_select").hide();

}

function jiayi(){
	var value = $("#buyCount").val();
	value = parseInt(value) + parseInt(1);
	$("#buyCount").val(value);
	//加一总价格
	var price = $("#price").val();
	total=(Number(value) * Number(price)).toFixed(2)
	$("#total").val(total);
	$("#TotailPriceShow").html(total);
	$("#TotailPriceShow2").html(total);
}

function jianyi() {
	var value = $("#buyCount").val();
	value = parseInt(value) - 1;
	if(value < 1) {
		value = 1;
	}
	$("#buyCount").val(value);
	var price = $("#price").val();
	total = (Number(value) * Number(price)).toFixed(2)
	$("#total").val(total);
	$("#TotailPriceShow").html(total);
	$("#TotailPriceShow2").html(total);
}



//整个页面表单提交
function  transactionPost() {
	$("#createOrderBtn").attr('disabled', true); // 禁用按钮
	var defaultAddreId = $("#default").val();
	var seleAddrId = $("#addsId").val();
	var addrId = null;
	if (defaultAddreId == null && seleAddrId == null) { // 如果都为空则弹出错误选择地址
		$(".alert1").show();
		return;
	}
	if (defaultAddreId != null) { // 选择默认地址
		addrId = defaultAddreId;
	}
	if (seleAddrId != null) { // 选择地址
		addrId = seleAddrId;
	}
	$("#addsId").val(addrId); // 赋值
	var count = $("#buyCount").val();
	$("#count").val(count);
	var message = $("#msg").val();
	$("#messageABC").val(message);
	
	var data = $("#createOrder").serialize(); // 表单序列化
	$.post("create", data, function(res) {
		if (res.resultCode == 1) {
			window.location.href = ctx + "pay/index/" + res.result;
		} else {
			$("#createOrderBtn").removeAttr('disabled'); // 解除禁用
			alert(res.message);
		}
	});
	
	/*
	$("#createOrder").ajaxSubmit({
		success: function(res) {
			if (res.resultCode == 1) {
				window.location.href = ctx + "pay/page/" + res.result;
			} else {
				alert(res.message);
			}
			return false;
		}
	});*/
	
}

function hideaddress(){
	$(".alert").hide();
	$(".cover").hide();
	$(".alert1").hide();
}

function initProvince() {
	$.post(ctx + "province/find", {}, function (provinces) {
		if(provinces == null || provinces.length < 1) {
			alert("没有数据。。。");
			return;
		}
		
		var provinceHtml = ""; // 累计添加省份的options
		for(var i in provinces) { // 遍历省份时
			var province = provinces[i];
			provinceHtml += "<option value='"+province.provinceId+"'>" + province.provinceName + "</option>";
		}
		$("#cmbProvince").html(provinceHtml); // 加载到province的select
		
		var cityHtml = '';
		var n = $("#cmbProvince").get(0).selectedIndex; // 获取当前选中的省份的option的位置
		for(var j in provinces[n].cities) { // 遍历这个下表下的city
			var city = provinces[n].cities[j];
			cityHtml += "<option value='"+city.cityId+"'>" + city.cityName + "</option>";
		}
		$("#cmbCity").html(cityHtml); // 加载到city的select
		
		var areaHtml = ""; // 保存area的所有option
		var m = $("#cmbCity").get(0).selectedIndex; // 获取选中的城市
		var areas = provinces[n].cities[m].areas; // 获取选中城市下的地区
		for(var k in areas) { 
			var area = areas[k];
			areaHtml += "<option value='"+area.areaId+"'>" + area.areaName + "</option>";
		}
		$("#cmbArea").html(areaHtml); // 加载地区
		
		
		// 改变选择的省份
		$("#cmbProvince").change(function() {
			cityHtml = '';
			var n = $("#cmbProvince").get(0).selectedIndex;
			for(var j in provinces[n].cities) {
				var city = provinces[n].cities[j];
				cityHtml += "<option value='"+city.cityId+"'>" + city.cityName + "</option>";
				$("#cmbCity").html(cityHtml);
			}
			
			areaHtml = "";
			var m = $("#cmbCity").get(0).selectedIndex;
			var areas = provinces[n].cities[m].areas;
			for(var k in areas) {
				var area = areas[k];
				areaHtml += "<option value='"+area.areaId+"'>" + area.areaName + "</option>";
				$("#cmbArea").html(areaHtml);
			}
			
		});
		
		// 改变选择的城市
		$("#cmbCity").change(function() {
			areaHtml = "";
			var n = $("#cmbProvince").get(0).selectedIndex;
			var m = $("#cmbCity").get(0).selectedIndex;
			var areas = provinces[n].cities[m].areas;
			for(var k in areas) {
				var area = areas[k];
				areaHtml += "<option value='"+area.areaId+"'>" + area.areaName + "</option>";
				$("#cmbArea").html(areaHtml);
			}
		});
	})
	
}



/**
 * 初始化省市区
 
function initProvince() {
	$("#alert_address").each(function() {
		var url = ctx + "province/find";
		var areaJson;
		var temp_html;
		var oProvince = $(this).find("#cmbProvince"); // 找到省份的select
		var oCity = $(this).find("#cmbCity"); // 找到城市的select
		var oDistrict = $(this).find("#cmbArea"); // 找到地区的select
		
		//初始化省 
		var province = function() {
			$.each(areaJson, function(i, province) {
				temp_html += "<option value='"+province.provinceId+"'>" + province.provinceName + "</option>";
			});
			oProvince.html(temp_html);
			city();
		};
		
		//赋值市 
		var city = function() {
			temp_html = "";
			var n = oProvince.get(0).selectedIndex;
			if (areaJson[n].cities.length < 1) {
				oCity.css("display", "none");
			} else {
				$.each(areaJson[n].cities, function(i, city) {
					if (city == null || city.cityName ==null ) {
						continue;
					}
					temp_html += "<option value='"+city.cityId+"'>"
							+ city.cityName
							+ "</option>";
				});
				
			}
			oCity.html(temp_html);
			district();
		};
		
		//赋值县 
		var district = function() {
			temp_html = "";
			var m = oProvince.get(0).selectedIndex;
			var n = oCity.get(0).selectedIndex;
			if (typeof (areaJson[m].cities[n].areas) == "undefined" 
				|| areaJson[m].cities[n].areas.length < 1) {
				oDistrict.css("display", "none");
			} else {
				oDistrict.css("display", "inline");
				$.each(areaJson[m].cities[n].areas, function(i, district) {
					if (district == null || district.areaName == null) {
						continue;
					}
					temp_html += "<option value='"+district.areaId+"'>"
							+ district.areaName
							+ "</option>";
				});
				oDistrict.html(temp_html);
			};
		};
		
		//选择省改变市 
		oProvince.change(function() {
			city();
		});
		
		//选择市改变县 
		oCity.change(function() {
			district();
		});
		
		//获取json数据 
		$.getJSON(url, function(data) {
			areaJson = data;
			province();
		});
	});
}*/
