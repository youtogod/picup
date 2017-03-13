function crop() {
      var options =
      {
          thumbBox: '.thumbBox',
          spinner: '.spinner',
          imgSrc: ''
      }
      var cropper = $('.Original_img').cropbox(options);
      $('#file').on('change', function () {
          var reader = new FileReader();
          reader.onload = function (e) {
              options.imgSrc = e.target.result;
              cropper = $('.Original_img').cropbox(options);
          }
          reader.readAsDataURL(this.files[0]);
          this.files = [];

      });
      $('#Correct').on('click', function () { //裁剪图片
         var img = cropper.getDataURL();
          $("#userImg").attr('src', img);
          $(".modal").hide();
          $(".cover").hide();
          $("body").css({overflow: "auto"});
          $(".Original_img").css("background-image", "");
          $("#fileUpload").submit();
          
      });
      
      
      $('#btnZoomIn').on('click', function () {
          cropper.zoomIn();
      });
      $('#btnZoomOut').on('click', function () {
          cropper.zoomOut();
      });
  }
  function openmodal()  //打开上传图片模态框
  {
      $(".cover").show();
      $(".modal").fadeIn('fast');
      $("body").css({overflow: "hidden"});
      //crop();
  }

  $(".close").click(function () {
      $(".modal").hide();
      $(".cover").hide();
      $("body").css({overflow: "auto"});
  });

  $(".cover").click(function () {
      $(".modal").hide();
      $(".cover").hide();
      $("body").css({overflow: "auto"});
  });


function headerImagesHide(){
    $('.cover').hide();
    $('.modal').hide()
}