$(function() {
	$("img.lazy").lazyload({
		placeholder:"/res/img/progess.jpg",
		effect:"fadeIn"
	});
	
	/*使用jqzoom*/
	$('#jqzoom').jqzoom({
		zoomType: 'standard',
		lens:true,
		preloadImages: false,
		alwaysOn:false
	});
	$("#auto-loop").lightGallery({
		loop:true,
		auto:true,
		pause:4000
	});
	
	start();
});

function DNA(){
	$(".dna1").show();
	$(".fast1").hide();
	$("#pa").removeClass("p3").addClass("p4");
	$("#pb").removeClass("p4").addClass("p3");
	$(".fast").css("border-color","#ccc");
	$(".dna").css("border-color","#ff5400");
}
function switch1(){
	$(".gooddetailp").css("border-color","ff5400");
	$(".custp").css("border-color","#E5E5E5");
	$(".goodcontent2").show();
	$(".contentpreview").show();
	$(".contentdetail3").hide();
}
function switch2(){

	$(".gooddetailp").css("border-color","#E5E5E5");
	$(".custp").css("border-color","#ff5400");
	$(".goodcontent2").hide();
	$(".contentpreview").hide();
	$(".contentdetail3").show();
}


function fastpick(){
	$(".fast1").show();
	$(".dna1").hide();
	$("#pb").removeClass("p3").addClass("p4");
	$("#pa").removeClass("p4").addClass("p3");
	$(".dna").css("border-color","#ccc");
	$(".fast").css("border-color","#ff5400");
}
function backhome(){
	window.location.href = ctx + "index"; 
};

function pay(){
	var goodscode = $("#buy").val();
	$.ajax({
		type : "post",
		url : "/goods/collection.do",
		data : {
			"detailId" : '',
			"goodscode" :goodscode
		},
		success : function(data) {
			$(".alert2").hide();
			$(".cover").hide();
			if (data.msg== "1") {
				window.location.href="/user/login.html?backup=/goods/detail/${goods.id?c}" ;
			}else{
				alert(data.msg);
			}

		}
	})
}

function start(){
	var val = $("#fastpick").val();
	var dna = $("#DNA").val();
	if(val == ""){//快捷尺码有数据
		$(".dna").attr("hidden",true);
	}else{
		$(".fast").attr("hidden",true);
	}
	
	if(dna!="cm"){
		$(".dna").attr("hidden",true);
	}else{
		DNA();
	}
		
}

var flag=false;

function defaultSize(id){
	flag=true;
	$(".fast1").find(".bigf").css("border-color","#ccc");
	var key=$(id).attr("key");
	var value=$(id).attr("value");
	$("#size").val(value);
	$(id).css("border-color","#ff5400");
}