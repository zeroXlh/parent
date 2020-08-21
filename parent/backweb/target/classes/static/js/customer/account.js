/**
 * 
 */

//
$(function () {
	loadTable();
});

var columns = [
    {
        field: 'accountId',
        title: '账号编号',
        align : 'center'
    }, {
    	field: 'custId',
    	title: '客户编号',
    	align : 'center'
    }, {
    	field: 'phoneNo',
    	title: '客户手机号',
        align : 'center'
    }, {
    	field: 'userName',
    	title: '客户用户名',
    	align : 'center'
    }, {
        field: 'email',
        title: '邮箱',
        align : 'center'
    }, {
    	field: 'registerTime',
    	title: '注册时间',
    	align : 'center'
    }, {
    	field: 'void',
    	title: '操作',
    	formatter : operateFormat,
        align : 'center'
    } ];

function loadTable() {
	$('#account_tb').bootstrapTable({
		url : "/hoper/backweb/custAccount/page",
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
		$("#account_tb tr").click(function(){
			$("#account_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function operateFormat(value, row, index) {
	// 修改
//	return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
//				+ row.id + '\')">修改</button>';
	// 删除（逻辑）
}
