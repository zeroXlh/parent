/**
 * 
 */
var departments = {};
$(function() {
//	var tempArray = [{"value":"ALL","text":"全部"}].concat(companyCombo);
//	pcg_fun.loadCommonData("#company_q", tempArray, "value", "text", null);
//	pcg_fun.loadCommonData("#company", tempArray, "value", "text", null);
	
//	pcg_fun.loadCommon("#department", "/hoper/backweb/product/getProducts", {
//		
//	}, "id", "period");
	
	jQuery.get("/hoper/backweb/department/valid", {}, function(data) {
		if (1 == data.code) {
			var depts = data.data;
			var html = "<option value=''>---请选择---</options>";
			for (var i = 0; i < depts.length;i++) {
				html += "<option value='" + depts[i].deptCode + "'>"
						+ depts[i].deptName + "</option>";
				departments[depts[i].deptCode] = depts[i].deptName;
			}
			$("#department").html(html);
			$("#departmentQuery").html(html);
			
			loadTable();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
});

function loadTable() {
	$('#list').bootstrapTable({
		url : "/hoper/backweb/user/page",
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
		$("#list tr").click(function(){
			$("#list tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});
}

var columns = [
	{
		field : "userId",
		title : "用户编号",
		align : "center"
	}, {
		field : "userName",
		title : "用户名",
		align : "center"
	}, {
		field : "realname",
		title : "姓名",
		align : "center"
	}, {
		field : "userType",
		title : "用户类型",
		align : "center"
//		formatter : userTypeForamt
	}, {
		field : "phoneNo",
		title : "手机号",
		align : "center"
	}, {
		field : "deptCode",
		title : "部门",
		align : "center"
//		formatter : departmentForamt
	}, {
		field : "company",
		title : "所属公司",
		align : "center",
		formatter : companyFormat
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
		field : "creator",
		title : "创建人",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "center",
		formatter : operateFormat
	}
];

var userValidator = $("#user_form").validate({
	rules : {
		userName : {
			"required" : true,
			"maxlength" : 20
		},
		realname : {
			"required" : true,
			"maxlength" : 20
		},
		password : "required",
		rePassword : {
			"required" : true,
			equalTo : "#password"
		},
		userType : "required",
		deptCode : "required",
		status : "required"
	},
	messages : {
		rePassword : {
			required : "必选字段",
			equalTo : "确认密码与密码不一致"
		} 
	}
});

var checkUpd = checkAuth("A1011");
var checkReset = checkAuth("USER:RESET_USER");
var checkEnable = checkAuth("A1012");
var checkConfig = checkAuth("A1020");
function operateFormat(value, row, index) {
	var s ='';
	if (checkUpd)
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog('
			+ row.userId + ')">修改</button>';
	if(checkReset){
        s += '&nbsp;&nbsp;<button type="button" class="btn btn-success btn-sm" onClick="resetPass('
            + row.userId + ')">密码重置</button>';
	}
	if (checkEnable) {
		if (row.enabled)
			s += '<button type="button" class="btn btn-danger btn-sm tb_btn" onClick="enableOrDisable('
				+ row.userId  + ',' + row.enabled +')">禁用</button>';
		else
			s += '<button type="button" class="btn btn-success btn-sm tb_btn" onClick="enableOrDisable('
				+ row.userId  + ',' + row.enabled +')">启用</button>';
	}
	
	if (checkConfig)
		s += '<button type="button" class="btn btn-warning btn-sm tb_btn" onClick="toUserRole('
			+ row.userId +', \'' + row.userName + '\')">配置角色</button>';
	
	return s;
}

function enableOrDisable(userId, enabled) {
	jQuery.post("/hoper/backweb/user/update", {
		"userId" : userId,
		"enabled" : !enabled
	}, function(data) {
		if (1 == data.code) {
			$("#list").bootstrapTable('refresh');
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function toUserRole(userId, userName) {
	refreshto("/hoper/backweb/user/userRole?userIdParam=" + userId + "&userName=" + userName);
}

function openDialog() {
	$("#passwordDiv").show();
	$("#rePasswordDiv").show();
	$("#password").attr("disabled", false);
	$("#rePassword").attr("disabled", false);
	$("#userName").attr("disabled", false);
	
	$("#modalLabel").text("新增用户");
	$("#user_form input").val("");
	$('#modal').modal();
}

function resetPass(userId) {
    jQuery.get("/hoper/backweb/user/reset", {
        "userId" : userId
    }, function(data) {
        if (1 == data.code) {
            alert("重置成功，密码是123456");
        } else if (0 == data.code) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
};

function openUpdDialog(userId) {
	jQuery.get("/hoper/backweb/user/findByPrimary", {
		"userId" : userId
	}, function(data) {
		if (1 == data.code) {
			userValidator.resetForm();
			$("#user_form input").val("");
			
			$("#passwordDiv").hide();
			$("#rePasswordDiv").hide();
			$("#password").attr("disabled", true);
			$("#rePassword").attr("disabled", true);
			$("#userName").attr("disabled", true);
			
			var rs = data.data;
			$("#user_form").populateForm(rs);
			$("#modalLabel").text("修改用户");
			$('#modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveUser() {
	if (!$("#user_form").valid()) {
		return;
	}
	var json = $("#user_form").serializeJson();
	var url = "/hoper/backweb/user/update";
	if (pcg_fun.isEmpty(json.userId)) {
		url = "/hoper/backweb/user/add";
		json.password = hex_md5(json.password).toUpperCase();
	}
//	console.log(json);
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$("#list").bootstrapTable('refresh');
			$('#modal').modal("hide");
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function userTypeForamt(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	if (0 == value)
		return "普通用户";
	else if (1 == value)
		return "管理员用户";
	return value;
}

function departmentForamt(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	
	var val = departments[value];
	if (pcg_fun.isEmpty(val))
		return value;
	
	return val;
}
