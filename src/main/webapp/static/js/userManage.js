$('#info-grid').bootstrapTable({
	//method: 'post',                      //请求方式（*）
	pagination : true, //是否显示分页（*）
	sortable : false, //是否启用排序
	sortOrder : "asc", //排序方式
	sidePagination : "server",
	cache: false,//ie缓存
	//sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
	pageNumber : 1, //初始化加载第一页，默认第一页
	pageSize : 10, //每页的记录行数（*）
	pageList : [ 10, 25, 50, 100 ], //可供选择的每页的行数（*）
	strictSearch : true,
	showColumns : false, //是否显示所有的列
	minimumCountColumns : 2, //最少允许的列数
	//clickToSelect: true,                //是否启用点击选中行
	uniqueId : "ID", //每一行的唯一标识，一般为主键列
	cardView : false, //是否显示详细视图
	showFooter : false,
	clickToSelect : false,
	//responseHandler : responseHandler,
	singleSelect : true,// 单选checkbox
	queryParams : queryParams,
	columns : [{
		title : '',// 标题 可不加
		checkbox : true
	},{
		title : '序号',//标题  可不加
		formatter : function(value, row, index) {
			return index + 1;
		}
	}/*,{
		field : 'empId',
		title : '员工编号   '
	}*/,{
		field : 'empId',
		title : '统一认证编号   '
	}, {
		field : 'empName',
		title : '员工姓名'
	}, 
	{
		field : 'empCardType',
		title : '员工证件类型',
		selectName : 'REG_ETHNC'
		/*formatter : function(data) {
			if (data == "id") {
				data = "身份证"
			} else if (data == "jg") {
				data = "军官证"
			}else if (data == "hz") {
				data = "护照"
			}else if (data == "xs") {
				data = "学生证"
			}else if (data == "zz") {
				data = "暂住证"
			}
			return data;
		}*/
	}, 
	{
		field : 'empCardId',
		title : '员工证件号码'
	}, 
	{
		field : 'empPhone',
		title : '员工手机号'
	}, 
	{
		field : 'roleId',
		title : '岗位'
	},{
		field : 'empStatus',
		title : '员工状态',
		selectName : 'REG_USERSTATUS'
	/*	formatter : function(data) {
			if (data == "1") {
				data = "离职"
			} else if (data == "0") {
				data = "正常"
			}
			return data;
		}*/
	}, {
		field : 'checkGrade',
		title : '复核级别',
		selectName : 'REG_LEVEL'
	}]
});
// 查询传递的参数
function queryParams(params) {
	return {
		page : this.pageNumber,
		size : this.pageSize
	};
	
}
function responseHandler(res) {
	if (res.code == "1") {
		return {
			"rows" : res.rows,
			"total" : res.total
		};
	} else {
		return {
			"rows" : [],
			"total" : 0
		};
	}
}
$(function() {
	/* 页面加载信息 */
	loadInfo();
	/* 查询 */
	$("#query_btn").click(function() {
		alert("查询");
		queryPara();
	});
	/* 修改 */
	$("#edit_btn").click(function() {
		// alert("修改");
		// 获取所有被选中的记录
		var rows = $("#info-grid").bootstrapTable('getAllSelections');
		if (rows.length == 0) {
			alert("请先选择要修改的记录!");
			return false;
		}
		if (rows.length>1) {
			alert("只能选择一条进行修改!");
			$('#info-grid').bootstrapTable('uncheckAll');	
			return false;
		}
		$("#btnType").val("update");
		layer.open({
			type : 2,
			title : '修改员工信息',
			shadeClose : true,
			shade : 0.5,
			area : [ '700px', '350px' ],
			content : "user/userManageInfo.jsp" // iframe的url
		});
	});
	/* 新增 */
	$("#add_btn").click(function() {
		// alert("新增");
		$("#btnType").val("add");
		layer.open({
			type : 2,
			title : '新增员工信息',
			shadeClose : true,
			shade : 0.5,
			area : [ '700px', '350px' ],
			content : "user/userManageInfo.jsp" // iframe的url
		});
	});
	/* 删除 */
	$("#delete_btn").click(function() {
		//删除
		deletePara();
	});
});
/* 页面加载信息 */
function loadInfo() {
	
}
/*查询*/
function queryPara() {
	 if($("#empId").val()!=null&&$("#empId").val().length>0){
	    	queryById();
	    	return;
	 }
	// 加载遮罩
	var layMsg = layer.msg('正在查询，请稍等', {
		icon : 16,
		shade : [ 0.5, '#f5f5f5' ],
		scrollbar : false
	});
	// 先销毁表格
	$('#info-grid').bootstrapTable('removeAll');
	// 查询默认加载第一页
	var options = $('#info-grid').bootstrapTable('getOptions');
	options.pageNumber = 1;// 默认加载第一页
	// 处理返回的结果
	options.responseHandler = function(res) {
		// 关闭遮罩
		layer.close(layMsg);
		return responseHandler(res);
	}
	$("#info-grid").bootstrapTable('refresh', {
		url : getProjectName() + "/reg/userManage/queryAll",
		method : 'post'
	});
}
function queryById(){
	// 先销毁表格
	$('#info-grid').bootstrapTable('removeAll');
	$.ajax({
		type : 'post',
		url : getProjectName() + "/reg/userManage/query",
		async : false,
		data : {
			empId :$("#empId").val()
		},
		success : function(data) {
			var retCode = data.code;
			if (retCode == '1') {
				//alert(data.emp);
				var arr=[];
				arr.push(data.emp);
				var obj={
						"rows" : arr,
						"total" : arr.length	
				}
				$("#info-grid").bootstrapTable('load', obj);
			} 
		},
		error : function(msg) {
			layer.alert("操作失败");
		},
		dataType : 'json'
	});
}
/*删除*/
function deletePara() {
	// 获取所有被选中的记录
	var rows = $("#info-grid").bootstrapTable('getAllSelections');
	if (rows.length == 0) {
		alert("请先选择要删除的记录!");
		return;
	}
	var id=rows[0]['empId'];
	var index = layer.confirm("本次共删除" + rows.length + "条信息，是否确认删除？", function() {
		layer.close(index);
		$.ajax({
			type : 'post',
			url : getProjectName() + "/reg/userManage/delete",
			async : false,
			data : {
				empId :id
			},
			success : function(data) {
				var retCode = data.code;
				if (retCode == '1') {
					alert("删除成功");
					// 重新加载数据
					$("#query_btn").click();
				} else {
					layer.alert("删除失败");
				}
			},
			error : function(msg) {
				layer.alert("操作失败");
			},
			dataType : 'json'
		});
	});
}