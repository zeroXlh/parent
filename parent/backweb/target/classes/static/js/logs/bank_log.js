/**
 * 
 */

//
$(function () {
	loadTable();
});

var columns = [
    {
    	field: 'userId',
    	title: '用户编号',
    	align : "center" 
    }, {
    	field: 'bankId',
    	title: '银行卡编号',
    	align : "center" 
    }, {
    	field: 'phoneNo',
    	title: '客户手机号',
    	align : "center" 
    }, {
        field: 'custName',
        title: '客户名称',
    	align : "center" 
    }, {
    	field: 'certNo',
    	title: '客户证件号',
    	align : "center" 
    }, {
    	field: 'bankCodeTarget',
    	title: '银行卡号',
    	align : "center",
    	formatter : bankCodeFormat
    }, {
    	field: 'bankInfoTarget',
    	title: '银行卡信息',
    	align : "center",
    	formatter : bankInfoFormat
    }, {
    	field: 'remark',
    	title: '备注',
    	align : "center" 
    }, {
    	field: 'createTime',
    	title: '创建时间',
    	align : "center",
    	formatter : jsonTimeFormat
    }, {
    	field: 'creator',
    	title: '创建人',
    	align : "center" 
    } ];

function loadTable() {
	$('#bank_log_tb').bootstrapTable({
		url : "/hoper/backweb/jjsUserBankLog/page",
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
		$("#bank_log_tb tr").click(function(){
			$("#bank_log_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function bankCodeFormat(value, row, index) {
	var bc = row.bankCodeSource;
	if (pcg_fun.isEmpty(value))
		return "-";
	bc = pcg_fun.isEmpty(bc) ? "" : bc;
	return "[" + bc +"->" + value + "]";
}

function bankInfoFormat(value, row, index) {
	var bi = row.bankInfoSource;
	if (pcg_fun.isEmpty(value))
		return "-";
	bi = pcg_fun.isEmpty(bi) ? "" : bi;
	return "[" + bi +"->" + value + "]";
}
