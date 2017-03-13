$(document).ready(function() {
	// 点击获取手机验证码
	$("#vf_codes_btn").click(function() {
		var mobile = $("#input_mobile").val();
		if (isEmpty(mobile)) {
			$("#hidden_mobile").show();
			return;
		}
		$.post("../sms/send", {mobile: mobile}, function(res) {
			if(res.resultCode == 1) { // 倒计时
				time();
			} else {
				alert(res.message);
			}
		});
		
	});
	
	// 点击切换验证码
	$("#kaptchaImage").click(function () {
		changeCode();
	});
	
	// 注册
	$("#reg").click(function (){
		signup();
		return false;
	});
});

// 点击换一张切换验证码
function changeCode() {
	// 就是将图片的地址进行请求刷新
//	$('#kaptchaImage').hide()
//		.attr('src','../kaptcha/getKaptchaImage?'+ Math.floor(Math.random() * 100))
//		.fadeIn();
	$('#kaptchaImage').hide();
	$('#kaptchaImage').attr('src','../kaptcha/getKaptchaImage?'+ Math.floor(Math.random() * 100));
	$('#kaptchaImage').fadeIn();
	
	// 禁用事件防止多次点击
	event.cancelBubble = true;
}

//倒计时
var wait = 60;
function time() {//控制60秒后才可点
	if (wait == 0) {
		$("#vf_codes_btn").removeAttr("disabled");
		$("#vf_codes_btn").val("获取验证码");
		wait = 60;
	} else {
		$("#vf_codes_btn").attr("disabled", true);
		$("#vf_codes_btn").val("重新发送(" + wait + ")");
		wait--;
		setTimeout(function() {
			time();
		}, 1000);
	}
}

//验证手机号
function yzmobile(){
	var mobile=$("#input_mobile").val();
	if (isEmpty(mobile)) {
		$("#hidden_mobile").show();
	}else if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(mobile))) {
		$("#hidden_mobile").show();
		$("#hidden_mobile span").html("你输入的手机号不正确!请重新输入");
	}
}

//判断密码
function yzpass(){
	var password = $("#password").val();
	yzconfirmPwd();
	if (password == "") {
		$("#hidden_password").show();
	}else{
		$("#hidden_password").hide();
	}
}

//判断确认密码和密码一致性
function yzconfirmPwd(){
	var password = $("#password").val();
	var confirmPwd = $("#confirmPwd").val();
	if(confirmPwd==""){
		$("#hidden_confirmPwd span").html("请输入确认密码");
		$("#hidden_confirmPwd").show();
	}else if (password != confirmPwd) {
		$("#hidden_confirmPwd span").html("确认密码与密码不一致");
		$("#hidden_confirmPwd").show();
	}else if(password==confirmPwd){
		$("#hidden_confirmPwd span").html("确认密码与密码一致");
		$("#hidden_confirmPwd").show();
	}
}

function signup () {
	//获取input的内容
	var mobile = $("#input_mobile").val();
	if (isEmpty(mobile)) {
		$("#hidden_mobile").show();
		return;
	} else if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(mobile))) {
		$("#hidden_mobile").show();
		$("#hidden_mobile span").html("你输入的手机号不正确!请重新输入");
		return;
	}
	// 手机验证吗
	var code = $("#code").val();
	if (isEmpty(code)) {
		$("#hidden_code").show();
		return;
	}
	// 姓名
	var lastName = $("#lastName").val();
	var firstName = $("#firstName").val();
	if (isEmpty(lastName) || isEmpty(firstName)) {
		$("#hidden_username").show();
		return;
	}
	
	// 密码
	var password = $("#password").val();
	if (isEmpty(password)) {
		$("#hidden_password").show();
		return;
	}
	// 确认密码
	var confirmPwd = $("#confirmPwd").val();
	if (confirmPwd != password) {
		$("#hidden_confirmPwd").show();
		return;
	}
	// 图片验证码
	var setiImgCode = $("#kaptcha").val();
	if (isEmpty(setiImgCode)) {
		$("#hide_setimgcode").show();
		return;
	}
	
	// 条款
	if ($("#checkbox-id").prop("checked") == false) {
		$("#hidden_condition").show();
		return;
	}
	
	//ajax提交
	var data = {
			"mobile" : mobile,
			"code" : code,
			"lastname" : lastName,
			"firstname" : firstName,
			"password" : password,
			"confirmPwd" : confirmPwd,
			"imgCode" : setiImgCode
		};
	$.post("signup", data, function(res) {
		console.log(res);
		if (res.resultCode == 1) {
			window.location.href = ctx + "index";
		} else {
			alert(res.message);
			changeCode();
		}
	});
}

