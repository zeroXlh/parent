/**
 * 
 */
$(function() {
	loadTable();
});

function loadTable() {
	$('#role_tb').bootstrapTable({
		url : "/hoper/backweb/role/page",
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
	$(function(){
		$("#role_tb tr").click(function(){
			$("#role_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});
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
		field : "enabled",
		title : "是否启用",
		align : "center",
		formatter : enabledFormat
	}, {
		field : "createTime",
		title : "创建时间",
		align : "center"
//		formatter : jsonTimeFormat
	}, {
		field : "void",
		title : "操作",
		align : "center",
		formatter : operateFormat
	}
];

var roleValidator = $("#role_form").validate({
	rules : {
		roleCode : {
			"required" : true,
			"maxlength" : 4
		},
		roleName : {
			"required" : true,
			"maxlength" : 20
		},
		enabled : "required"
	}
});

var checkUpd = checkAuth("A1014");
var checkEnable = checkAuth("A1015");
var checkAuthMenu = checkAuth("A1021");
var checkAuthOperate = checkAuth("A1022");
function operateFormat(value, row, index) {
	var s = '';
	if (checkUpd)
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
			+ row.roleCode + '\')">修改</button>';
	
	if (checkEnable) {
		if (row.enabled)
			s += '<button  type="button" class="btn btn-danger btn-sm tb_btn" onClick="enableOrDisable(\''
				+ row.roleCode +'\',' + row.enabled +')">禁用</button>';
		else
			s += '<button type="button" class="btn btn-success btn-sm tb_btn" onClick="enableOrDisable(\''
				+ row.roleCode +'\',' + row.enabled +')">启用</button>';
	}
	
	if (checkAuthMenu)
		s += '<button type="button" class="btn btn-warning btn-sm tb_btn" onClick="toRoleMenu(\''
			+ row.roleCode +'\', \'' + row.roleName + '\')">授权菜单</button>';
	
	if (checkAuthOperate)
		s += '<button type="button" class="btn btn-warning btn-sm tb_btn" onClick="toRoleAuth(\''
			+ row.roleCode +'\', \'' + row.roleName + '\')">授权操作</button>';
	return s;
}

function enableOrDisable(roleCode, enabled) {
	console.log(roleCode);
	console.log(enabled);
	
	jQuery.post("/hoper/backweb/role/update", {
		"roleCode" : roleCode,
		"enabled" : !enabled
	}, function(data) {
		if (1 == data.code) {
			$("#role_tb").bootstrapTable('refresh');
			$('#modal').modal("hide");
			alert("SUCC");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function toRoleAuth(roleCode, roleName) {
//	openNewTab(id,url,title)
	refreshto("/hoper/backweb/user/roleAuth?roleCodeParam=" + roleCode + "&roleName=" + roleName);
}

function toRoleMenu(roleCode, roleName) {
	refreshto("/hoper/backweb/user/roleMenu?roleCodeParam=" + roleCode + "&roleName=" + roleName);
}

function openDialog() {
	$("#modalLabel").text("新增角色");
	$("#role_form input").val("");
	$("#roleCode").attr("disabled", false);
	$('#modal').modal();
}

function openUpdDialog(roleCode) {
	jQuery.get("/hoper/backweb/role/fetchByPrimary", {
		"roleCode" : roleCode
	}, function(data) {
		if (1 == data.code) {
			roleValidator.resetForm();
			$("#role_form input").val("");
			$("#roleCode").attr("disabled", true);
			var rs = data.data;
			
			$("#role_form").populateForm(rs);
			$("#modalLabel").text("修改用户");
			$('#modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveRole() {
	if (!$("#role_form").valid()) {
		return;
	}
	var json = $("#role_form").serializeJson();
	var url = "/hoper/backweb/role/add";
	if (pcg_fun.isEmpty(json.roleCode)) {
		url = "/hoper/backweb/role/update";
		json.roleCode = $("#roleCode").val();
	}
	console.log(json);
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$("#role_tb").bootstrapTable('refresh');
			$('#modal').modal("hide");
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}
