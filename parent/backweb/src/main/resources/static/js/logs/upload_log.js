/**
 * 
 */

//
$(function () {
	loadTable();
});

var columns = [
    {
    	field: 'id',
    	title: '编号',
    	align : "center" 
    }, {
    	field: 'batchNo',
    	title: '批次号',
    	align : "center" 
    }, {
    	field: 'filename',
    	title: '文件名',
    	align : "center" 
    }, {
        field: 'category',
        title: '文件类别',
    	align : "center",
    	formatter : categoryFormat
    }, {
    	field: 'total',
    	title: '上传总数',
    	align : "center" 
    }, {
    	field: 'succTotal',
    	title: '上传成功',
    	align : "center" 
    }, {
    	field: 'failTotal',
    	title: '上传失败',
    	align : "center" 
//    }, {
//    	field: 'status',
//    	title: '状态',
//    	align : "center" 
    }, {
    	field: 'uploadTime',
    	title: '上传时间',
    	align : "center",
    	formatter : jsonTimeFormat
    }, {
    	field: 'uploadUser',
    	title: '上传者',
    	align : "center" 
    }, {
    	field: 'void',
    	title: '操作',
    	align : "left",
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#upload_log_tb').bootstrapTable({
		url : "/hoper/backweb/jjsUploadLog/page",
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
		$("#upload_log_tb tr").click(function(){
			$("#upload_log_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function operateFormat(value, row, index) {
	var s = '<button type="button" class="btn btn-info btn-sm" onClick="downloadFile(\''
		+ row.id + '\', \'upload\')">下载上传文件</button>';
	if (!pcg_fun.isEmpty(row.failDataPath))
		s += '&nbsp;&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="downloadFile(\''
			+ row.id + '\', \'fail\')">下载失败细节文件</button>';
	return s;
}

function downloadFile(id, type) {
	window.open("/hoper/backweb/jjsUploadLog/download?logId=" + id + "&type=" + type);
}

var categoryFormatMap = {
	"FINAL" : "最终上传文件",
	"DAILY" : "每日上传文件",
	"CHECK" : "校验上传文件",
	"MISSING" : "漏单上传文件",
	"HOLIDAY" : "节假日文件",
	"APPOINT" : "预约文件"
};
function categoryFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = categoryFormatMap[value];
	return pcg_fun.isEmpty(val) ? value : val;
}