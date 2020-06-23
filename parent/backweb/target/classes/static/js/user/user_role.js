/**
 * 
 */
$(function() {
	console.log(userCodeParam);
	loadTable();
	loadExistsTable();
});

function loadTable() {
	$('#non_role_tb').bootstrapTable({
		url : "/hoper/backweb/jjsUserRole/notConfigured",
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
		url : "/hoper/backweb/jjsUserRole/alreadyConfigured",
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
		field : "roleName",
		title : "角色名称",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : configOperateFormat
	}
];
var existsColumns = [
	{
		field : "roleCode",
		title : "角色编号",
		align : "center"
	}, {
		field : "roleName",
		title : "角色名称",
		align : "center"
	}, {
		field : "status",
		title : "状态",
		align : "center",
		formatter : statusForamt
	}, {
//		field : "creator",
//		title : "创建人",
//		align : "center"
//	}, {
//		field : "createTime",
//		title : "创建时间",
//		align : "center",
//		formatter : jsonTimeForamt
//	}, {
//		field : "lastUpdUser",
//		title : "最新更新人",
//		align : "center"
//	}, {
//		field : "lastUpdTime",
//		title : "最新更新时间",
//		align : "center",
//		formatter : jsonTimeForamt
//	}, {
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
	json["userCode"] = userCodeParam;
	return json;
}

function queryUserParams(params) {
	var json = $("#query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	json["userCode"] = userCodeParam;
	return json;
}

function configOperateFormat(value, row, index) {
	var s = '<button type="button" class="btn btn-info btn-sm" onClick="configureRole(\''
		+ row.roleCode + '\')">添加</button>';
	return s;
}

function operateFormat(value, row, index) {
	var s = '';
	if ("EN" == row.status)
		s += '<button type="button" class="btn btn-danger btn-sm" onClick="disable('
			+ row.userCode + ',\'' + row.roleCode + '\')">注销</button>';
	else if ("DISA" == row.status)
		s += '<button type="button" class="btn btn-success btn-sm" onClick="enable('
			+ row.userCode + ',\'' + row.roleCode + '\')">激活</button>';
	return s;
}

function configureRole(roleCode) {
	jQuery.post("/hoper/backweb/jjsUserRole/add", {
		"userCode" : userCodeParam,
		"roleCode" : roleCode
	}, function(data) {
		if (1 == data.code) {
//			$("#modalLabel").text("修改用户");
			$("#non_role_tb").bootstrapTable('refresh');
			alert("SUCC");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function disable(userCode, roleCode) {
	jQuery.post("/hoper/backweb/jjsUserRole/disable", {
		"userCode" : userCode,
		"roleCode" : roleCode
	}, function(data) {
		if (1 == data.code) {
//			$("#modalLabel").text("修改用户");
			$("#exists_tb").bootstrapTable('refresh');
			alert("SUCC");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function enable(userCode, roleCode) {
	jQuery.post("/hoper/backweb/jjsUserRole/enable", {
		"userCode" : userCode,
		"roleCode" : roleCode
	}, function(data) {
		if (1 == data.code) {
//			$("#modalLabel").text("修改用户");
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