/**
 * 
 */

//
$(function () {
//	productSubjectValidate();
//	productValidate();
//	loadProductSubject();
	loadProductSubjectByData("#productSubjectId");
	
//	$('#productModal').modal();
});

var columns = [ 
    {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'period',
        title: '产品期数'
    }, {
        field: 'sumRaiseAmt',
        title: '产品总募集额（元）'
    }, {
        field: 'currentRaiseAmt',
        title: '本期募集额（元）'
    }, {
    	field: 'beginAmt',
    	title: '起投金额（元）'
    }, {
    	field: 'addAmt',
    	title: '倍投金额（元）'
    }, {
    	field: 'annualizedIncome',
    	title: '年化收益率'
    }, {
    	field: 'productDeadline',//deadlineType
    	title: '期限'
    }, {
    	field: 'raiseBeginTime',
    	title: '募集开始时间'
    }, {
    	field: 'raiseEndTime',
    	title: '募集结束时间'
    }, {
    	field: 'setupDay',
    	title: '成立日'
    }, {
    	field: 'partners',
    	title: '合作方'
    }, {
    	field: 'factoring',
    	title: '保理方'
    }, {
    	field: 'createTime',
    	title: '添加时间',
    	formatter : jsonTimeFormat
    }, {
    	field: 'creator',
    	title: '添加人'
    }, {
    	field: 'void',
    	title: '操作',
    	formatter : operateFormat
    }, ];

function search() {
	$("#table_product").bootstrapTable('destroy');
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
//        ajaxOptions:{
//            headers: {"Authorization" : parent.token_my}
//        },
//	        headers: {
//	            'Access-Token':$.cookie('access_token')
//	        }
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
//		$(function(){
//			$("#productTable tr").click(function(){
//				$("#productTable tr").css("background","#fff");	
//				$(this).css("background","#B4E4E9");
//
//			})
//		});
}

function queryParams(params) {
	var param = {
		"pageNum" : params.pageNumber,
        "pageSize" : params.pageSize,
        "factoring" : $("#factoringQuery").val(),
		"partners" : $("#partnersQuery").val(),
		"factoring" : $("#factoringQuery").val()
    };
    return param;
}

function handler(result) {
	if (100 == result.code) {
		parent.logout();
		return { total : 0};
	}
	if(1 != result.code) {
		alert("查询失败");
		return { total : 0};
	}
    return {
        total : result.data.total,
        rows : result.data.list
    };
}

function operateFormat(value, row, index) {
	// 修改
	return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdProDialog(\''
				+ row.id + '\')">修改</button>';
	// 删除（逻辑）
}

function openDialog() {
	productSubjectValidate.resetForm();
	$("#myModalLabel").text("添加产品科目");
	$('#myModal').modal();
	$('#productModal').modal("hide");
}

function openProductDialog() {
	productValidate.resetForm();
	$("#product_form input").val("");
	$("#product_form select").val("");
	$("#deadlineType").val(0);
	
	$("#productSubjectId").attr("disabled", false);
	$("#period").attr("disabled", false);
	$("#productModalLabel").text("添加产品");
	$('#productModal').modal();
}

function openUpdProDialog(id) {
	jQuery.get("/hoper/backweb/getProduct", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			$("#product_form input").val("");
			productValidate.resetForm();
			$("#productSubjectId").attr("disabled", true);
			$("#period").attr("disabled", true);
			
			$("#product_form").populateForm(data.data);
			$("#productModalLabel").text("修改产品");
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
	
	var url =  "";
	if (pcg_fun.isEmpty(json.id)) {
		url += "/hoper/backweb/addProduct";
	} else {
		url += "/hoper/backweb/updateProduct";
	}
	myAjaxPost(url, JSON.stringify(json), function(data) {
		if (1 == data.code) {
			alert("success");
			$('#productModal').modal('hide');
			$("#table_product").bootstrapTable('refresh');
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	});
}

function saveProductSubject() {
	if (!$("#pro_sub_form").valid()) {
		return;
	}
	var json = $("#pro_sub_form").serializeJson();
	myAjaxPost("/hoper/backweb/addProductSubject", JSON.stringify(json), function(data) {
		if (1 == data.code) {
			alert("success");
			$('#myModal').modal('hide');
			$('#productModal').modal();
			loadProductSubjectByData();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	});
}

var productSubjectValidate =  $("#pro_sub_form").validate({
	rules : {
		productName : {
			required : true
		},
		sumRaiseAmt : {
			required : true,
			number : true
		}
	}
});

var productValidate = $("#product_form").validate({
	rules : {
		productSubjectId : "required",
		productDeadline : {
			required : true,
			positive : true
		},
		deadlineType : "required",
		period : {
			"required" : true,
			positive : true
		},
		currentRaiseAmt : "required",
		beginAmt : "required",
		addAmt : "required",
		annualizedIncome : "required",
		raiseBeginTime : "required"
	}
});
