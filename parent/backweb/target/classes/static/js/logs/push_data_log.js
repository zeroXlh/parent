/**
 * 
 */

//
$(function () {
	loadProductCustomer("#product_query");
	loadProductCustomer("#productId");
//	loadProductCascade("#product_subject_query", "#productId", null);
	
	loadTable();
});

var columns = [
    {
    	field: 'id',
    	title: '编号',
    	align : "center" 
    }, {
    	field: 'orderId',
    	title: '订单编号',
    	align : "center" 
    }, {
    	field: 'pushType',
    	title: '类型',
    	align : "center",
    	formatter : pushTypeFormat
    }, {
    	field: 'userId',
    	title: '客户编号',
    	align : "center" 
    }, {
    	field: 'productId',
    	title: '产品编号',
    	align : "center" 
//    }, {
//    	field: 'introducer',
//    	title: '推荐人',
//    	align : "center" 
//    }, {
//        field: 'mobile',
//        title: '手机号',
//    	align : "center" 
//    }, {
//    	field: 'realName',
//    	title: '客户名称',
//    	align : "center" 
//    }, {
//    	field: 'idNo',
//    	title: '身份证号',
//    	align : "center" 
//    }, {
//    	field: 'productName',
//    	title: '产品名称',
//    	align : "center" 
//    }, {
//    	field: 'productRate',
//    	title: '年化利率(%)',
//    	align : "center" 
//    }, {
//    	field: 'productCycle',
//    	title: '产品周期',
//    	align : "center",
//    	formatter : cycleFormat
//    }, {
//    	field: 'investMoney',
//    	title: '投资金额',
//    	align : "center",
//    	formatter : financeFormat
//    }, {
//    	field: 'investTime',
//    	title: '投资时间',
//    	formatter : jsonDateFormat,
//    	align : "center" 
//    }, {
//    	field: 'valueTime',
//    	title: '起息时间',
//    	formatter : jsonDateFormat,
//    	align : "center" 
//    }, {
//    	field: 'productStatus',
//    	title: '投资状态',
//    	formatter : productStatusFormat,
//    	align : "center" 
    }, {
    	field: 'status',
    	title: '状态',
    	align : "center",
    	formatter : statusFormat
    }, {
    	field: 'requestData',
    	title: '请求数据',
    	align : "center",
    	width : 400
    }, {
    	field: 'responseData',
    	title: '响应信息',
    	align : "center"
    }, {
    	field: 'createTime',
    	title: '创建时间',
    	align : "center",
    	formatter : jsonTimeFormat
    }, {
    	field: 'void',
    	title: '操作',
    	align : "left",
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#log_tb').bootstrapTable({
		url : "/hoper/backweb/jjsPushDataLog/page",
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
		$("#log_tb tr").click(function(){
			$("#log_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

//function search() {
//	var options = $("#log_tb").bootstrapTable('getOptions');
//	$("#log_tb").bootstrapTable('refresh', { query : queryParams(options)});
//}

function openDialog() {
	$('#pushModal').modal();
}

function operateFormat(value, row, index) {
	var s = '';
	if ("FAIL" == row.status) {
		s += '<button type="button" class="btn btn-success btn-sm" onClick="pushSingle('
			+ row.id + ')">推送</button>';
	}
	return s;
}

function repushBatchFailure() {
	var json = $("#query_form").serializeJson();
	jQuery.post("/hoper/backweb/jjsPushDataLog/repushBatchFailure", json, function(data) {
		if (1 == data.code) {
			$("#log_tb").bootstrapTable('refresh');
			alert(data.msg);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function pushSingle(id) {
	jQuery.post("/hoper/backweb/jjsPushDataLog/rePush", {
		"logId" : id
	}, function(data) {
		if (1 == data.code) {
			$("#log_tb").bootstrapTable('refresh');
			alert("推送成功");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function batchAddLog() {
	var productId = $("#productId").val();
	if (pcg_fun.isEmpty(productId)) {
		alert();
		return;
	}
	jQuery.post("/hoper/backweb/jjsPushDataLog/batchAddLog", {
		"productId" : productId
	}, function(data) {
		if (1 == data.code) {
			$('#pushModal').modal("hide");
			$("#log_tb").bootstrapTable('refresh');
//			alert("推送成功，成功添加记录：" + data.data);
			alert("推送成功，" + data.msg);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function cycleFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return '-';
	var val = value;
	if (pcg_fun.isEmpty(row.productUnit))
		return val;
	if (1 == row.productUnit)
		val += "天"; 
	else if (2 == row.productUnit)
		val += "月";
	return val;
}

function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return '-';
	if ("SUCC" == value)
		return "成功"; 
	else if ("FAIL" == value)
		return "失败";
	else if ("REVOKE" == value)
		return "已撤销";
	return value;
}

var pushTypeFormatJson = {
	1 : "添加订单",
	2 : "撤销订单",
	3 : "修改订单信息"
};
function pushTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value)) 
		return "-";
	var val = pushTypeFormatJson[value];
	if (pcg_fun.isEmpty(val)) 
		return value;
	return val;
}
var productStatusFormatJson = {
		0 : "预约",
		1 : "确认打款",
		2 : "满额计息",
		3 : "还款中",
		4 : "已完成"
};
function productStatusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value)) 
		return "-";
	var val = productStatusFormatJson[value];
	if (pcg_fun.isEmpty(val)) 
		return value;
	return val;
}