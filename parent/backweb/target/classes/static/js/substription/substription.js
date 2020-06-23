/**
 * 
 */
$(function() {
	loadProductSubjectByData("#productSubjectIdQuery");
	
	loadProductCustomer("#upload_product_id");
	
	$("#productSubjectIdQuery").change(function() {
		var subjectId = $("#productSubjectIdQuery").val();
		if (pcg_fun.isEmpty(subjectId)) {
			$("#product_id_query").empty();
			return;
		}
	
		loadProduct("#product_id_query", {"productSubjectId" : subjectId});
		$('#product_id_query').selectpicker('refresh');//动态刷新
	});
	
//	pcg_fun.loadCommonData("#company_q", companyCombo, "value", "text", null);
	
	loadMainTable();
});

function loadMainTable() {
	$('#list').bootstrapTable({
		// url : "/hoper/backweb/pageSubscription",
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
        clickToSelect : true,
        singleSelect : true,
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: orderQueryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        showFooter : true,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
}

var columns = [
	{
		field : "ck",
		checkbox : true,
		align : "center"
	}, {
		field : "id",
		title : "订单编号",
		align : "center"
	}, {
		field : "company",
		title : "所属公司",
		align : "center",
		formatter : companyFormat
	}, {
		field : "custName",
		title : "投资人",
		align : "center"
	}, {
		field : "certNo",
		title : "身份证号",
		align : "center"
	}, {
		field : "phoneNo",
		title : "投资人手机",
		align : "center"	
	}, {
		field : "reservationTime",
		title : "预约时间",
		align : "center",
//		formatter : jsonTimeFormat
		footerFormatter : function(data) {
			return "预约合计：";
		}
	}, {
		field : "preOrderAmt",
		title : "预约金额",
		align : "center",
		formatter : financeFormat,
		footerFormatter : function(data) {
			var count = 0;
			for (var i = 0; i < data.length; i++) {
				count += data[i]["preOrderAmt"];
			}
			return financeFormat(count);
		}
	}, {
		field : "bankInfo",
		title : "银行名称",
		align : "center"
	}, {
		field : "bankCode",
		title : "银行卡号",
		align : "center",
		footerFormatter : function(data) {
			return "认购合计：";
		}
	}, {
		field : "actualOrderAmt",
		title : "认购金额",
		align : "center",
		formatter : financeFormat,
		footerFormatter : function(data) {
			var count = 0;
			for (var i = 0; i < data.length; i++) {
				count += data[i]["actualOrderAmt"];
			}
			return financeFormat(count);
		}
	}, {
		field : "actualPayTime",
		title : "打款时间",
		align : "center",
		formatter : jsonDateFormat,
		footerFormatter : function(data) {
			return "收益合计：";
		}
	}, {
		field : "incomeAmt",
		title : "收益金额",
		align : "center",
		formatter : financeFormat, //floatFormat
		footerFormatter : function(data) {
			var count = 0;
			for (var i = 0; i < data.length; i++) {
				count += data[i]["incomeAmt"];
			}
			return financeFormat(count);
		}
	}, {
		field : "rateTime",
		title : "起息时间",
		align : "center",
		formatter : jsonDateFormat
	}, {
		field : "repaymentStatus",
		title : "状态",
		align : "center",
		formatter : repaymentStatusFormat
	}, {
		field : "productSubjectId",
		title : "产品名称",
		align : "center",
		formatter : productFormat
	}, {
		field : "productDeadline",
		title : "期限",
		align : "center",
		formatter : deadlineFormat
	}, {
		field : "annualizedIncome",
		title : "利率",
		align : "center",
		formatter : annualizedIncomeFormat
	}, {
		field : "introducer",
		title : "推荐人手机",
		align : "center"
	}, {
		field : "intrName",
		title : "推荐人",
		align : "center"
	}, {
		field : "city",
		title : "城市",
		align : "center"
	}, {
		field : "lastUpdateUser",
		title : "操作人",
		align : "center"
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : operateFormat
	} 
];

var first_load = true;
function orderSearch(id) {
	var userIdQ = $("#query_form input[name='userId']").val();
	if (!pcg_fun.isEmpty() && !/^\d+$/.test(userIdQ)) {
		alert("用户编号请输入正整数！");
		return;
	}
	
	var options = $(id).bootstrapTable('getOptions');
	var params = { query : orderQueryParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})};
	if (first_load) {
		first_load = false;
		params.url = "/hoper/backweb/pageSubscription";
	}
	$(id).bootstrapTable('refresh', params);
}

function orderQueryParams(params) {
	var json = $("#query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	if (jQuery.type(json.repaymentStatusList) == "string") {
		json["repaymentStatus"] = json.repaymentStatusList;
		delete json["repaymentStatusList"];
	}
	if (jQuery.type(json.productIdList) == "string") {
		json["productId"] = json.productIdList;
		delete json["productIdList"];
	}
	return {"param" : JSON.stringify(json)};
}

function exportSubscription() {
	var json = $("#query_form").serializeJson();
	if (jQuery.type(json.repaymentStatusList) == "string") {
		json["repaymentStatus"] = json.repaymentStatusList;
		delete json["repaymentStatusList"];
	}
	if (jQuery.type(json.productIdList) == "string") {
		json["productId"] = json.productIdList;
		delete json["productIdList"];
	}
	var param = JSON.stringify(json);
	window.open("/hoper/backweb/exportSubscription?param=" + encodeURIComponent(param));
}

var checkConfirm = checkAuth("BUSSINESS:CONFIRM_AMT");
var checkReimburse = checkAuth("BUSSINESS:REIMBURSE");
function operateFormat(value, row, index) {
	var s = "";
//	if (checkConfirm) {
//		if (0 == row.repaymentStatus || 1 == row.repaymentStatus) // 未付款、已付款
//			s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
//				+ row.id + '\')">确认金额</button>';
//	}
	if (checkReimburse) {
		if (1 == row.repaymentStatus || 2 == row.repaymentStatus) // 已付款、回款中
			s += '&nbsp;<button type="button" class="btn btn-danger btn-sm" onClick="reimburse(\''
				+ row.id + '\')">退款</button>';
	}
	return s;
}

function reimburse(id) {
	if (confirm("退款操作不可逆，此客户确定已退款吗？")) {
		jQuery.post("/hoper/backweb/reimburse", {
			"subscriptionId" : id
		}, function (data) {
			if (1 == data.code) {
				$("#list").bootstrapTable('refresh');
				alert("退款成功");
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		}, "json");
	}
}

var subValidator = $("#sub_form").validate({
	rules : {
		actualOrderAmt : {
			"required" : true,
			"number" : true
		},
		actualPayTime : "required"
	}
});

function openDetermineDialog(id) {
	var selections = $("#list").bootstrapTable('getSelections');
	if (selections.length < 1) {
		alert("请先选择一条记录");
		return;
	}
	if (selections.length > 1) {
		alert("只能选择一条记录");
		return;
	}
	var row = selections[0];
	
	jQuery.get("/hoper/backweb/getSubscription", {
		"id" : row.id
	}, function(data) {
		if (1 == data.code) {
			subValidator.resetForm();
			$("#sub_form input").val("");
			
			var rs = data.data;
			if (!pcg_fun.isEmpty(rs.actualPayTime)) {
				rs.actualPayTime = jsonDateFormat(rs.actualPayTime);
			}
			
			$("#sub_form").populateForm(rs);
			$('#updModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function determineAmount() {
	if (!$("#sub_form").valid()) {
		return;
	}
	var json = $("#sub_form").serializeJson();
	
	jQuery.post("/hoper/backweb/determineAmount", json, function(data) {
		if (1 == data.code) {
			$('#updModal').modal('hide');
			$("#list").bootstrapTable('refresh');
			alert("success");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	});
}

function generateSinglePlan() {
	var selections = $("#list").bootstrapTable('getSelections');
	if (selections.length < 1) {
		alert("请先选择一条记录");
		return;
	}
	if (selections.length > 1) {
		alert("只能选择一条记录");
		return;
	}
	var row = selections[0];
	
	jQuery.post("/hoper/backweb/generateSinglePlan", {
		"subscriptionId" : row.id
	}, function(data) {
		if (1 == data.code) {
			$("#list").bootstrapTable('refresh');
			alert("回款计划已生成");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	});
}

var repaymentStatusJson = {
	0 : "未付款",
	1 : "待起息",
	2 : "回款中",
	3 : "已完成",
	4 : "已退款",
	5 : "已转让"
};
function repaymentStatusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	var rs = repaymentStatusJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}

function openChangeDialog() {
	var selections = $("#list").bootstrapTable('getSelections');
	if (selections.length < 1) {
		alert("请先选择需要变更信息的记录");
		return;
	}
	if (selections.length > 1) {
		alert("变更打款账户时只能选择一条记录");
		return;
	}
	var row = selections[0];
	
	jQuery.get("/hoper/backweb/getSubscription", {
		"id" : row.id
	}, function(data) {
		if (1 == data.code) {
			$("#change_form").clearForm();
			changeBankValidator.resetForm();
			$("#changeModal").modal();
			$("#changeModalLabel").text("变更客户打款账户");
			
			$("#change_form").populateForm(data.data);
			
		} else if (0 == data.code) {
			alert("获取客户认购信息失败：" + data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

//var type = 0;
/**
 * 打开添加银行卡的dialog，type表示是哪个dialog中的新增银行卡按钮触发的：1-预约、2-变更银行卡
 */
//function openAddBankDialog(val) {
//	type = val;
//	$("#add_bank_form :text:not(:disabled)").val("");
//	addBankValidator.resetForm();
//	//$("#add_bank_form").clearForm();
//	$("#addBankModal").modal();
//	$("#addBankModalLabel").text("新增客户银行账户");
//	if (1 == type)
//		$("#addModal").modal("hide");
//	else if (2 == type)
//		$("#changeModal").modal("hide");
//}

//function closeChangeBankDialog() {
//	$("#addBankModal").modal("hide");
//	if (1 == type)
//		$("#addModal").modal();
//	else if (2 == type)
//		$("#changeModal").modal();
//}

//var addBankValidator = $("#add_bank_form").validate({
//	ignore: "",
//	rules : {
//		bankInfo : {
//			"required" : true,
//			utfmaxlength : 60
//		},
//		userId : "required",
//		bankCode : "required"
//	}
//});
//function addBank() {
//	if (!$("#add_bank_form").valid()) {
//		return;
//	}
//	var json = $("#add_bank_form").serializeJson();
//	
//	jQuery.post("/hoper/backweb/jjsUser/addBank", json, function(data) {
//		if (1 == data.code) {
//			var id = "#bankId" + type;
//			pcg_fun.loadCommon(id, "/hoper/backweb/jjsUser/getBanks", {
//				"userId" : json.userId,
//				"status" : 1
//			}, "id", "bankCode");
//			
//			$("#addBankModal").modal("hide");
//			if (1 == type)
//				$("#addModal").modal();
//			else if (2 == type)
//				$("#changeModal").modal();
//		} else if (0 == data.code) {
//			alert("新增客户银行账户失败：" + data.msg);
//		} else {
//			alert(data);
//		}
//	}, "json");
//}

var changeBankValidator = $("#change_form").validate({
	rules : {
		id : "required" ,
		bankCode : {
			"required" : true,
			"bankcode" : true // 银行卡、存折格式
//			"purevalue" : true // 纯数值
		},
		bankInfo : "required",
		accountType : "required",
		establishProvince : "required",
		establishCity : "required",
		introducer : {
			"required" : true,
			"mobile" : true
		},
		remark : "required"
	}
});

function changeBank() {
	if (!$("#change_form").valid()) {
		return;
	}
	var json = $("#change_form").serializeJson();
	
	jQuery.post("/hoper/backweb/changeOrderInfo", json, function(data) {
		if (1 == data.code) {
			$("#list").bootstrapTable("refresh");
			$("#changeModal").modal("hide");
			alert("认购信息变更成功");
		} else if (0 == data.code) {
			alert("认购信息变更失败：" + data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function productFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = productSubjectMapping[value];
	if (pcg_fun.isEmpty(val))
		return value;
	if (pcg_fun.isEmpty(row.period))
		return val;
	val += row.period + "期";
	return val;
}