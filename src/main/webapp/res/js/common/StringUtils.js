/**
 * 
 */
function format(model, agrs) {
	if (agrs.length == 0)
		return model;
	for (var s = model, i = 0; i < agrs.length; i++) {
		s = s.replace(new RegExp("\\{" + i + "\\}", "g"), agrs[i]);
	}
	return s;
}