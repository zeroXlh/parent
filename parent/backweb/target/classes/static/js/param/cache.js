/**
 * 
 */
$(function () {
});

var productSubjectColumns = [
	{field : "index_" , title : "序号", align : "center", formatter : indexFormat},
	{field : "id" , title : "编号", align : "center"},
	{field : "productName" , title : "产品名称", align : "center"},
	{field : "folderPath" , title : "文件保存目录", align : "center"},
	{field : "protocolPrefix" , title : "合同前缀", align : "center"},
	{field : "custCoordinate" , title : "客户签章坐标", align : "center"}
];

var systemParamColumns = [
	{field : "index_" , title : "序号", align : "center", formatter : indexFormat},
	{field : "id" , title : "参数编号", align : "center"},
	{field : "paramType" , title : "参数类型", align : "center"},
	{field : "paramCode" , title : "参数编码", align : "center"},
	{field : "paramDesc" , title : "参数描述", align : "center"},
	{field : "paramValue" , title : "参数值", align : "center"},
	{field : "status" , title : "状态", align : "center"}
];

var holidayColumns = [
	{field : "index_" , title : "序号", align : "center", formatter : indexFormat},
//	{field : "id" , title : "节假日编号", align : "center"},
	{field : "holiday" , title : "节假日", align : "center"},
	{field : "isHoliday" , title : "是否节假日", align : "center"}
	];

var paymentAccountColumns = [
	{field : "index_" , title : "序号", align : "center", formatter : indexFormat},
	{field : "accountCode" , title : "企业注册编号", align : "center"},
	{field : "accountName" , title : "企业邮箱", align : "center"},
	{field : "bankCode" , title : "企业名称", align : "center"},
	{field : "bankInfo" , title : "企业注册编号", align : "center"}
];

var coordinateColumns = [
	{field : "index_" , title : "序号", align : "center", formatter : indexFormat},
	{field : "productSubjectId" , title : "产品项目", align : "center", formatter : productSubjectFormat},
	{field : "type" , title : "合同类型", align : "center"},
	{field : "id" , title : "企业注册编号", align : "center"},
	{field : "enterpriseName" , title : "企业名称", align : "center"},
	{field : "signRole" , title : "签章角色", align : "center"},
	{field : "list" , title : "企业签章坐标", align : "center", formatter : coordinateFormat},
	{field : "legalCoordinate" , title : "法人签章坐标", align : "center", formatter : coordinateFormat}
];

var orgColumns = [
	{field : "index_" , title : "序号", align : "center", formatter : indexFormat},
	{field : "orgCode" , title : "机构编码", align : "center"},
	{field : "orgName" , title : "机构名称", align : "center"}
	];

function loadTable(columns) {
	$('#cache_tb').bootstrapTable("destroy");
	$('#cache_tb').bootstrapTable({
		url : "/hoper/backweb/assist/cache/getCache",
        dataType: "json",
        method: "GET",
        striped: true,// 是否显示行间隔色
        cache: false,
        sidePagination: "server",// 分页方式：client客户端分页，server服务端分页（*）
        pagination: false, // 启动分页
        paginationShowPageGo: true,// 页码跳转
        sortable: true,// 排序
        pageNumber:1,  // 当前第几页
        pageSize: 10, // 每页显示的记录数
        showPaginationSwitch: false,// 展示页数的选择
        pageList: [10, 25, 50, 100],// 记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,// 设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: cacheHandler// 在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
}

function cacheSearch() {
	var columns = null;
	var type = $("#cacheType").val();
	if (pcg_fun.isEmpty(type)) {
		alert("请选择缓存类型");
		return;
	}
	switch(type) {
		case "PRODUCT_SUBJECT": columns = productSubjectColumns;
			break;
		case "PAYMENT_ACCOUNT": columns = paymentAccountColumns;
			break;
		case "SYSTEM_PARAM": columns = systemParamColumns;
			break;
		case "SIGN_COORDINATE": columns = coordinateColumns;
			break;
		case "BANK_ORGANIZATION": columns = orgColumns;
			break;
		case "HOLIDAY": columns = holidayColumns;
		break;
	}
	loadTable(columns);
}

function cacheHandler(result) {
	if(1 == result.code) {
		return {
//			total : result.data.total,
			rows : result.data
		};
	} else if (0 == result.code) {
		alert(result.msg);
		return { 
			rows : []
		};
	} else {
		alert(result);
		return { 
			rows : []
		};
	}
}

function reloadCache() {
	var type = $("#cacheType").val();
	if (pcg_fun.isEmpty(type)) {
		alert("请选择缓存类型");
		return;
	}
	jQuery.post("/hoper/backweb/assist/cache/reloadCache", {
		"cacheType" : type
	}, function(data) {
		if (1 == data.code) {
			$('#cache_tb').bootstrapTable("refresh");
			alert("缓存重载成功");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function operateFormat(value, row, index) {
	// 修改
	return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
				+ row.id + '\')">修改</button>';
}

function coordinateFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	return JSON.stringify(value);
}