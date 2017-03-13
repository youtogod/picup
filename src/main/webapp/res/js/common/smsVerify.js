/**
 * 短信验证码组件
 */

function smsVerify(url) {
	this.sendUrl = url;
	this.countdown = 60;
	this.c;
	this.defaultVal = "获取验证码";
	this.showVal = "重新发送";
	this.isrun = false;

	this.settime = function(dom,sms) {
		if (this.c == 0) {
			dom.html(this.defaultVal);
			this.isrun = false;
		} else {
			dom.html(this.showVal + "(" + this.c + ")");
			this.c--;
			this.isrun = true;

			setTimeout(function() {
				sms.settime(dom,sms);
			}, 1000)
		}

	};

	this.sendSms = function(mobile, dom,sms) {
		if (this.isrun) {
			return;
		}
		this.c = this.countdown;
		this.settime(dom,sms);
		$.post(url, {
			mobile : mobile
		}, function(data) {
			if (data.status == 1) {
				alert(data.message);
			}
		})
	}
}