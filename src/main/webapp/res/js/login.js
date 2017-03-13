$(document).ready(function() {
	
	// 点击图片进行切换
	$("#kaptchaImage").click(function () {
		changeCode();
	});
	
	$("#login").click(function () {
		
		var mobile = $("#mobile").val();
		if (isEmpty(mobile)) {
			$("#mobileError").html("请输入手机号码");
			return;
		}
		
		var password = $("#password").val();
		if (isEmpty(password)) {
			$("#passwordError").html("请输入密码");
			return;
		}
		
		var kaptcha = $("#kaptcha").val();
		if (isEmpty(kaptcha)) {
			$("#kaptchaError").html("请输入验证码");
			return;
		}
		var data = {mobile: mobile, password:password, imgCode: kaptcha};
		$.post("login", data, function (res) {
			if (res.resultCode == 1) {
				window.location.href = ctx + "index";
			} else {
				alert(res.message);
				changeCode();
			}
		});
		
		// 防止图片刷新
		return false;
	});
	
	
});

// 刷新验证码
function changeCode() {
	$("#kaptchaImage").hide()
	.attr("src", "../kaptcha/getKaptchaImage?" + new Date().getTime())
	.fadeIn();
	
}