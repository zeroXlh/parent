/**
 * 
 */

//
$(function () {
	loadProductCustomer("#product");
	loadTable();
});

var columns = [
    {
    	field: 'smsCode',
    	title: '短信编号',
    	align : "center" 
    }, {
    	field: 'smsType',
    	title: '短信类型',
    	align : "center",
    	formatter : smsTypeFormat
    }, {
    	field: 'phoneNo',
    	title: '手机号',
    	align : "center" 
    }, {
    	field: 'custName',
    	title: '客户名称',
    	align : "center" 
    }, {
    	field: 'product',
    	title: '产品',
    	align : "center" 
    }, {
    	field: 'quarter',
    	title: '季度',
    	align : "center" 
    }, {
        field: 'content',
        title: '短信内容',
    	align : "center" 
    }, {
    	field: 'planSendTime',
    	title: '计划发送时间',
    	align : "center",
    	formatter : jsonTimeFormat
    }, {
    	field: 'actualSendTime',
    	title: '实际发送时间',
    	align : "center",
    	formatter : jsonTimeFormat 
    }, {
    	field: 'times',
    	title: '发送次数',
    	align : "center" 
    }, {
    	field: 'sendStatus',
    	title: '发送状态',
    	align : "center" 
    }, {
    	field: 'failReason',
    	title: '失败原因',
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
	$('#sms_log_tb').bootstrapTable({
		url : "/hoper/backweb/jjsSmsLog/page",
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
		$("#sms_log_tb tr").click(function(){
			$("#sms_log_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

var smsTypeFormatJson = {
	"C" : "客户-回款提醒",
	"S" : "员工-回款提醒",
	"CB" : "客户-生日祝福"
}
function smsTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = smsTypeFormatJson[value];
	if (pcg_fun.isEmpty(val))
		return value;
	return val;
}
