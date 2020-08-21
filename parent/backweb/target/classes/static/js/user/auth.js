/**
 * 
 */
$(function() {
	loadTable();
	
});

function loadTable() {
	$('#auth_tb').bootstrapTable({
		url : "/hoper/backweb/auth/page",
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
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
//	$(function(){
//		$("#auth_tb tr").click(function(){
//			$("#auth_tb tr").css("background","#fff");	
//			$(this).css("background","#B4E4E9");
//
//		})
//	});
}

var columns = [
	{
		field : "permissionCode",
		title : "权限编号",
		align : "center"
	}, {
		field : "permissionName",
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

var authValidator = $("#auth_form").validate({
	rules : {
		permissionCode : {
			"required" : true,
			"maxlength" : 8
		},
		permissionName : {
			"required" : true,
			"maxlength" : 50
		},
		enabled : "required"
	}
});

//var check = checkAuth("USER:UPDATE_PERMIMISSION");
var check = checkAuth("A1002");
function operateFormat(value, row, index) {
	var s = '';
	if (check)
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
			+ row.permissionCode + '\')">修改</button>';
	return s;
}

function openDialog() {
	$("#modalLabel").text("新增授权操作");
	$("#auth_form input").val("");
	$("#permissionCode").attr("disabled", false);
	$('#modal').modal();
}

function openUpdDialog(permissionCode) {
	jQuery.get("/hoper/backweb/auth/fetchAuth", {
		"permissionCode" : permissionCode
	}, function(data) {
		if (1 == data.code) {
			authValidator.resetForm();
			$("#auth_form input").val("");
			$("#permissionCode").attr("disabled", true);
			var rs = data.data;
			
			$("#auth_form").populateForm(rs);
			$("#modalLabel").text("修改授权操作");
			$('#modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveAuth() {
	if (!$("#auth_form").valid()) {
		return;
	}
	var json = $("#auth_form").serializeJson();
	var url = "/hoper/backweb/auth/add";
	if (pcg_fun.isEmpty(json.permissionCode)) {
		url = "/hoper/backweb/auth/update";
		json.permissionCode = $("#permissionCode").val();
	}
//	console.log(json);
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$("#auth_tb").bootstrapTable('refresh');
			$('#modal').modal("hide");
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}
