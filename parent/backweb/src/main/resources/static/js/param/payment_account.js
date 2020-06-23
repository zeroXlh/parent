/**
 * 
 */

//
$(function () {
	loadTable();
});

var columns = [
    {
        field: 'accountCode',
        title: '账户编号',
        align : 'center'
    }, {
    	field: 'accountName',
    	title: '账户名',
        align : 'center'
    }, {
        field: 'bankCode',
        title: '银行卡号',
        align : 'center'
    }, {
    	field: 'bankInfo',
    	title: '开户行信息',
        align : 'center'
    }];

function loadTable() {
	$('#account_tb').bootstrapTable({
		url : "/hoper/backweb/jjsPaymentAccount/page",
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
		$("#account_tb tr").click(function(){
			$("#account_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function operateFormat(value, row, index) {
	// 修改
//	return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
//				+ row.accountCode + '\')">修改</button>';
	return '-';
}

function openDialog() {
	validator.resetForm();
	$("#account_form").clearForm();
	$("#myModalLabel").text("新增打款账户");
	$('#accountModal').modal();
}

//function openUpdDialog(id) {
//	jQuery.get("/hoper/backweb/param/getParameter", {
//		"id" : id
//	}, function(data) {
//		if (1 == data.code) {
//			validator.resetForm();
//			$("#account_form").clearForm();
//			
//			$("#account_form").populateForm(data.data);
//			$("#myModalLabel").text("修改打款账户");
//			$('#accountModal').modal();
//		} else if (0 == data.code) {
//			alert(data.msg);
//		} else {
//			alert(data);
//		}
//	}, "json");
//}

function saveAccount() {
	if (!$("#account_form").valid()) {
		return;
	}
	var json = $("#account_form").serializeJson();
	jQuery.post("/hoper/backweb/jjsPaymentAccount/add", json, function(data) {
		if (1 == data.code) {
			alert("success");
			$('#accountModal').modal('hide');
			$("#account_tb").bootstrapTable('refresh');
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#account_form").validate({
	ignore: "",
	rules : {
		accountCode : "required",
		accountName : "required",
		bankCode : "required",
		bankInfo : "required"
	}
});
