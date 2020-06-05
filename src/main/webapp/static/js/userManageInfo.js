$(function() {
	/* 页面加载信息 */
	loadInfo();
	/* 修改 */
	$("#edit_btn").click(function() {
		// alert("修改");

		checkPara("update");
	});
	/* 新增 */
	$("#add_btn").click(function() {
		// alert("新增");
		checkPara("insert");
	});
	/* 清除 */
	$("#clean_btn").click(function() {
		cleanAll();
	});
	/* 显示密码框 */
	$("#verifyWay").change(function() {
		var type = $(this).val();
		if (type == "1") {
			$("#pw_div").show();
		} else {
			$("#pw_div").hide();
		}
	});
	$("#empId").blur(function() {
		// 验证机构号
		var empId = $(this).val();
		checkEmpCodeRepeat(empId);
	});
	$("#orgId").blur(function() {
		// 验证机构号
		var orgId = $(this).val();
		checkOrgId(orgId);
	});
});
/* 页面加载信息 */
function loadInfo() {
	loadRole();
	var btnType = parent.$("#btnType").val();
	if (btnType == "add") {
		$("#add_fun_btn").show();
		$("#update_fun_btn").hide();
	} else if (btnType == "update") {
		$("#update_fun_btn").show();
		$("#add_fun_btn").hide();
		$("#empId").attr("disabled", true);
		// 加载数据
		var rows = parent.$("#info-grid").bootstrapTable('getAllSelections');
		setPara(rows[0]);
	}
}
/* 加载岗位 */
function loadRole() {
	// 加载所有的岗位
	$("#roleId").html("");
	var roleStr = "<option value=''></option>";
	$.ajax({
		type : 'post',
		url : getProjectName() + "/reg/roleManage/page",
		async : false,
		data : {
			page : "all"
		},
		success : function(data) {
			var retCode = data.code;
			if (retCode == '1') {
				var rows = data.rows;
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					roleStr += "<option value=" + row.roleId + ">"
							+ row.roleName + "</option>";
				}
				$("#roleId").html(roleStr);
			}
		},
		dataType : 'json'
	});

}
/* 验证机构号 */
function checkEmpCodeRepeat(empId) {
	$.ajax({
		type : 'post',
		url : getProjectName() + "/reg/userManage/query",
		async : false,
		data : {
			page : 1,
			empId : empId
		},
		success : function(data) {
			var retCode = data.code;
			if (retCode == '1') {
				addRedTip($("#empId"), "此员工已存在");
			} else {
				removeRedTip($("#empId"));
			}
		},
		dataType : 'json'
	});
}
/* 验证机构号 */
function checkOrgId(orgId) {
	$.ajax({
		type : 'post',
		url : getProjectName() + "/reg/organizationManage/query",
		async : false,
		data : {
			page : 1,
			orgId : orgId
		},
		success : function(data) {
			var retCode = data.code;
			if (retCode == '0') {
				addRedTip($("#orgId"), "机构编号不合法");
			} else {
				removeRedTip($("#orgId"));
			}
		},
		dataType : 'json'
	});
}
/* 操作功能 增删改查 */
function checkPara(operateType) {
	var objData = {};// 定义ajax请求参数变量
	// 传入参数取值
	if (operateType == "query" || operateType == "delete") {

	} else {
		// 新增或者修改
		var needflag = ckNeed();// 校验必填项。如带有*的输入项未输入值，则添加红框，反之则移除红框
		if (needflag == false || hasTip()) {
			return;
		}
		// 表单取值
		var emp=new Object();
		emp = getFormData();
		delete emp.roleId;
		var role=new Object();
		role.roleId = $('#roleId').val();
		
		objData=JSON.stringify({
			employee:emp,
			caprole:role
		});
		// 本地验证才需要密码
		if ($("#verifyWay").val() == "1") {
			var password = $('#pwd').val();
			var oldPwd = $("#pwd").data("pwd");
			// md5 加密
			if (password != null && password != "") {
				removeRedTip($("#pwd"));
				if (password != oldPwd) {
					password = hex_md5(password);
				}
				objData.pwd = password;
			} else {
				addRedTip($("#pwd"), "密码不能为空");
				return;
			}
		} else {
			delete objData.pwd;
		}
		// objData.roleId = 1;
	}
	// 加遮罩
	var layerMsg = layer.msg('正在处理....', {
		time : 600000,
		shade : [ 0.3 ]
	});
	var url;
	if (operateType == "update") {
		url = getProjectName() + "/reg/userManage/update";
	} else if (operateType == "insert") {
		url = getProjectName() + "/reg/userManage/add";
	}
	$.ajax({
		type : 'post',
		url : url,
		data : objData,
		contentType:"application/json",
		timeout : 6000,
		success : function(data) {
			layer.close(layerMsg);// 关闭遮罩
			if (data != null) {
				if (data.faultCode) {
					alert(data.faultString);
					return;
				}
				var retCode = data.code;
				if (retCode == '1') {
					if (operateType == "update") {
						alert("修改成功");
					} else if (operateType == "insert") {
						alert("新增成功");
					}
					parent.$("#query_btn").click();
					var index = parent.layer.getFrameIndex(window.name);
					setTimeout(function() {
						parent.layer.close(index);
					}, 100);
					return;
				} else {
					// 统一显示核心错误提示信息
					showError(operateType);
				}
			} else {
				// 核心未返回:统一错误提示信息
				alert("网络连接失败");
			}

		},
		error : function(msg) {
			layer.close(layerMsg);// 关闭遮罩
			alert("操作失败");
		},
		dataType : 'json'
	});
}
/* 查询赋值 */
function setPara(para) {
	cleanForm();
	// 表单 赋值
	setFormData(para);
	// 显示密码
	if (para.verifyWay == "1") {
		$("#pw_div").show();
		$("#pwd").data("pwd", para.pwd);
		$("#pwd").val(para.pwd);
		$("#verifyWay").change();
	} else {
		$("#pw_div").hide();
	}
	// 设置岗位
	setTimeout(function() { 
		$("#roleId").selectVal(para.roleId);
		$("#checkGrade").selectText(para.checkGrade);
		$("#empCardType").selectText(para.empCardType);
		$("#empStatus").selectText(para.empStatus);
		$("#verifyWay").selectVal(para.verifyWay);
		
	},100);
}
/* 显示错误信息 */
function showError(operateType) {
	if (operateType == "update") {
		alert("修改失败");
	} else if (operateType == "insert") {
		alert("新增失败");
	}
}
/* 信息清空 */
function cleanForm() {
	$("#data_form")[0].reset();// 详细信息清空
	// 下拉框清空
	$("select").selectClear();
}
function cleanAll() {
	$("input[type=text]").val("");
	cleanForm();
	removeAllTip();// 移除红框
	// 隐藏密码框
	$("#pw_div").hide();
}