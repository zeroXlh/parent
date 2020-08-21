/**
 * 
 */
$(function() {
	loadTable();
	loadExistsTable();
});

function loadTable() {
	$('#permission_tb').bootstrapTable({
		url : "/hoper/backweb/roleAuth/pageNonAuth",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
//        singleSelect : true,
        clickToSelect : true,
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
        queryParams: queryPermissionParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
	$(function(){
		$("#permission_tb tr").click(function(){
			$("#permission_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});
}

function loadExistsTable() {
	$('#already_table').bootstrapTable({
		url : "/hoper/backweb/roleAuth/pageAuth",
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
        queryParams: queryExistsParams,//设置查询时候的参数，传递参数（*）
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
		field : "ck",
		checkbox : true,
		align : "center"
	}, {
		field : "permissionCode",
		title : "权限编号",
		align : "center"
	}, {
		field : "operateAuth.permissionName",
		title : "权限名称",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "center",
		formatter : authMenuFormat
	}
];
var existsColumns = [
	{
		field : "permissionCode",
		title : "权限编号",
		align : "center"
	}, {
		field : "operateAuth.permissionName",
		title : "权限名称",
		align : "center"
	}, {
		field : "enabled",
		title : "是否启用",
		align : "center",
		formatter : enabledFormat
	}, {
		field : "void",
		title : "操作",
		align : "center",
		formatter : operateFormat
	}
	];

function searchRolePre() {
	var options = $("#permission_tb").bootstrapTable('getOptions');
	$("#permission_tb").bootstrapTable('refresh', { query : queryPermissionParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})});
}

function searchExists() {
	var options = $("#already_table").bootstrapTable('getOptions');
	$("#already_table").bootstrapTable('refresh', { query : queryExistsParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})});
}

function queryExistsParams(params) {
	var json = $("#already_query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	json["roleCode"] = roleCodeParam;
	return json;
}

function queryPermissionParams(params) {
	var json = $("#query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	json["roleCode"] = roleCodeParam;
	return json;
}

function authMenuFormat(value, row, index) {
	var s = '<button type="button" class="btn btn-info btn-sm" onClick="authMenu(\''
		+ row.permissionCode + '\')">添加</button>';
	return s;
}

function operateFormat(value, row, index) {
	var s = '';
	if (row.enabled)
		s += '<button type="button" class="btn btn-danger btn-sm" onClick="enableOrDisable(\''
			+ row.roleCode + '\',\'' + row.permissionCode + '\',' + row.enabled + ')">禁用</button>';
	else
		s += '<button type="button" class="btn btn-success btn-sm" onClick="enableOrDisable(\''
			+ row.roleCode + '\',\'' + row.permissionCode + '\',' + row.enabled + ')">启用</button>';
	return s;
}

function authMenu(permissionCode) {
	jQuery.post("/hoper/backweb/roleAuth/add", {
		"roleCode" : roleCodeParam,
		"permissionCode" : permissionCode
	}, function(data) {
		if (1 == data.code) {
			$("#permission_tb").bootstrapTable('refresh');
			alert("SUCC");
			
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function batchConfigPermission() {
	var selections = $("#permission_tb").bootstrapTable('getSelections');
	if (selections.length == 0) {
		alert("请先选择权限");
		return;
	}
	
	var permissions = [];
	for (var i = 0; i < selections.length; i++) {
		permissions.push(selections[i].permissionCode);
	}
	jQuery.post("/hoper/backweb/roleAuth/batchAdd", {
		"permissions" : permissions.toString(),
		"roleCode" : roleCodeParam
	}, function(data){
		if (1 == data.code) {
			$("#permission_tb").bootstrapTable('refresh');
			alert("批量添加成功！");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function enableOrDisable(roleCode, permissionCode, enabled) {
	jQuery.post("/hoper/backweb/roleAuth/update", {
		"roleCode" : roleCode,
		"permissionCode" : permissionCode,
		"enabled" : !enabled
	}, function(data) {
		if (1 == data.code) {
			$("#already_table").bootstrapTable('refresh');
			alert("succ");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, 'json');
}

function back() {
	refreshto("/hoper/backweb/user/role");
}