/**
 * 
 */

//
var isHolidayCombo = [
	{"code" : "Y","text":"是"},
	{"code" : "N","text":"否"}
];
$(function () {
	pcg_fun.loadCommonData("#isHoliday", isHolidayCombo, "code", "text", null);
	pcg_fun.loadCommonData("#isHoliday_q", isHolidayCombo, "code", "text", null);
	
	loadTable();
});

var columns = [
    {
        field: 'id',
        title: '编号',
        align : 'center'
    }, {
    	field: 'holiday',
    	title: '节假日',
        align : 'center'
    }, {
    	field: 'isHoliday',
    	title: '是否节假日',
        align : 'center',
    	formatter : isHolidayFormat
    }, {
    	field: 'description',
    	title: '描述',
    	align : 'center'
    }, {
    	field: 'creator',
    	title: '创建人',
        align : 'center'
    }, {
    	field: 'createTime',
    	title: '创建时间',
        align : 'center',
        formatter : jsonTimeFormat
    }, {
    	field: 'void',
    	title: '操作',
        align : 'center',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#holiday_tb').bootstrapTable({
		url : "/zcthd/backweb/param/holiday/page",
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
				+ row.id + '\')">修改</button>';
	return "";
}

function openDialog() {
	validator.resetForm();
	$("#holiday_form").clearForm();
	disInput(false);
	
	$("#myModalLabel").text("新增节假日");
	$('#holidayModal').modal();
}

function disInput(flag) {
	$("#holiday").attr("disabled", flag);
}

function openUpdDialog(id) {
	jQuery.get("/zcthd/backweb/param/holiday/getHoliday", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#holiday_form").clearForm();
			disInput(true);
			
			$("#holiday_form").populateForm(data.data);
			$("#myModalLabel").text("修改节假日");
			$('#holidayModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveHoliday() {
	if (!$("#holiday_form").valid()) {
		return;
	}
	var json = $("#holiday_form").serializeJson();
	var url = "/zcthd/backweb/param/holiday";
	if (pcg_fun.isEmpty(json.id)) {
		url += "/add";
	} else
		url += "/update";
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$('#holidayModal').modal('hide');
			$("#holiday_tb").bootstrapTable('refresh');
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#holiday_form").validate({
	ignore: "",
	rules : {
		holiday : "required"
	}
});

function isHolidayFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	if ("Y" == value)
		return "是";
	else if ("N" == value)
		return "否";
	return value;
}
