/**
 * 
 */
$(function() {
	loadTable();
});

function loadTable() {
	$('#list').bootstrapTable({
		url : "/hoper/backweb/jjsDepartment/page",
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
		field : "deptCode",
		title : "部门编号",
		align : "center"
	}, {
		field : "deptName",
		title : "部门名称",
		align : "center"
	}, {
		field : "deptLeader",
		title : "部门负责人",
		align : "center"
	}, {
		field : "status",
		title : "状态",
		align : "center",
		formatter : statusForamt
	}, {
		field : "createTime",
		title : "创建时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "creator",
		title : "创建人",
		align : "center"
	}, {
		field : "lastUpdateTime",
		title : "最后更新时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "lastUpdateUser",
		title : "最后更新人",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : operateFormat
	}
];

var deptValidator = $("#dept_form").validate({
	rules : {
		deptCode : {
			"required" : true,
			"utfmaxlength" : 8
		},
		deptName : {
			"required" : true,
			"utfmaxlength" : 100
		},
//		deptLeader : "required",
		status : "required"
	}
});

var checkUpd = checkAuth("USER:UPDATE_DEPARTMENT");
var checkEnable = checkAuth("USER:ENABLE_OR_DISABLE_DEPARTMENT");
function operateFormat(value, row, index) {
	var s ='';
	if (checkUpd)
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
			+ row.deptCode + '\')">修改</button>';
	
	if (checkEnable) {
		if ("EN" == row.status)
			s += '&nbsp;&nbsp;<button type="button" class="btn btn-danger btn-sm" onClick="disable(\''
				+ row.deptCode  + '\')">注销</button>';
		else if ("DISA" == row.status)
			s += '&nbsp;&nbsp;<button type="button" class="btn btn-success btn-sm" onClick="enable(\''
				+ row.deptCode + '\')">激活</button>';
	}
	
	return s;
}

function enable(deptCode) {
	jQuery.post("/hoper/backweb/jjsDepartment/enable", {
		"deptCode" : deptCode
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

function disable(deptCode) {
	jQuery.post("/hoper/backweb/jjsDepartment/disable", {
		"deptCode" : deptCode
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

function openDialog() {
	$("#deptCode").attr("disabled", false);
	
	$("#modalLabel").text("新增部门");
	$("#dept_form input").val("");
	$('#modal').modal();
}

function openUpdDialog(deptCode) {
	jQuery.get("/hoper/backweb/jjsDepartment/getDepartmentById", {
		"deptCode" : deptCode
	}, function(data) {
		if (1 == data.code) {
			deptValidator.resetForm();
			$("#dept_form input").val("");
			
			$("#deptCode").attr("disabled", true);
			
			var rs = data.data;
			$("#dept_form").populateForm(rs);
			$("#modalLabel").text("修改部门");
			$('#modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveDepartment() {
	if (!$("#dept_form").valid()) {
		return;
	}
	var json = $("#dept_form").serializeJson();
	var url = "/hoper/backweb/jjsDepartment/add";
	if (pcg_fun.isEmpty(json.deptCode)) {
		json.deptCode = $("#deptCode").val();
		url = "/hoper/backweb/jjsDepartment/update";
	}
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
