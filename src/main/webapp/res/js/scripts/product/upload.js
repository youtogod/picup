/*$(".addbutton").click(function(){
	var product_html="<div class='center now'>"
		+"<div class='down' style='height: 300px'>"
		+"<p>"
		+"您可以根据组合上传1~5张不同角度的产品图"
		+"</p>"
		+"<div class='downleft'  onclick='openalert()'>"
		+"<span class='big' style='font-size: 110px; color: #c2c2c2;'>"
		+"+"
		+"</span>"
		+"<br>"
		+"<span style='font-size: 20px; color: #c2c2c2; position: relative; top: 0;'>"
		+"<div class='Images-add'>"
		+"添加图片"
		+"</div>"
		+"</span>"
		+"</div>"
		+"<div class='downright'>"
		+"<form class='DetailForm' action='/producer/tinyupload/first.do'>"
		+"</form>"
		+"<span>"
		+"命名"
		+"</span>"
		+"<input type='text' class='nameinput' name='name' placeholder='给您的产品起个响亮的名字'>" 
		+"<br>"
		+"<span>"
		+"定价"
		+"</span>"
		+"<span class='money'>"
		+"￥"
		+"</span>"
		+"<input type='text' class='priceinput' name='price' onblur='money_1()' style='width: 75px; padding-left: 25px;margin-left:5px;height:30px;'>"
		+"</form>"
		+"</div>"
		+"<button type='button' class='sure_button' onclick='addGoodsDetail()'>"
		+"确认"
		+"</button>"
		+"</div>"
		+"</div>";
		
		var len=$("#product_middle .center").length;
		//alert(len);
	if(len<5){
		
		$("#product_middle").append(product_html);
		
	}else{
		alert("上传数量不能超过5组");
	}
});
 */

function updateImagesIds(arr) {
	if(arr.length!=0){
		var url = "/producer/updateImageSort.do";
		var data = {
			imageIds : arr.join(",")
		}
		$.post(url, data, function(result) {
			if (result.status == "1") {
				alert(result.message);
			}
		});
	}
};

/*
 * function addGoodsDetail(){ var imgsrc = $(".big").children().length;
 * if(imgsrc > 0){ var name = $(".nameinput").val(); var price =
 * $(".priceinput").val(); if(name=="" || price==""){ alert("请输入商品名称或者价格");
 * return; } var url = $(".DetailForm").attr("action"); var data = { goodsCode :
 * $("#code").val(), price : price, name : name } $.post(url, data,
 * function(result) { if (result.status == "1") { alert(result.message); } else {
 * window.location.reload();//刷新当前页面. } }); }else { alert("请上传图片"); } }
 */

// 文件上传
function updateImages_success(list,i) {
	var _IMAGES_CONTAINER_ = $("#list"+i);
	for (var _INDEX_ = 0; _INDEX_ < list.length; _INDEX_++) {
		var _HTML_ = "<li id='"
				+ list[_INDEX_].id
				+ "'><div data-cursor='auto' style='cursor: auto;'><img  height='200' width='200' src='"
				+ list[_INDEX_].path
				+ "'><p class='com_del' onclick='del(this)' id='"
				+ list[_INDEX_].id + "'></p></div></li>"// li
		_IMAGES_CONTAINER_.prepend(_HTML_);// 添加li到ul
	}
	mouseEvent();// 鼠标悬浮删除按钮
	liSign(i);// 图片标记顺序
}

function previewFiles() {
	function updateImages(textarea) {
		var url = "${base}/producer/updateImages.do";
		var data = {
			id : textarea.id,
			description : textarea.value
		}
		$.post(url, data, function(result) {
			if (result.status == "1") {
				alert(result.message);
			}
		});
	}
	;
}

// 拖拽
$("ul:first").dragsort();
$(".list_xiaowei").dragsort({
	dragSelector : "div",
	dragBetween : true,
	dragEnd : saveOrder,
	placeHolderTemplate : "<li class='placeHolder'><div></div></li>"
});
function saveOrder() {
	var data = $(".list_xiaowei li").map(function() {
		return $(this).children().html();
	}).get();
	$("input[name=list1SortOrder]").val(data.join("|"));
};

// 关闭弹出框
function closealert() {
	$("#confirm").slideToggle('fast');
}

$(document).ready(function() {
	$("#cover").hide();
	$(".alert").hide();
});

// 判断五张图片
function upImage_5(i) {
	var file = document.getElementById("filename" + i).files;
	var listlength = $("#list" + i).find("li").length;
	if (listlength + file.length > 5) {
		$("#confirm .warn").text("图片数量不能超过五张");
		$("#confirm").show();
		return false;
	} else {
		previewFiles(i);
		$("#fileUpload" + i).ajaxSubmit({
			success : function(response) {
				if (response.status == "1") {
					alert(response.message);
				} else {
					updateImages_success(response.content,i);
				}
			}
		});
	}
}

// 关闭弹出框
function closealert() {
	$("#confirm").slideToggle('fast');
}

function mouseEvent(i) {
	$("#list"+i+" li").mouseover(function() {
		$(this).find("p").css("display", "block");
	})
	$("#list"+i+" li").mouseout(function() {
		$(this).find("p").css("display", "none");
	})
}
function liSign(index) {
	var listli_p = document.getElementById("list" + index).getElementsByTagName(
			"li").length;
	var listcontent = '';
	if (listli_p > 0) {
		if ($("#list" + index).find("li").length != 0) {
			var lastnum = $("#list" + index).find("li").length;
			$(".number_sort").empty();
			for (var i = 0; i < listli_p; i++) {
				if (i <= 4) {
					listcontent += "<li>" + (parseInt(i) + 1) + "</li>";
				} else {
					break;
				}
			}
			
		}
		$(".alert .confirm").css("background-color", "#235fa7");
	}
	$(".number_sort").html(listcontent);
}

$('.evecover>img').click(function() {
	$(this).parent().parent().remove();
})

// 打开图片上传模态框
function openalert(i) {
	mouseEvent(i);// 鼠标悬浮删除按钮
	liSign(i);// 图片标记顺序
	$("#bat_alert"+i).fadeToggle("500");
	$("#cover"+i).show();
}

/*
 * //显示删除按钮 $(".downleft").mouseover(function() {
 * $(this).find('.img_de').show(); $(this).find('.img_de').click(function() {
 * $(this).parent().remove(); }) }); $(".downleft").mouseout(function() {
 * $(this).find('.img_de').hide(); });
 */
// 鼠标移上
function showMask() {
	$("#mask").css("opacity", "0.7");
};

function hideMask() {
	$("#mask").css("opacity", "0.2");
};



function del(tag) {
	// 9月10日阻止冒泡事件尝试
	// tag.stopPropagation();
	$(tag).deleteImages(
			{},
			function() {
				$(tag).parent().parent().remove();// 删除
				// 删除ul下的最后一个li js
				var li = document.getElementById("number_sort")
						.getElementsByTagName("li");
				li[li.length - 1].remove();
			});
};

// 获得五张图片路径
function getImgArray() {
	var imgArray = new Array();
	$("#list li").each(function(index) {
		imgArray[index] = $(this).find("img").attr("src");
	});
	return imgArray;
}

var changeCode = null;
$('.changed').click(function() {
	                var name =$(this).attr("name");
	                var price =$(this).attr("price");
					changeCode = $(this).attr("code");
					var border = $(this).parent().parent();
					// var refill=border.find(".downleft:first");
					$(this).parent().parent().parent().next().hide();
					$(this).parent().remove();
					var HTML1 = "<div>"
							+ "<div style='margin-bottom:18px'>"
							+ "<span style='margin-right:12px;font-size:20px'>"
							+ "命名"
							+ "</span>"
							+ "<input id='in_name' style='width:17%;height:26px;' value='"+name+"'>"
							+ "</input>"
							+ "</div>"
							+ "<div>"
							+ "<span style='margin-right:12px;font-size:20px;'>"
							+ "定价"
							+ "</span>"
							+ "<span style='position:absolute;left:4.5%;top:55px;'>"
							+ "￥"
							+ "</span>"
							+ "<input id='in_price' style='padding-left:18px;width:9%;height:26px' onblur='money()' value='"+price+"'>"
							+ "</input>" + "</div>";
					border.prepend(HTML1);
					border
							.after("<button type='type' class='save' onclick='save()'>保存</button>");
					border
							.find(".downleft img")
							.after(
									"<img src='/res/img/account/del.png' class='img_de' style='display:none;'>");

				})

// 修改后按保存按钮实行保存；
function save() {
	var name = $("#in_name").val();// 获取修改的名字
	var price = $("#in_price").val();// 获取修改名称
	var code = $("#goods_id").text();// 获取商品id
	code = changeCode;
	// ajaxjq写法
	if (name == "" || price == "") {
		alert("商品名字、价格不能为空");
		return;
	}
	$.post('/producer/updateGoodsName.do', {
		'name' : name,
		'price' : price,
		'code' : code
	}, function(data) {

	});
	window.location.reload();
}

function money() {

	var $nameInput = $("#in_price");

	// 先把非数字的都替换掉，除了数字和.
	$nameInput.val($nameInput.val().replace(/[^\d.]/g, "").
	// 只允许一个小数点
	replace(/^\./g, "").replace(/\.{2,}/g, ".").
	// 只能输入小数点后两位
	replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(
			/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
	// 最后一位是小数点的话，移除
	$nameInput.val(($nameInput.val().replace(/\.$/g, "")));
}
function money_1(t) {
/*	var $nameInput_1 = $(".priceinput");*/
	var $nameInput_1=$(t);
	
	// 先把非数字的都替换掉，除了数字和.
	$nameInput_1.val($nameInput_1.val().replace(/[^\d.]/g, "").
	// 只允许一个小数点
	replace(/^\./g, "").replace(/\.{2,}/g, ".").
	// 只能输入小数点后两位
	replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(
			/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
	// 最后一位是小数点的话，移除
	$nameInput_1.val(($nameInput_1.val().replace(/\.$/g, "")));
}
