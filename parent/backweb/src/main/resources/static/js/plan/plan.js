/**
 * 
 */
$(function() {
	loadProductCascade("#productSubjectIdQuery", "#product_id", null);
	
	loadTable();
	
	$("#payProductId").change(function() {
		var val = $(this).val();
		if (pcg_fun.isEmpty(val)) {
			$("#payQuqrter").attr("readonly", true);
			$("#payQuqrter").val("");
			return;
		}
		var optionSe = $(this).find("option:selected");
		var maxQuarter = optionSe.attr("quarter");
		$("#payQuqrter").attr("readonly", false);
		var quarters = [];
		for(var i = 1; i <= maxQuarter; i++)
			quarters.push({"code": i});
		
		pcg_fun.loadCommonData("#payQuqrter", quarters, "code", "code", null);
	});
});

function loadTable() {
	$('#list').bootstrapTable({
		url : "/hoper/backweb/plan/pagePlan",
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
        pageList: [10, 25, 50, 100, 1000],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        clickToSelect : true,
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        rowStyle : remarkStyle,
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
	{"field" : "ck", checkbox : true, "align" : "center"},
	{"field" : "company", "title" : "公司", "align" : "center", formatter: companyFormat},
	{"field" : "custName", "title" : "投资人", "align" : "center"},
	{"field" : "bankInfo", "title" : "开户行信息", "align" : "center"},
	{"field" : "bankCode", "title" : "银行卡号", "align" : "center"},
	{"field" : "accountType", "title" : "账户属性", "align" : "center", "formatter" : accountTypeFormat},
	{"field" : "establishProvince", "title" : "开户省", "align" : "center"},
	{"field" : "establishCity", "title" : "开户市", "align" : "center"},
	{"field" : "productName", "title" : "产品", "align" : "center", "formatter" : productFormat},
	{"field" : "actualOrderAmt", "title" : "实际认购金额", "align" : "center", "formatter" : floatFormat},
	{"field" : "incomeAmt", "title" : "收益金额", "align" : "center", "formatter" : floatFormat},
	{"field" : "payQuarter", "title" : "季度", "align" : "center"},
	{"field" : "sumAmt", "title" : "回款金额", "align" : "center", "formatter" : floatFormat},
	{"field" : "payDate", "title" : "兑付日期", "align" : "center", "formatter" : jsonDateFormat},
	{"field" : "status", "title" : "状态", "align" : "center", "formatter" : statusFormat},
	{field : "void", title : "操作", align : "left", "formatter" : operateFormat}
];

function exoperExcel() {
//	var data = encodeURIComponent(JSON.stringify($("#query_form").serializeJson()));
	var json = $("#query_form").serializeJson();
	var param = "";
	for (var item in json) {
		if (param.length == 0)
			param = "?";
		param += item + "=" + json[item] + "&";
	}
	param = param.substring(0, param.length - 1);
	window.open("/hoper/backweb/plan/export"+ param);
}

function holidayCheck(payDate) {
	var currD = dateParse(currentDate);
	var offset = interval_app;
	var plusDays = dateParse(payDate);
	while (offset-- > 0) {
		do {
			plusDays = dateAdd(plusDays, -1);
		} while (isHoliday(holidays_app, plusDays));
	}
	if (currD >= plusDays)
		return true;
	return false;
}

function isHoliday(array, payDate) {
	var comparable = dateFormat(payDate);
	for(var i = 0; i < array.length; i++) {
		if (array[i] == comparable)
			return true;
	}
	return false;
}

var checkRepay = checkAuth("PLAN:CONFIRM_REPAYMENT");
function operateFormat(value, row, index) {
	var s = '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
		+ row.id + '\')">金额明细</button>';
	if (row.hasRemark == 1) {
		s += '<button type="button" class="btn btn-success btn-sm" onClick="viewRemark(\''
			+ row.subscriptionId + '\')">查看备注</button>';
	}
	if (1 == row.status && checkRepay && holidayCheck(row.payDate))
		s += '&emsp;<button type="button" class="btn btn-danger btn-sm" onClick="payment('
			+ row.id + ')">确认回款</button>';
	return s;
}

function viewRemark(subscriptionId) {
	jQuery.get("/hoper/backweb/remark/viewRemark", {
		"subscriptionId" : subscriptionId
	}, function(data) {
		if (1 == data.code) {
			$("#order_remark_modal").modal();
			$("#order_remark_p").text(data.data.remark);
//			toastr.warning(data.data.remark);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function payment(id) {
	if (confirm("确认已给客户回款吗？")) {
		jQuery.post("/hoper/backweb/plan/payment", {
			"id" : id
		}, function(data) {
			if (1 == data.code) {
				$("#list").bootstrapTable("refresh");
				alert("操作成功");
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		}, "json");
	}
}

var firstLoad = true;
function openPayDialog() {
	if (firstLoad) {
		firstLoad = false; 
//		loadProductCustomer("#payProductId");
		
		pcg_fun.loadCommonSplicing("#payProductId", "/hoper/backweb/product/getProductCustomers", {
			
		}, function(v) {
			var options = "<option value='' selected='selected'>---请选择---</option>";
			var quarter = 1;
			for(var i = 0;i < v.length;i++){
				quarter = quarterFun(v[i]["productDeadline"], v[i]["deadlineType"]);
				options += "<option value='" + v[i]["id"]+ "' quarter='" + quarter + "'>" + v[i]["productName"]
					+"-"+v[i]["period"] + "期</option>";
			}
			return options;
		}, null);
	}
	
	$("#pay_modal").modal();
}

function quarterFun(deadline, deadType) {
	if (1 == deadType) {
		return Math.floor(deadline / 90);
	}
	return Math.floor(deadline / 3);
}

var validator = $("#pay_form").validate({
	ignore: "",
	rules : {
		productId : "required",
		quarter : "required"
	}
});

function confirmPayment() {
	$("#pay_bt").attr("disabled", true);
	
	if (!$("#pay_form").valid()) {
		return;
	}
	
	var json = $("#pay_form").serializeJson();
	jQuery.post("/hoper/backweb/plan/batchPaymentByProduct", json, function(data) {
		$("#pay_bt").attr("disabled", false);
		if (1 == data.code) {
			$("#list").bootstrapTable('refresh');
			alert(data.msg);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function batchRepayment() {
	var selections = $("#list").bootstrapTable('getSelections');
	if (selections.length < 1) {
		alert("请先选择回款计划");
		return;
	}
	var planCodes = [];
	for (var i = 0; i < selections.length; i++)
		planCodes.push(selections[i].id);
	jQuery.post("/hoper/backweb/plan/batchRepayment", {
		"planCodes" : planCodes.toString()
	}, function(data) {
		if (1 == data.code) {
			$("#list").bootstrapTable('refresh');
			alert(data.msg);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/jjsPlanDetail/selectPlanDetails", {
		"planId" : id
	}, function(data) {
		if (1 == data.code) {
//			subValidator.resetForm();
			$("#detail_form input").val("");
			var rs = data.data;
			var json = {};
			for( var i = 0; i < rs.length; i++) {
					json[rs[i].costCode.toLowerCase()] = rs[i].amt;
			}
//			if (!pcg_fun.isEmpty(rs.actualPayTime)) {
//				rs.actualPayTime = jsonDateFormat(rs.actualPayTime);
//			}
			$("#detail_form").populateForm(json);
			$("#detailModalLabel").text("金额明细");
			$('#detailModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var statusJson = {
	1 : "回款中",
	2 : "已回款",
	3 : "已退款"
};
function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	var rs = statusJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}

function productFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var s = value;
	if (pcg_fun.isEmpty(row.period))
		return s;
	return s + row.period + "期";
}

var accountTypeFormatJson = {
	"PB" : "存折",	
	"BC" : "银行卡"	
};
function accountTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var rs = accountTypeFormatJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}

function remarkStyle(row, index) {
	if (1 == row.hasRemark)
		return {
			css: { "background-color": "red" },
		};
	return {};
}