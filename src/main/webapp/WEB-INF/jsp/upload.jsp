<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>上传图片</title>
<script type="text/javascript" src="/res/js/scripts/jquery-1.11.0.min.js"></script>
</head>
<body>
	<h3>本页可上传图片</h3>
	<form action="/image" method="post" enctype="multipart/form-data">
  		选择：<input type="file" name="file">
  			<input type="submit" value="提交">
  	</form>
	
</body>
	
</html>