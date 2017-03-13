/**
 * 验证工具类 2016-07-18 key-verify key-message
 * 
 * @author wuzl
 */
function verifyUtils() {
	this.defaultVerify = {
		notNull : /^[\s\S]+$/,
		phone : /^1[0-9]{10}$/,
		id18 : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
		bank : /^\d{16}|\d{19}$/,
		emal : /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/,
		num6 : /^\d{6}$/,
		money:/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/
	};
	this.defaultMessage = {
		notNull : "请输入有效信息",
		phone : "请输入正确的手机号码",
		id18 : "请填写正确的身份证格式",
		bank : "请填写正确的银行卡格式",
		num6 : "请输入6位有效数字",
		money:"请输入有效的金额"
	};

	/**
	 * 验证并显示错误消息 正常返回true 错误 返回false 并显示错误消息
	 */
	this.verifyError = function(key, val, dom,errorMessage) {
		var error = this.verify(key, val,errorMessage);
		if (error != null) {
			$(dom).html(error);
			return false;
		} else {
			$(dom).html("");
			return true;
		}
	}

	/**
	 * 验证 正确返回null 错误返回错误消息
	 */
	this.verify = function(key, val, message, verify) {
		var verify = this.getVerify(key,verify);
		// 忽略前后空格
		var temp = val.replace(/(^\s+)|(\s+$)/g, "");
		if (verify.test(temp)) {
			return null
		} else {
			var message = this.getMessage(key,message);
			return message.replace("{0}", val);
		}
	}

	/**
	 * 读验证器
	 */
	this.getVerify = function(key, verify) {
		if (verify) {
			return verify;
		} else {
			return this.defaultVerify[key];
		}
	}

	/**
	 * 读错误消息
	 */
	this.getMessage = function(key, message) {
		if (message) {
			return message;
		} else {
			return this.defaultMessage[key];
		}
	}
}