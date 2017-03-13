jQuery.fn.extend({
    //检查input输入为金额
  checkMonney: function(opts) {
      var _self = this,
          _this = $(this);

      opts = jQuery.extend({
            show:"" ,  //显示错误的id
            alert:"true"//是否alert输出
      }, opts || {}),

      _this.blur(function(){
            var val=_this.attr("value");
            var patrn=/^-?\d+\.{0,}\d{0,}$/;
          if(!patrn.exec(val)){
              var error="请输入正确的金额!";
              _this.focus();
             if(opts.alert=="true"){
                 alert(error);
             }
              else{
                 $("#"+opts.show).html(error)
             }
          }
      });
  }
});