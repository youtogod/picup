function isEmpty(targetStr) {
	if (isNull(targetStr) || targetStr.length < 1) {
		return true;
	} else {
		return false;
	}
}

function isNull (targetObj) {
	if (targetObj == null || targetObj == 'null'
		|| typeof targetObj == 'undefined' || targetObj == 'undefined') {
		return true;
	} else {
		return false;
	}
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};