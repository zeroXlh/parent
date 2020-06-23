/**
 * 
 */

//
$(function () {
	pcg_fun.loadCommonData("#businessType_query", businessTypeCommoJson, "value", "text", null);
	loadTable();
});

var columns = [
    {
    	field: 'id',
    	title: '编号',
    	align : "center" 
    }, {
    	field: 'businessType',
    	title: '业务类型',
    	align : "center",
    	formatter : businessTypeFormat
    }, {
    	field: 'businessNum',
    	title: '业务编号',
    	align : "center"
    }, {
    	field: 'dataSource',
    	title: '原数据',
    	align : "center"
    }, {
    	field: 'dataTarget',
    	title: '目标数据',
    	align : "center"
    }, {
    	field: 'remark',
    	title: '备注',
    	align : "center" 
    }, {
    	field: 'creator',
    	title: '创建人',
    	align : "center" 
    }, {
    	field: 'createTime',
    	title: '创建时间',
    	align : "center"
//    	formatter : jsonTimeFormat
    } ];

function loadTable() {
	$('#log_tb').bootstrapTable({
		url : "/hoper/backweb/operateLog/page",
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
//	$(function(){
//		$("#log_tb tr").click(function(){
//			$("#log_tb tr").css("background","#fff");	
//			$(this).css("background","#B4E4E9");
//		})
//	});
}

function logSearch(id) {
	var options = $(id).bootstrapTable('getOptions');
	
	var json = queryParams({
		pageNumber : 1,
		pageSize : options.pageSize
	});
	if (!pcg_fun.isEmpty(json.businessNum) && pcg_fun.isEmpty(json.businessType)) {
		alert("要使用业务编号查询，必须选择业务类型！");
		return;
	}
	$(id).bootstrapTable('refresh', { query : json});
}

var businessTypeFormatJson = {
	"CUST" : "客户信息变更",
	"BANK" : "银行卡变更",
	"ORDER" : "订单信息变更",
	"BENE" : "订单转让"
};
var businessTypeCommoJson = [
	{"value" : "CUST", "text" : "客户信息变更"},
	{"value" : "BANK", "text" : "银行卡变更"},
	{"value" : "ORDER", "text" : "订单信息变更"},
	{"value" : "BENE", "text" : "订单转让"}];

function businessTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var v = businessTypeFormatJson[value];
	return pcg_fun.isEmpty(v) ? value : v;
}
