/**
 * 
 */
$(function () {
	loadTable();
	
	jQuery.get("/hoper/backweb/productSubjectList", {
		
	}, function(data) {
    	if (1 == data.code) {
    		$("#productSubjectId").empty();
    		$("#productSubjectIdQuery").empty();
    		var v = data.data;
    		var options = "<option value='' selected='selected'>---请选择---</option>";
    		for(var i = 0;i < v.length;i++){
    			options += "<option value='" + v[i]["id"]+ "'>" + v[i]["productName"] + "</option>";
    		}
    		$("#productSubjectId").html(options);
    		$("#productSubjectIdQuery").html(options);
    		
    		if (!pcg_fun.isEmpty(productSubjectIdParam)) {
    			$("#productSubjectIdQuery").val(productSubjectIdParam);
    			$("#productSubjectIdQuery").attr("disabled", true);
    			$("#reback").show();
    			search();
    		}
    	} else {
    		alert("加载产品科目下拉框参数失败");
    	}
    },"json");
	
	jQuery.get("/hoper/backweb/jjsPaymentAccount/getAccounts", {
		
	}, function(data) {
    	if (1 == data.code) {
    		$("#paymentAccount").empty();
    		var v = data.data;
    		var options = "<option value='' selected='selected'>---请选择---</option>";
    		for(var i = 0;i < v.length;i++){
    			options += "<option value='" + v[i]["accountCode"]+ "'>" + v[i]["bankInfo"] + "-" + v[i]["bankCode"] + "</option>";
    		}
    		$("#paymentAccount").html(options);
    	} else {
    		alert("加载打款账户信息失败");
    	}
    },"json");
	
	pcg_fun.loadCommonData("#statusQuery", statusCommonJson, "value", "text");
});

var columns = [
    // {
    //     field: 'id',
    //     title: '产品id',
    //     align : "center"
    // },
	{
    	field: 'productName',
    	title: '产品名称',
    	align : "center" ,
    }, {
        field: 'period',
        title: '期数',
        align : "center" 
    }, {
        field: 'currentRaiseAmt',
        title: '募集额(元)',
    	align : "center",
    	formatter : financeFormat
    }, {
    	field: 'restAmount',
    	title: '剩余额度(元)',
    	align : "center",
    	formatter : financeFormat
    }, {
    	field: 'beginAmt',
    	title: '起投金额(元)',
    	align : "center",
    	formatter : financeFormat
    }, {
    	field: 'addAmt',
    	title: '倍投金额(元)',
    	align : "center",
    	formatter : financeFormat
    }, {
    	field: 'annualizedIncome',
    	title: '年化收益率',
    	align : "center" ,
    	formatter : annualizedIncomeFormat
    }, {
    	field: 'productDeadline',//deadlineType
    	title: '期限',
    	align : "center",
    	formatter : deadlineFormat
    }, {
    	field: 'raiseBeginTime',
    	title: '募集开始时间',
    	align : "center"
    }, {
    	field: 'raiseEndTime',
    	title: '募集结束时间',
    	align : "center"
    }, {
    	field: 'setupDay',
    	title: '成立日',
    	align : "center"
    }, {
    	field: 'expireDay',
    	title: '到期日',
    	align : "center"
    }, {
    	field: 'status',
    	title: '状态',
    	align : "center",
    	formatter : statusFormat
    }, {
    	field: 'platformDisplay',
    	title: '平台展示',
    	align : "center",
    	formatter : displayFormat
    }, {
    	field: 'websiteDisplay',
    	title: '官网展示',
    	align : "center",
    	formatter : displayFormat
    }, {
    	field: 'payType',
    	title: '付款方式',
    	align : "center",
    	formatter : payTypeFormat
    }, {
    	field: 'createTime',
    	title: '添加时间',
    	align : "center",
    	formatter : jsonTimeFormat
    }, {
    	field: 'creator',
    	title: '添加人',
    	align : "center" 
    }, {
    	field: 'lastUpdateTime',
    	title: '最后更新时间',
    	align : "center",
    	formatter : jsonTimeFormat
    }, {
    	field: 'lastUpdateUser',
    	title: '最后更新人',
    	align : "center"
    }, {
    	field: 'void',
    	title: '操作',
    	align : "center",
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#table_product').bootstrapTable({
		url : "/hoper/backweb/pageProduct",
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
		$("#table_product tr").click(function(){
			$("#table_product tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function searchProduct() {
	var options = $("#table_product").bootstrapTable('getOptions');
	var params = queryParams(options);
	if (!pcg_fun.isEmpty(productSubjectIdParam))
		params.productSubjectId = productSubjectIdParam;
	$("#table_product").bootstrapTable('refresh', {query : params});
}

var checkUpd = checkAuth("PRODUCT:UPDATE_PRODUCT");
var checkPutOn = checkAuth("PRODUCT:PUTON_PRODUCT");
var checkPullOff = checkAuth("PRODUCT:PULLOFF_PRODUCT");
function operateFormat(value, row, index) {
	var s = '';
	// 上架
    if (checkPutOn){
        if(row.websiteDisplay == 'N' &&  row.platformDisplay == 'N'){
        s += '<button type="button" class="btn btn-success btn-sm" onClick="putOnProduct(\''
            + row.id  + '\')">上架</button>&nbsp;';
        }
	}
	//下架
    if (checkPullOff){
    	if(row.websiteDisplay == 'Y' &&  row.platformDisplay == 'Y'){
            s += '<button type="button" class="btn btn-danger btn-sm" onClick="pullOffProduct(\''
                + row.id  + '\')">下架</button>&nbsp;';
		}
    }

    // 修改
    if (checkUpd){
        s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
            + row.id + '\')">修改</button>&nbsp;';
    }

	// 查看banner图片
	if (!pcg_fun.isEmpty(row.bannerPath))
		s += '<button type="button" class="btn btn-info btn-sm" onClick="viewBanner(\''
			+ row.bannerPath + '\')">Banner图</button>';
	return s;
}

function formReset() {
	$("#product_form input").val("");
}

function viewBanner(bannerPath) {
	window.open(bannerPath);
}

function openDialog() {
	$("#product_form input").val("");
	$("#product_form select").val("");
	$("#product_form textarea").val("");
	$("#deadlineType").val(0);
	validator.resetForm();
	
	$("#productSubjectId").attr("disabled", false);
	$("#period").attr("disabled", false);
	$("#raiseBeginTime").attr("disabled", false);
	$("#raiseEndTime").attr("disabled", false);
	
	$("#myModalLabel").text("添加产品");
	$('#productModal').modal();
}

function putOnProduct(id) {
    jQuery.get("/hoper/backweb/product/putOn", {
        "id" : id
    }, function(data) {
        if (1 == data.code) {
            $("#table_product").bootstrapTable('refresh');
            alert('产品上架成功!');
        } else if (0 == data.code) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
};

function pullOffProduct(id) {
    jQuery.get("/hoper/backweb/product/pullOff", {
        "id" : id
    }, function(data) {
        if (1 == data.code) {
            $("#table_product").bootstrapTable('refresh');
            alert('产品下架成功!');
        } else if (0 == data.code) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
};

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/getProduct", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#product_form input").val("");
			$("#product_form textarea").val("");
			
			$("#productSubjectId").attr("disabled", true);
			$("#period").attr("disabled", true);
			$("#raiseBeginTime").attr("disabled", true);
			if (!pcg_fun.isEmpty(data.data.raiseEndTime))
				$("#raiseEndTime").attr("disabled", true);
			else
				$("#raiseEndTime").attr("disabled", false);
			
			data.data.annualizedIncome = (data.data.annualizedIncome * 100).toFixed();
			
			$("#product_form").populateForm(data.data);
			$("#myModalLabel").text("修改产品");
			$('#productModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveProduct() {
	if (!$("#product_form").valid()) {
		return;
	}
	var json = $("#product_form").serializeJson();
	var fileVal = $("#file").val();
	var url =  "";
	if (pcg_fun.isEmpty(json.id)) {
		url = "/hoper/backweb/addProduct";
//		if (pcg_fun.isEmpty(fileVal)) {
//			alert("banner图片不能为空");
//			return;
//		}
	} else {
		url = "/hoper/backweb/updateProduct";
	}
	json.annualizedIncome = (json.annualizedIncome / 100).toFixed(2, 10) ;
	
	$("#save_bt").attr("disabled", true);
	 $.ajaxFileUpload({
		 url : url,
		 type : 'post',
		 secureuri : false, // 一般设置为false
		 fileElementId : 'file', // 上传文件的id、name属性名
		 dataType : 'json', // 返回值类型，一般设置为json、application/json
		 data : json,
		 success : function(data, status) {
			 $("#save_bt").attr("disabled", false);
			 if (1 == data.code) {
				$('#productModal').modal('hide');
				$("#table_product").bootstrapTable('refresh');
				alert("success");
			 } else if (0 == data.code) {
				 alert(data.msg);
			 } else {
				 alert(data);
			 }
		 },
		 error : function(data, status, e) {
			 $("#save_bt").attr("disabled", false);
			 alert(e);
		}
	});
	
//	myAjaxPost(url, JSON.stringify(json), function(data) {
//		if (1 == data.code) {
//			alert("success");
//			$('#productModal').modal('hide');
//			$("#table_product").bootstrapTable('refresh');
//		} else if (0 == data.code) {
//			alert(data.msg);
//		} else {
//			alert(data);
//		}
//	});
}

var validator = $("#product_form").validate({
	ignore: "",
	rules : {
		productSubjectId : "required",
		productDeadline : {
			required : true,
			positive : true
		},
		deadlineType : "required",
		period : {
			"required" : true
		},
		currentRaiseAmt : {
			"required" : true,
			number : true
		},
		beginAmt : {
			"required" : true,
			number : true
		},
		addAmt : {
			"required" : true,
			number : true
		},
		annualizedIncome : {
			"required" : true,
			positive : true
		},
		payType : "required",
		color : {
			//"required" : true,
			utfmaxlength : 50
		},
		paymentAccount : "required",
		websiteDisplay : "required",
		platformDisplay : "required",
		raiseBeginTime : "required"
	}
});

var statusCommonJson = [
	{"value" : 0, "text" : "待募集"},
	{"value" : 1, "text" : "募集中"},
	{"value" : 2, "text" : "已起息"},
	{"value" : 3, "text" : "已完成"},
];
var statusFormatJson = {
	0 : "待募集",
	1 : "募集中",
	2 : "已起息",
	3 : "已完成"
};

function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var rs = statusFormatJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}
var payTypeFormatJson = {
		1 : "季度付息，到期还本",
		2 : "到期还本付息"
	};
function payTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var rs = payTypeFormatJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}

function displayFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	if ("Y" == value)
		return "是";
	else if ("N" == value)
		return "否";
	return value;
}

function reBack() {
	refreshto("/hoper/backweb/product/productSubject");
}