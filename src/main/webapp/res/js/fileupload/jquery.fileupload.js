/**
 * 封装jquery 实现文件上传插件
 */
jQuery.fn.extend({

	/**
	 * 更新图片状态
	 */
	updateImageStatus : function(opts, callback) {
		var _this = $(this);
		opts = jQuery.extend({
			url : "/producer/updateImageStatus.do",
			id : "id",
			status : "0",
			partId : ""
		}, opts || {});

		var data = {
			imageId : opts.id,
			status : opts.status,
			partId : opts.partId
		}
		$.post(opts.url, data, function(result) {
			if (result.status == "1") {
				alert(result.message);
			} else {
				callback();
			}
		});
	},

	/**
	 * 图片删除 callback：回调函数用于渲染界面
	 */
	deleteImages : function(opts, callback) {
		var _this = $(this);
		opts = jQuery.extend({
			url : "/producer/deleteImages.do",
			id : "id"
		}, opts || {});
		var data = {
			imagesId : _this.attr("id")
		}
		$.post(opts.url, data, function(result) {
			if (result.status == "1") {
				alert(result.message);
			} else {
				callback();
			}
		});
	},

	deleteImageById : function(opts, callback) {
		var _this = $(this);
		opts = jQuery.extend({
			url : "/producer/deleteImages.do",
			id : "id"
		}, opts || {});
		var data = {
			imagesId :opts.id
		}
		$.post(opts.url, data, function(result) {
			if (result.status == "1") {
				alert(result.message);
			} else {
				callback();
			}
		});
	},
	/**
	 * 图片上传，不获取点击事件 callback：回调函数用于渲染界面
	 */
	uploadImagesNoEvent : function(opts, callback) {
		var _this = $(this);
		opts = jQuery.extend({
			url : "/producer/deleteImages.do",
			formid : "fileUpload"
		}, opts || {});
		$("#" + opts.formid).ajaxSubmit({success:
			function(response){
			if (response.status == "1") {
				alert(response.message);
			} else {
				callback(response.content);
			}
		}});
	},

	/**
	 * 图片上传 callback：删除元素
	 */
	uploadImages : function(opts, callback) {
		var _self = this, _this = $(this);
		opts = jQuery.extend({
			url : "/producer/imagesUpload.do",
			formid : "fileUpload"
		}, opts || {});
		_this.change(function() {
			$("#" + opts.formid).ajaxSubmit({
				success : function(response) {
					if (response.status == "1") {
						alert(response.message);
					} else {
						callback(response.content);
					}
				}
			});
		});
	},
	
	
	uploadImage : function(opts, callback) {
		var _self = this, _this = $(this);
		opts = jQuery.extend({
			url : "/producer/imagesUpload.do",
			formid : "file_upload"
		}, opts || {});
		_this.change(function() {
			$("#" + opts.formid).ajaxSubmit({
				success : function(response) {
					if (response.status == "1") {
						alert(response.message);
					} else {
						callback(response.content);
					}
				}
			});
		});
	}
});
