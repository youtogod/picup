 function gettime(obj){//将时间转型

 if(obj.minutes.toString().length==1)
 {
	 
 var time=parseInt(obj.year+1900)+'-'+parseInt(obj.month+1)+'-'+obj.date+' '+obj.hours+':'+'0'+obj.minutes;
 }
 
 else{
 var time=parseInt(obj.year+1900)+'-'+parseInt(obj.month+1)+'-'+obj.date+' '+obj.hours+':'+obj.minutes;
 }
 return time;
 }
 
 function getdate(obj)
 {		 
	 if(obj.month<9 && obj.date<=9)
		 {
		 var time=parseInt(obj.year+1900)+'-'+"0"+parseInt(obj.month+1)+'-0'+obj.date;
		 }
	 else if(obj.month<9)
		 {
		 var time=parseInt(obj.year+1900)+'-'+"0"+parseInt(obj.month+1)+'-'+obj.date;
		 }
	 else if(obj.date<=9){
		 var time=parseInt(obj.year+1900)+'-'+parseInt(obj.month+1)+'-0'+obj.date;
	 }
	 else
		 var time=parseInt(obj.year+1900)+'-'+parseInt(obj.month+1)+'-'+obj.date;
	 return time;
	 }
 
 function getbirthday(obj) //获得生日
 {
	 var time=parseInt(obj.month+1)+'.'+obj.date;
	 return time;
	 } 
 
 function lookother(_this)
 {
	 var id=$(_this).data("id");
	 var ownid=$("#myownid").val();
	 if(id==ownid)
		 window.location.href="MyHomePage.jsp";
	 else
		 window.location.href="PublicHomePage.jsp?id="+id;
 }
 function islogin()
 {
	 $.post('UserInfo/get.action',function(data){
		 var json=$.parseJSON(data);
		 if(json.feedback_id==undefined)
			 {}
		 else
			 window.location.href="index.jsp";
	 });
 }
 
 
function getuserinfo(flag,userid) //获取个人信息
 {
	var hello='';
	if(flag==1)
	{
		var url="UserInfo/Init.action";
	}
	else
		{
		hello="你好•";
		var url="UserInfo/get.action";
		}
	 $.post(url,{"user.userId":userid},function(data){
	 var json=$.parseJSON(data);
	 if(json.nativePlace!="")
	 $("#head_address").text("来自"+json.nativePlace);
	 else
		 $("#head_address").text("保密"); 
	 $("#head_name").text(hello+json.firstName);
	 if(json.birthday!="")
	 $("#head_birthday").text(getbirthday(json.birthday));
	 else
		 $("#head_birthday").text("保密");
	 if(json.sex==2)
	 {
	 $("#head_sex").text("女生");
	 $("#head_sex").prev().addClass("girl-icon");
	 }
	 else if(json.sex==1)
	 {
	 $("#head_sex").text("男生");
	 $("#head_sex").prev().addClass("boy-icon");
	 }
	 else
	 {
	 $("#head_sex").text("保密");
	 $("#head_sex").prev().addClass("boy-icon");
	 }
	 $("#userImg").attr("src",json.userImg);
	 if(json.userStateId!=0)
	 {
	 $.post('UserInfo/lookUserStateById.action',{"userState.userStateId":json.userStateId},function(state){
	 var statename=eval(state);
	 for(var i=0;i<statename.length;i++)
	 {
	 $("#head_job").text(statename[i].userStateName);
	 }
	 });
	 }
	 else
	 {
	 $("#head_job").text("保密");
	 }
	 
	 if(json.userEmotionStateId!=0)
		 {
		 $.post('UserInfo/lookUserEmotionStateById.action',{"userEmotionState.userEmotionStateId":json.userEmotionStateId},function(emotion){
			 var emo=$.parseJSON(emotion);
			 $("#head_love").text(emo.userEmotionStateName);
			 }); 
		 }
	 else
		 {
		 $("#head_love").text("保密");
		 }
	 });
	 
	 }


function getId(id)
{
	if(id=="null")
		window.location.href="index.jsp";
}


 