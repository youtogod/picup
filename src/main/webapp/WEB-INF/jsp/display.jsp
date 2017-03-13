<%@ page language="java" contentType="text/html; charset=UTF-8"
	isELIgnored="false" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>上传图片</title>
<link rel="stylesheet"
	href="/res/css/old/bootstrap-3.3.5-dist/css/bootstrap.min.css">
<script type="text/javascript"
	src="/res/js/scripts/jquery-1.11.0.min.js"></script>
<style type="text/css">
#temp {
	position:fixed;
	bottom:5%;
	margin: auto;
}

.display {
	width: 160px;
	height: 120px;
	display: inline-block;
	position: relative;
	background-color: rgba(250, 250, 250, 0.4);
	text-align: center;
	border: 1px grey solid;
}

.display img {
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	max-height: 90%;
	max-width: 98%;
}

#bigFrame {
	width: 100%;
	height: 100%;
	position: fixed;
	display: none;
	top: 0px;
	left: 0px;
	background-color: rgba(250, 250, 250, 0.4);
	text-align: center;
}

#bigPicture {
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	max-height: 90%;
	max-width: 90%;
}

</style>
</head>
<body>
	<div id="temp">
		<c:forEach items="${ids }" var="id" varStatus="status">
			<div class="display">
				<img src="/image/${id }" class="img-rounded"
					onclick="openBigPicture(${id },${status.index })" />
			</div>
		</c:forEach>
	</div>

	<div id="bigFrame">
		<img class="img-rounded" id="bigPicture" src="" />
	</div>

</body>
<script type="text/javascript">
		var ids=[];
		var currentIndex;
		<c:forEach items="${ids }" var="id">
			ids.push(${id });
		</c:forEach>
		
		$("#bigFrame").attr("ondblclick","hideBigPicture()");
		function openBigPicture(id,index){
			$("#bigPicture").attr("src","/image/"+id);
			$("#bigFrame").attr("onclick","nextPicture("+index+")");
			$("#bigFrame").show();
		}
		function nextPicture(index){
			  if(index==ids.length-1){
				  openBigPicture(ids[0],0);
			  }else{
				  openBigPicture(ids[index+1],index+1);
			  }
			
		}
		function hideBigPicture(){
			$("#bigFrame").hide();
		}
	</script>
</html>