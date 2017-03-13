                             
//图片上传
$("#file").uploadImages({}, function (list) {
    location.reload();
});

$("#file_upload").uploadImage({}, function (list) {
    location.reload();
});

//点击图片 ，组合部件
function addPartPreview(tag){
    var id = $(tag).attr("id");
    $("#shadow-"+id).show();//图片遮罩层显示
    var border = $("#collectionPartContainer");
    var src = $(tag).attr("src");
    var HTML = "<div class='part' name='ele_'>" +
        "<img src='" + src + "' alt='' class='part_img'>" +
        "<img src='/res/img/account/delete.gif' id='" + id + "' class='fix' onclick='del2(event,this)'>" +
        "</div>";
    border.append(HTML);
    $(".collectionPart").show();	
}


//更改部件
function updatePart(id){
	var part=$("#part-"+id);
	part.hide();
	$("#part_id").val(id);
	var border = $("#collectionPartContainer");
	$("#part-"+id+" .rel .part").each(function(index){
		var img=$(this).children(".part_img");
		var src=img.attr("src");
		var imgId=img.attr("id");
	    var HTML = "<div class='part' name='ele_'>" +
        "<img src='" + src + "' alt='' class='part_img'>" +
        "<img src='/res/img/account/delete.gif' id='" + imgId + "' class='fix' onclick='removePartImage(this)'>" +
        "</div>";
	    border.prepend(HTML);
	});
	$(".collectionPart").show();			
}



//移除部件图片(修改部件的时候)
function removePartImage(tag){
	var id=$(tag).attr("id");	
	$(tag).parent().remove();
	var src=$(tag).parent(".part").children(".part_img").attr("src");
	var arr=getPreviewPartImagesId();
	if(arr.length==0){
		$(".collectionPart").hide();
	}
	
	$(tag).updateImageStatus({id:id},function(){
		alert("更新部件成功！");
	})
	//上传图片列表增加
	var _HTML="<div class='part' name='ele_1' id='"+id+"' onmouseover='show_del(this)' onmouseout='hide_del(this)'>" +
	"<img src='"+src+"' id='"+id+"' class='part_img' onclick='addPartPreview(this)'/>" +
	"<img src='/res/img/account/del.png' id='"+id+"' class='del' onclick='del(event,this)' style='display:none;'/>" +
	"<div class='layer shadow' id='shadow-"+id+"' hidden='true'></div>  " +
	"</div>";
	$("#container").prepend(_HTML);
	
}


//上传部件
$("#next").click(function(){
	var name=$("#part_name").val();
	if(name==""){
		alert("给产品起个名字,再进行下一组吧");
		return;
	}
	var imagesIds=getPreviewPartImagesId();
	if(imagesIds.length<2){
		alert("每组部件的图片不能少于2张！");
		return ;
	}	
        var data={
            name:$("#part_name").val(),
            images:imagesIds.join(",") ,
            code:$("#code").val(),
            partId:$("#part_id").val()
        }
    $.post("/producer/part/newpart.html",data,function(){
         location.reload();
    })  ;
});


//删除部件
function deletePart(tg){
	confirm("确认删除部件？");
	var data={
			partId:tg
	}
	$.post("/producer/part/delete.html",data)  ;
	location.reload();
};


//进行部件描述
$("#partDesButton").click(function(){
	var length=$(".rel").children().length;
	if(length == 0){
		alert("请点击图片进行分组再进行部件描述");
		return;
	}
	var form = $('<form></form>'); 
	form.attr('action', "/producer/part/changPart.html"); 
	form.attr('method', 'post');
	var _input  = $('#code');
	form.append(_input);  
	form.submit(); 
});


//显示删除按钮
function show_del(tag) {
    $(tag).find('.del').show();
 
}

//隐藏删除按钮
function hide_del(tag) {
    $(tag).find('.del').hide();
}

//删除图片

function del(e, tag) {
    $(tag).deleteImages({}, function () {
        $(tag).parent().remove()
    });
}

//删除选中部件内的图片
function del2(e, tag) {
	var imagesIds=getPreviewPartImagesId();
    $(tag).parent().remove();
    $("#shadow-"+tag.id).hide();//图片遮罩层显示
    //隐藏部件列表。
    if(imagesIds.length<=0){
        $(".collectionPart").hide();
    }
}


//获取部件列表的ids
function getPreviewPartImagesId(){
	var arr=[];
	$("#collectionPartContainer .part").each(function(index){
		arr.push($(this).children(".fix").attr("id"));
	});
	return arr;
}


//已上传部件的数量
function partCount(){
	var data={
			partId:tg
	}
	$.post("/producer/part/delete.html",data)  ;
	location.reload();
}

//下一步
function nextStep(){
	var length=$("#container .part").children().length;
	//说明有图片没有上传
	if(length > 1){
		alert("请将上传的图片进行分组");
		return;
	}
	var data={
			goodsCode:$("#code").val(),
	}
	$.post("/producer/part/count.do",data,function(result){
		if(result.status==1){
			alert(result.message);
		}else{
			var form = $('<form></form>'); 
			form.attr('action',"/producer/part/changPart.html"); 
			form.attr('method', 'post');
			var _input  = $('#code');
			form.append(_input);  
			form.submit(); 
		}
	})
}
