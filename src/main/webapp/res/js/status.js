//取消订单的弹出框事件
function Drop_order(orderNo,status,message){
	$(".drop_order_area").show();
	$(".drop_order_close").click(function(){
		$(".drop_order_area").hide();
	});
	$(".drop_order_no").click(function(){
		$(".drop_order_area").hide();
	});
	var CGo = $("#drop_order_span"+orderNo).attr("drop_order_orderno");
	//console.log(CGo);
	//$("this").attr("drop_order_orderNo",orderNo)
	$("#drop_order_sure").click(function(){
		updateOrderStatus(CGo,status,message); /*在order.ftl中*/
	})
}





