//鼠标离开用户名文本框时
function nameBlur(){

    var name=document.getElementById("name");
    var promptId=document.getElementById("name_prompt");
    promptId.innerHTML='';
    if(name.value==""){
        promptId.innerHTML='收货人姓名不能为空';
       throw "收货人姓名不能为空";
    }
    promptId.innerHTML='✔';

}
//鼠标离开电话文本框时
function telBlur(){
    var tel=document.getElementById("phone");
    var promptId=document.getElementById("tel_prompt");
    promptId.innerHTML="";
    var reg = /^1[3|4|5|7|8]\d{9}$/;
    if(tel.value==""){
        promptId.innerHTML="联系电话为必填项";
        throw "联系电话为必填项";
    }
    if(reg.test(tel.value)==false){
        promptId.innerHTML="联系电话格式错误";
        throw "联系电话格式错误";
    }
    promptId.innerHTML='✔';
    
}
//鼠标离开邮政编码文本框时
function postBlur(){
    var post=document.getElementById("postcode");
    var promptId=document.getElementById("post_prompt");
    promptId.innerHTML="";
    var reg = /^[1-9][0-9]{5}$/;
    if(post.value==""){
        promptId.innerHTML="邮政编码为必填项";
        throw "邮政编码为必填项";
    }
    if(reg.test(post.value)==false){
    	promptId.innerHTML="邮政编码格式错误";
    	throw "邮政编码格式错误";
    }
    promptId.innerHTML='✔';
   
	
	/*$("#postcode").blur(function(){ if(this.value=='') alert('邮政编码不能为空！')})*/
}

//鼠标离开地址文本框时
function addressBlur(){
    var address=document.getElementById("moreaddress");
    if(address.value==""){
        $("#address_prompt").html("地址为必填项");
        throw "地址为必填项";
    }
    $("#address_prompt").html("✔");
    
}
//省市验证
function codeBlur(){
    var province=document.getElementById("cmbProvince");
    var city=document.getElementById("cmbCity");
    if(province.value==""&& city.value==""&& area.value==""){
        $("#cmbProvince_prompt").show("请选择省");
        $("#cmbCity_prompt").show("请选择市");
        throw "请选择省市";
    }
    $("#").html("✔");
   
}

//单击提交页面时，对页面内容进行验证
function checkAddress(){
    nameBlur();
    addressBlur();
    postBlur();
    telBlur();
    codeBlur();
    var flagName = nameBlur();
    var flagDetailed_address=addressBlur();
    var flagPostcode=postBlur();
    var flagPhone=telBlur();
    var flagCode=codeBlur();
    if(flagName==true && flagDetailed_address ==true && flagPostcode==true && flagPhone==true && flagCode==true){
        return true;
    }else{
        return false;
    }
}
function submit(){
    if(!checkAddress()){
        return;
    }
    $('#address').submit();
}

function finishBlur(){

    var name=document.getElementById("submit");
    var promptId=document.getElementById("submit_prompt");
    promptId.innerHTML='';
    if(submit.value==""){
        promptId.innerHTML='请添加地址信息';
        return false;
    }
   /* promptId.innerHTML='✔';*/
    return true;
}

//鼠标离开命名文本框时
function byname(){

    var name=document.getElementById("name");
    var promptId=document.getElementById("name_prompt");
    promptId.innerHTML='';
    if(name.value==""){
        promptId.innerHTML='命名不能为空';
        return false;
    }
    promptId.innerHTML='✔';
    return true;
}
//鼠标离开定价文本框时
function dingjia(){
    var tel=document.getElementById("price");
    var promptId=document.getElementById("money_prompt");
    promptId.innerHTML="";
    var reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    if(tel.value==""){
        promptId.innerHTML="定价为必填项";
        return false;
    }
    if(reg.test(tel.value)==false){
        promptId.innerHTML="金额格式错误";
        return false;
    }
    promptId.innerHTML='✔';
    return true;
}





