/**
 * 
 */

//
var params = [];
$(function () {
	loadTable();
	
	$("#paramLevel").change(function(){
		var paramLevel = $("#paramLevel").val();
		if (pcg_fun.isEmpty(paramLevel))
			return;
		if (paramLevel < 1 || 3 < paramLevel) {
			alert("目前参数级别只支持1、2、3");
			return;
		}
		$("#parentCode").attr("disabled", 1 == paramLevel);
		if (1 == paramLevel) {
			$("#parentCode").val("");
			$("#paramType").attr("readonly", false);
		} else {
			loadParamCombo({
				"status" : 1,
				"paramLevel" : paramLevel - 1
			}, null);
		}
	});
	
	$("#parentCode").change(function() {
		$("#paramType").attr("readonly", true);
		$("#paramType").val($("#parentCode").find(":selected").attr("param_type"));
	});
});

function loadParamCombo(params, callback) {
	jQuery.get("/hoper/backweb/param/getParams", params, function(data) {
		if (1 == data.code) {
			params = data.data;
			var html = "<option value=''>---请选择---</option>";
			for (var i = 0; i < params.length; i++) {
				var row = params[i];
				html += "<option param_type='" + row.paramType + "' value='" + row.paramCode + "'>" + row.paramCode + "-" + row.paramValue + "</option>";
			}
			$("#parentCode").html(html);
			if (null != callback && undefined != callback)
				callback();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, 'json');
}

var columns = [
    {
        field: 'id',
        title: '参数编号',
        align : 'center'
    }, {
    	field: 'paramType',
    	title: '参数类型',
        align : 'center'
    }, {
        field: 'paramCode',
        title: '参数编码',
        align : 'center'
    }, {
    	field: 'paramDesc',
    	title: '参数描述',
    	align : 'center'
    }, {
    	field: 'paramValue',
    	title: '参数值',
        align : 'center'
    }, {
    	field: 'parentCode',
    	title: '上一级参数',
        align : 'center'
    }, {
    	field: 'paramLevel',
    	title: '参数级别',
    	align : 'center'
    }, {
    	field: 'status',
    	title: '状态',
        align : 'center',
        formatter : paramStatusFormat
    }, {
    	field: 'createTime',
    	title: '创建时间',
        align : 'center',
    	formatter : jsonTimeFormat
    }, {
    	field: 'creator',
    	title: '创建人',
    	align : 'center'
    }, {
    	field: 'lastUpdateTime',
    	title: '最后更新时间',
        align : 'center',
    	formatter : jsonTimeFormat
    }, {
    	field: 'lastUpdateUser',
    	title: '最后更新人',
        align : 'center'
    }, {
    	field: 'void',
    	title: '操作',
        align : 'left',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#param_tb').bootstrapTable({
		url : "/hoper/backweb/param/page",
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
		$("#param_tb tr").click(function(){
			$("#param_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

var checkAuthParam = checkAuth("PARAM:MODIFY_PARAM");
function operateFormat(value, row, index) {
	// 修改
	if (checkAuthParam)
		return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
				+ row.id + '\')">修改</button>';
	return "";
}

function openDialog() {
	validator.resetForm();
	$("#param_form").clearForm();
	disInput(false);
	$("#paramType").attr("readonly", false);
	
	$("#myModalLabel").text("新增参数");
	$('#paramModal').modal();
}

function disInput(flag) {
	$("#paramLevel").attr("disabled", flag);
	$("#parentCode").attr("disabled", flag);
	$("#paramType").attr("disabled", flag);
	$("#paramCode").attr("disabled", flag);
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/param/getParameter", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#param_form").clearForm();
			disInput(true);
			loadParamCombo({
				"status" : 1,
				"paramLevel" : data.data.paramLevel - 1
			}, null);
			
			$("#param_form").populateForm(data.data);
			$("#myModalLabel").text("修改参数");
			$('#paramModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveParam() {
	if (!$("#param_form").valid()) {
		return;
	}
	var json = $("#param_form").serializeJson();
	if (json.paramLevel > 1 && pcg_fun.isEmpty(json.parentCode)) {
		alert("请选择父级参数");
		return;
	}
	
	var url = "/hoper/backweb/param/add";
	if (!pcg_fun.isEmpty(json.id))
		url = "/hoper/backweb/param/update";
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$('#paramModal').modal('hide');
			$("#param_tb").bootstrapTable('refresh');
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#param_form").validate({
	ignore: "",
	rules : {
		paramLevel : {
			"required" : true,
			utfmaxlength : 60
		},
		parentCode : "required",
		paramType : "required",
		paramCode : "required",
		paramDesc : "required",
		status : "required"
	}
});

function paramStatusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	if (1 == value)
		return "正常";
	else if (2 == value)
		return "停用";
	return value;
}
