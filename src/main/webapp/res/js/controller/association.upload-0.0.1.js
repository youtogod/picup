/**
 * 部件组合上传
 * 
 * @author Liang
 * 
 */
// 打开文件上传框
function openalert(id) {
	$("#cover-" + id).fadeToggle("500");
	$("#cover").show();
}

//关闭弹出框
function closealert()
{
	$("#confirm").slideToggle('fast');
}

 function mouseon(tag){
	$('#'+tag).show();
}

 
 function mouseout(tag){
	 $('#'+tag).hide();
 }
 
 //删除图片
 function deleteImage(id){
	$("#del"+id).deleteImageById({id:id},function(){
		$("#del"+id).parent().parent().remove();//删除
	});
	
 }

 //更新图片排序
function updateImagesIds(arr) {
		var url = "/producer/updateImageSort.do";
		var data = {
			imageIds : arr.join(",")
		}
		$.post(url, data, function(result) {
			if (result.status == "1") {
				alert(result.message);
			}
		});
	};
 
 //提交图片确定按钮
 $(".confirm").click(function(){
	 var ul=$(this).parent().find("#list");
	 var arr=[];
	 	ul.find("li").each(function() {
			var a = $(this).attr("id");//赋值
			arr.push(a);//赋值
		});
	 if(arr.length>0){
		 updateImagesIds(arr);
	 }
	 
	 var root=ul.parent().parent();
	 root.hide();$("#cover").hide();
	 var length=ul.find("li").length
	 if(length!=0){
		 var li=ul.children("li:first");
		 var src=li.find("img").attr("src");
		 var openAlertImage="#downleft"+ul.attr("value")
		 $(openAlertImage).html("<img src='"+src+"' />" );
	 }
 });
 
 
 //提交商品信息
 $(".savebutton").click(function(){
	 var form=$(this).parent();
	 $(form).ajaxSubmit({
         success: function (reslut) {
             if (reslut.status == "1") {
                 alert(reslut.message);
             }
         }
     });
 });
 

// 文件上传
$(".uploadbutton").change(
				function() {
					var _self_ = $(this);
					var root = _self_.parent(".alert");
					var ul = root.find("#list");
					var length=ul.find("li").length;
					_self_.uploadImagesNoEvent(
									{
										formid : _self_.attr("id")
									},
									function(result) {
										for (var j = 0; j < result.length; j++) {
											var _id_=result[j].id;
											var _path_=result[j].path;
											var _HTML_ = "<li  onmouseover=\"mouseon('del"+_id_+"')\" onmouseout=\"mouseout('del"+_id_+"')\"  id='"+_id_+"' >"
													+ "<div data-cursor='auto' style='cursor: auto;'>"
													+ "<img  height='200' width='200' src=\""
													+ _path_
													+ "\"/>"
													+ "<p id='del"+_id_+"' class='com_del' onclick=\"deleteImage("+_id_+")\" ></p></div>"
													+ 
											"</li>";
											ul.append(_HTML_);
										}
								});
				});


