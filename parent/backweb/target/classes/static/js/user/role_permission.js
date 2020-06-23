/**
 * 
 */
$(function() {
	loadTable();
	loadExistsTable();
});

function loadTable() {
	$('#permission_tb').bootstrapTable({
		url : "/hoper/backweb/jjsRolePermission/notExistsPermissions",
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
		url : "/hoper/backweb/jjsRolePermission/existsPermissions",
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
		field : "permissionName",
		title : "权限名称",
		align : "center"
	}, {
		field : "permissionType",
		title : "权限类型",
		align : "center"
//		formatter : statusForamt
	}, {
		field : "parentPermission",
		title : "父级权限",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : conOperateFormat
	}
];
var existsColumns = [
	{
		field : "permissionCode",
		title : "权限编号",
		align : "center"
	}, {
		field : "permissionName",
		title : "权限名称",
		align : "center"
	}, {
		field : "permissionType",
		title : "权限类型",
		align : "center"
//		formatter : statusForamt
	}, {
		field : "parentPermission",
		title : "父级权限",
		align : "center"
	}, {
		field : "status",
		title : "状态",
		align : "center",
		formatter : statusForamt
	}, {
		field : "void",
		title : "操作",
		align : "left",
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

function conOperateFormat(value, row, index) {
	var s = '<button type="button" class="btn btn-info btn-sm" onClick="addPermission(\''
		+ row.permissionCode + '\')">添加</button>';
	return s;
}

function operateFormat(value, row, index) {
	var s = '';
	if ("EN" == row.status)
		s += '<button type="button" class="btn btn-danger btn-sm" onClick="disable(\''
			+ row.roleCode + '\',\'' + row.permissionCode + '\', 1)">注销</button>';
	else if ("DISA" == row.status)
		s += '<button type="button" class="btn btn-success btn-sm" onClick="enable(\''
			+ row.roleCode + '\',\'' + row.permissionCode + '\', 2)">激活</button>';
	return s;
}

function addPermission(permissionCode) {
	jQuery.post("/hoper/backweb/jjsRolePermission/add", {
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
	jQuery.post("/hoper/backweb/jjsRolePermission/batchAdd", {
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

function enable(roleCode, permissionCode) {
	jQuery.post("/hoper/backweb/jjsRolePermission/enable", {
		"roleCode" : roleCode,
		"permissionCode" : permissionCode,
	}, function(data) {
		if (1 == data.code) {
			$("#already_table").bootstrapTable('refresh');
			alert("启用成功！");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, 'json');
}

function disable(roleCode, permissionCode) {
	jQuery.post("/hoper/backweb/jjsRolePermission/disable", {
		"roleCode" : roleCode,
		"permissionCode" : permissionCode,
	}, function(data) {
		if (1 == data.code) {
			$("#already_table").bootstrapTable('refresh');
			alert("注销成功！");
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