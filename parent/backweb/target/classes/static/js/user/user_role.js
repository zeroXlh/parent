/**
 * 
 */
$(function() {
	console.log(userIdParam);
	loadTable();
	loadExistsTable();
});

function loadTable() {
	$('#non_role_tb').bootstrapTable({
		url : "/hoper/backweb/userRole/pageNonAuth",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 10, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [10, 25, 50, 100],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryUserParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
	$(function(){
		$("#non_role_tb tr").click(function(){
			$("#non_role_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});
}

function loadExistsTable() {
	$('#exists_tb').bootstrapTable({
		url : "/hoper/backweb/userRole/pageAuth",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 10, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [10, 25, 50, 100],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: alreadyQueryParams,//设置查询时候的参数，传递参数（*）
        columns: existsColumns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
//	$(function(){
//		$("#exists_tb tr").click(function(){
//			$("#exists_tb tr").css("background","#fff");	
//			$(this).css("background","#B4E4E9");
//
//		})
//	});
}

var columns = [
	{
		field : "roleCode",
		title : "角色编号",
		align : "center"
	}, {
		field : "role.roleName",
		title : "角色名称",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : authRoleFormat
	}
];
var existsColumns = [
	{
		field : "roleCode",
		title : "角色编号",
		align : "center"
	}, {
		field : "role.roleName",
		title : "角色名称",
		align : "center"
	}, {
		field : "enabled",
		title : "是否启用",
		align : "center",
		formatter : enabledFormat
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : operateFormat
	}
	];

function searchUserRole() {
	var options = $("#non_role_tb").bootstrapTable('getOptions');
	$("#non_role_tb").bootstrapTable('refresh', { query : queryUserParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})});
}

function searchExists() {
	var options = $("#exists_tb").bootstrapTable('getOptions');
	$("#exists_tb").bootstrapTable('refresh', { query : alreadyQueryParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})});
}

function alreadyQueryParams(params) {
	var json = $("#already_query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	json["userId"] = userIdParam;
	return json;
}

function queryUserParams(params) {
	var json = $("#query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	json["userId"] = userIdParam;
	return json;
}

function authRoleFormat(value, row, index) {
	var s = '<button type="button" class="btn btn-info btn-sm" onClick="authRole(\''
		+ row.roleCode + '\')">添加</button>';
	return s;
}

function operateFormat(value, row, index) {
	if (row.enabled)
		return '<button type="button" class="btn btn-danger btn-sm" onClick="enableOrDisable('
			+ row.userId + ',\'' + row.roleCode + '\',' + row.enabled + ')">禁用</button>';
	else
		return '<button type="button" class="btn btn-success btn-sm" onClick="enableOrDisable('
			+ row.userId + ',\'' + row.roleCode + '\',' + row.enabled + ')">启用</button>';
}

function authRole(roleCode) {
	jQuery.post("/hoper/backweb/userRole/add", {
		"userId" : userIdParam,
		"roleCode" : roleCode
	}, function(data) {
		if (1 == data.code) {
			$("#non_role_tb").bootstrapTable('refresh');
			alert("SUCC");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function enableOrDisable(userId, roleCode, enabled) {
	jQuery.post("/hoper/backweb/userRole/update", {
		"userId" : userId,
		"roleCode" : roleCode,
		"enabled" : !enabled
	}, function(data) {
		if (1 == data.code) {
			$("#exists_tb").bootstrapTable('refresh');
			alert("SUCC");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function back() {
	refreshto("/hoper/backweb/user/user");
}