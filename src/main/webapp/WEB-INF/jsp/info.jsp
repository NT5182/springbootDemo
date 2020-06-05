<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>异常处理</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>

<script type="text/javascript"
	src="${APP_PATH }/static/js/jquery-1.12.4.min.js"></script>
<link
	href="${APP_PATH }/static/bootstrap-3.3.7-dist/css/bootstrap.min.css"
	rel="stylesheet">
<script
	src="${APP_PATH }/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
	<!-- 搭建异常页面 -->
	<!-- 异常摘要信息 -->
	<div class="container">
		<!-- 标题 -->
		<div class="row">
			<div class="col-lg-12">
				<h1>异常统一处理</h1>
				</br>
			</div>
		</div>


		<!-- 文本域 -->
		<label>错误</label>
		<textarea class="form-control" rows="1" readonly>${exception.err}</textarea>
		<label>错误原因</label>
		<textarea class="form-control" rows="1" readonly>${exception.message}</textarea>
		<label>错误发生时间</label>
		<textarea class="form-control" rows="1" readonly>${exception.timestamp}</textarea>
		<label>错误类型</label>
		<textarea class="form-control" rows="1" readonly>${exception.cause}</textarea>
		<label>请求路径</label>
		<textarea class="form-control" rows="1" readonly>${exception.url}</textarea>


		<!-- 详细异常 -->
		<!-- 带下拉条的下拉列表 -->
		<!-- StackTraceElement[]
		 private String declaringClass;
  		 private String methodName;
   		 private String fileName;
   		 private int    lineNumber; -->
		<!-- at com.zcz.controller.EmployeeController.test(EmployeeController.java:41) -->
		<label><h3>错误详细信息</h3></label> 
		<select multiple class="form-control" size="8" style="color: red; font-weight: 20;">
			<optgroup>
				<option>
				${exception.cause}: ${exception.message}
				</option>
				<c:forEach items="${exception.info }" var="stack">
					<option><span>
							at ${stack.getClassName()}.${stack.getMethodName()}
							.(${stack.getFileName()}: ${stack.getLineNumber()}) 
							</span>
					</option>
				</c:forEach>
			</optgroup>

		</select>
	</div>

</body>
</html>