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
    	field: 'phoneNoTarget',
    	title: '手机号',
    	align : "center",
    	formatter : phoneNoFormat
    }, {
    	field: 'custNameTarget',
    	title: '姓名',
    	align : "center",
   		formatter : custNameForamt
    }, {
    	field: 'certNoTarget',
    	title: '身份证号',
    	align : "center",
    	formatter : certNoForamt
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
	$('#user_log_tb').bootstrapTable({
		url : "/hoper/backweb/jjsUserLog/page",
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
		$("#user_log_tb tr").click(function(){
			$("#user_log_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function certNoForamt(value, row, index) {
	var cn = row.certNoSource;
	if (pcg_fun.isEmpty(value))
		return "-";
	cn = pcg_fun.isEmpty(cn) ? "" : cn;
	return "[" + cn +"->" + value + "]";
}

function custNameForamt(value, row, index) {
	var cn = row.custNameSource;
	if (pcg_fun.isEmpty(value))
		return "-";
	cn = pcg_fun.isEmpty(cn) ? "" : cn;
	return "[" + cn +"->" + value + "]";
}

function phoneNoFormat(value, row, index) {
	var pn = row.phoneNoSource;
	if (pcg_fun.isEmpty(value))
		return "-";
	pn = pcg_fun.isEmpty(pn) ? "" : pn;
	return "[" + pn +"->" + value + "]";
}
