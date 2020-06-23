/**
 * 
 */
$(function() {
	loadTable();
	
	$("#permissionType").change(function() {
		var type = $("#permissionType").val();
		if (pcg_fun.isEmpty(type))
			return ;
		
		if ("M" == type) {
			$("#parent_div").show();
			$("#parentPermission").attr("disabled", false);
		} else if ("R" == type) {
			$("#parent_div").hide();
			$("#parentPermission").attr("disabled", true);
		}
	});
});

function loadTable() {
	$('#permission_tb').bootstrapTable({
		url : "/hoper/backweb/jjsPermission/page",
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
//		$("#permission_tb tr").click(function(){
//			$("#permission_tb tr").css("background","#fff");	
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
		field : "permissionType",
		title : "权限类型",
		align : "center",
		formatter : permissionTypeForamt
	}, {
		field : "parentPermission",
		title : "父级权限",
		align : "center"
//	}, {
//		field : "permissionUrl",
//		title : "权限标识",
//		align : "center"
	}, {
		field : "creator",
		title : "创建人",
		align : "center"
	}, {
		field : "createTime",
		title : "创建时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "lastUpdateUser",
		title : "最近更新人",
		align : "center"
	}, {
		field : "lastUpdateTime",
		title : "最近更新时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : operateFormat
	}
];

var roleValidator = $("#permission_form").validate({
	rules : {
		roleCode : {
			"required" : true,
			"utfmaxlength" : 8
		},
		roleName : {
			"required" : true,
			"utfmaxlength" : 50
		},
		status : "required"
	}
});

var check = checkAuth("USER:UPDATE_PERMIMISSION");
function operateFormat(value, row, index) {
	var s = '';
	if (check)
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
			+ row.permissionCode + '\')">修改</button>';
	return s;
}

function openDialog() {
	$("#modalLabel").text("新增权限");
	$("#permission_form input").val("");
	$("#permissionCode").attr("disabled", false);
	$('#modal').modal();
}

function openUpdDialog(permissionCode) {
	jQuery.get("/hoper/backweb/jjsPermission/getPermission", {
		"permissionCode" : permissionCode
	}, function(data) {
		if (1 == data.code) {
			roleValidator.resetForm();
			$("#permission_form input").val("");
			$("#permissionCode").attr("disabled", true);
			var rs = data.data;
			
			$("#permission_form").populateForm(rs);
			$("#modalLabel").text("修改权限");
			$('#modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function savePermission() {
	if (!$("#permission_form").valid()) {
		return;
	}
	var json = $("#permission_form").serializeJson();
	var url = "/hoper/backweb/jjsPermission/add";
	if (pcg_fun.isEmpty(json.permissionCode)) {
		url = "/hoper/backweb/jjsPermission/update";
		json.permissionCode = $("#permissionCode").val();
	}
	console.log(json);
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$("#permission_tb").bootstrapTable('refresh');
			$('#modal').modal("hide");
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var permissionTypeJson = {
	"M" : "菜单权限",
	"R": "操作权限"
};
function permissionTypeForamt(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	var rs = permissionTypeJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}