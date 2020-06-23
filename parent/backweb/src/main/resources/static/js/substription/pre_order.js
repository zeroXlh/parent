/**
 * 
 */
$(function() {
//	loadProductSubjectByData("#productSubjectIdQuery");
	
	loadProductCascade("#productSubjectIdQuery", '#product_id_query', null);
	
	loadCustTypeCombo("#custType");
	
	loadMainTable();
});

function loadMainTable() {
	$('#list').bootstrapTable({
		// url : "/hoper/backweb/jjsPreOrder/page",
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
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
//        showFooter : true,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
}

var columns = [
	{
//		field : "id",
//		title : "编号",
//		align : "center"
//	}, {
		field : "userId",
		title : "客户编号",
		align : "center"
	}, {
		field : "productId",
		title : "产品",
		align : "center"
	}, {
		field : "custType",
		title : "客户类型",
		align : "center",
		formatter : custTypeFormat
	}, {
		field : "custName",
		title : "客户名称",
		align : "center"
	}, {
		field : "certNo",
		title : "证件号",
		align : "center"
	}, {
		field : "preOrderAmt",
		title : "预约金额",
		align : "center",
		formatter : financeFormat
	}, {
		field : "reservationTime",
		title : "预约时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "bankCode",
		title : "银行卡号",
		align : "center"
	}, {
		field : "bankInfo",
		title : "银行卡信息",
		align : "center"
	}, {
		field : "introducer",
		title : "推荐人",
		align : "center"
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
	var params = { query : queryParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})};
	if (first_load) {
		first_load = false;
		params.url = "/hoper/backweb/jjsPreOrder/page";
	}
	$(id).bootstrapTable('refresh', params);
}

function openImportDialog() {
	$("#file").val("");
	$('#upload_modal').modal();
}

function importExcel() {
	buttonSync(true);
	if (!filePreCheck(false)) {
		buttonSync(false);
		return;
	}

	$.ajaxFileUpload({
		url : '/hoper/backweb/jjsPreOrder/uploadAppointment',
		type : 'post',
		secureuri : false, // 一般设置为false
		fileElementId : 'file', // 上传文件的id、name属性名
		dataType : 'json', // 返回值类型，一般设置为json、application/json
		success : function(data, status) {
			buttonSync(false);
			if (1 == data.code) {
				$("#list").bootstrapTable('refresh');
				$('#upload_modal').modal('hide');
				alert("上传成功！" + data.msg);
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		},
		error : function(data, status, e) {
			buttonSync(false);
			alert(e);
		}
	});
}

function filePreCheck(checkProduct) {
//	if (checkProduct && pcg_fun.isEmpty($("#upload_product_id").val())) {
//		alert('请选择产品！');
//		return false;
//	}

//	if (pcg_fun.isEmpty($("#company").val())) {
//		alert('请选择公司！');
//		return false;
//	}
	var video_src_file = $("#file").val();
	var productId = $("#upload_product_id").val();
	if (pcg_fun.isEmpty(video_src_file)) {
		alert('请选择文件！');
		return false;
	}
	var index = video_src_file.lastIndexOf(".");
	if (index == -1) {
		alert("文件名称错误！");
		return false;
	}
	var suffix = video_src_file.substring(index + 1);
	if ("xls" != suffix && "xlsx" != suffix) {
		alert('文档类型不支持，只允许xls,xlsx文档格式！');
		return false;
	}
	return true;
}

function buttonSync(flag) {
	$("button.upload-bt-sync").attr("disabled", flag);
}
