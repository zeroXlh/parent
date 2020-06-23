/**
 * 
 */
$(function() {
	loadProductSubjectByData("#productSubjectIdQuery");
	loadProductCascade("#productSubjectIdQuery", "#product_id_query");
//	$("#productSubjectIdQuery").change(function() {
//		var subjectId = $("#productSubjectIdQuery").val();
//		if (pcg_fun.isEmpty(subjectId)) {
//			$("#product_id_query").empty();
////			$("#product_id_query").val("");
//			return;
//		}
//	
//		loadProduct("#product_id_query", {"productSubjectId" : subjectId});
////		$('#product_id_query').selectpicker('refresh');//动态刷新
//	});
	
	loadMainTable();
});


function loadMainTable() {
	$('#remark_list').bootstrapTable({
		url : "/hoper/backweb/remark/page",
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
        showFooter : false,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
	$(function(){
		$("#remark_list tr").click(function(){
			$("#remark_list tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});
}

var columns = [
	{
		field : "id",
		title : "编号",
		align : "center"
	}, {
		field : "subscriptionId",
		title : "认购编号",
		align : "center"
	}, {
		field : "productId",
		title : "产品编号",
		align : "center"
	}, {
		field : "custName",
		title : "客户名称",
		align : "center"
	}, {
		field : "remark",
		title : "备注信息",
		align : "center"
	}, {
		field : "createTime",
		title : "创建时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "creator",
		title : "创建人",
		align : "center"
	}, {
		field : "void",
		title : "下载备注文件",
		align : "center",
		formatter : operateFormat
	}
];

function operateFormat(value, row, index) {
	if (!pcg_fun.isEmpty(row.nginxUrl))
		return '<button type="button" class="btn btn-info btn-sm" onClick="downloadFile(\''
		+ row.nginxUrl + '\')">下载</button>';
	return '';
}

function downloadFile(nginxUrl) {
	window.open(nginxUrl);
}

function productStatisticsSearch(id) {
	var options = $(id).bootstrapTable('getOptions');
	$(id).bootstrapTable('refresh', { query : productStatisticsParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})});
}

function productStatisticsParams(params) {
	var json = $("#query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	return json;
}

function periodFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = productSubjectMapping[row.productSubjectId];
	return (pcg_fun.isEmpty(val) ? "" : val) + value + "期";
}