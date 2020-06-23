/**
 * 
 */

//
var params = [];
$(function () {
	loadTable();
});

var columns = [
    {
        field: 'orgCode',
        title: '机构编号',
        align : 'center'
    }, {
    	field: 'orgName',
    	title: '机构名称',
        align : 'center'
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
	$('#org_tb').bootstrapTable({
		url : "/hoper/backweb/param/org/page",
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
}

var checkAuthParam = checkAuth("PARAM:MODIFY_PARAM");
function operateFormat(value, row, index) {
	// 修改
	if (checkAuthParam)
		return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
				+ row.orgCode + '\')">修改</button>';
	return "";
}

function openDialog() {
	validator.resetForm();
	$("#org_form").clearForm();
	disInput(false);
	
	$("#myModalLabel").text("新增银行机构");
	$('#orgModal').modal();
}

function disInput(flag) {
	$("#orgCode").attr("disabled", flag);
}

function openUpdDialog(orgCode) {
	jQuery.get("/hoper/backweb/param/org/getOrganization", {
		"orgCode" : orgCode
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#org_form").clearForm();
			disInput(true);
			
			$("#org_form").populateForm(data.data);
			$("#myModalLabel").text("修改银行机构");
			$('#orgModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveOrg() {
	if (!$("#org_form").valid()) {
		return;
	}
	var json = $("#org_form").serializeJson();
	var url = "/hoper/backweb/param/org";
	if (pcg_fun.isEmpty(json.orgCode)) {
		url += "/update";
		json.orgCode = $("#orgCode").val();
	} else
		url += "/add";
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$('#orgModal').modal('hide');
			$("#org_tb").bootstrapTable('refresh');
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#org_form").validate({
	ignore: "",
	rules : {
		orgCode : {
			"required" : true,
			utfmaxlength : 8
		},
		orgName : {
			"required" : true,
			utfmaxlength : 200
		}
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
