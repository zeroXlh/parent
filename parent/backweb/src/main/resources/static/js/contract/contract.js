/**
 * 
 */
$(function() {
	loadProductCascade("#productSubjectIdQuery", "#productIdQuery", null);
	loadTable();
	
	loadProductCustomer("#productId");
	loadCustTypeCombo("#custType");
});

function loadTable() {
	$('#list').bootstrapTable({
		url : "/hoper/backweb/jjsContractRecord/pageContractRecord",
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
//		$("#list tr").click(function(){
//			$("#list tr").css("background","#fff");	
//			$(this).css("background","#B4E4E9");
//
//		})
//	});
}

var columns = [
	{
		field : "id",
		title : "合同记录编号",
		align : "center" 
	}, {
		field : "protocolNo",
		title : "协议号",
		align : "center" 
	}, {
		field : "custName",
		title : "投资人",
		align : "center"
	}, {
		field : "custType",
		title : "客户类型",
		align : "center",
		formatter : custTypeFormat
	}, {
		field : "contractName",
		title : "合同名称",
		align : "center"
	}, {
		field : "contractAmount",
		title : "合同金额",
		align : "center" 
	}, {
		field : "signStatus",
		title : "签约状态",
		align : "center",
		formatter : signStatusFormat
	}, {
		field : "createTime",
		title : "创建时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "lastUpdateTime",
		title : "最新更新时间",
		align : "center",
		formatter : jsonTimeFormat
	}, {
		field : "void",
		title : "操作",
		align : "left",
		formatter : operateFormat
	}
];

function signContractZip(isRegenerate) {
	var productId = $('#productIdQuery').val();
    if (pcg_fun.isEmpty(productId)) {
        alert('请选择产品和期数!');
        return;
    }
    jQuery.get("/hoper/backweb/assist/contractSignZip", {
    	"productId" : productId,
    	"isRegenerate" : isRegenerate
    },function(result){
    	if (result.code == 1) {
            window.open(result.data);
        } else if (0 == result.code) {
            alert(result.msg);
        } else {
        	alert(result);
        }
    }, "json");
};

var checkView = checkAuth("CONTRACT:VIEW_OR_DOWNLOAD_CONTRACT");
var checkRe = checkAuth("CONTRACT:REGENERATE_CONTRACT");
function operateFormat(value, row, index) {
	var str = "";
	if (checkView) {
		str += '<button type="button" class="btn btn-info btn-sm" onClick="getLink(1, \''
			+ row.id + '\')">查看合同</button>';
		str += '&emsp;<button type="button" class="btn btn-info btn-sm" onClick="getLink(2, \''
			+ row.id + '\')">下载合同</button>';
	}
	if (checkRe)
		str += '&emsp;<button type="button" class="btn btn-warning btn-sm" onClick="reGenerateContract(\''
			+ row.id + '\')">重新生成合同</button>';
	return str;
}

function reGenerateContract(id) {
	if(!confirm("您确认需要重新生成合同吗?")) return;

	jQuery.post("/hoper/backweb/jjsContractRecord/reGenerateContract", {
		"contractId" : id
	}, function(data) {
		if (1 == data.code) {
			$('#list').bootstrapTable("refresh");
			alert("重新生成合同成功");
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function getLink(type, id) {
	// type:1-查看链接、2-下载链接
	jQuery.post("/hoper/backweb/jjsContractRecord/getLink", {
		"type" : type,
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			window.open(data.data);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}
var signStatusFormatJson = {
	0 : "未查询",
	1 : "已签约",
	3 : "已保全"
};
function signStatusFormat(value, row, index) {
	var val = signStatusFormatJson[value];
	if (pcg_fun.isEmpty(val))
		return value;
	return val;
}

function generateContractDialog() {
	$("#generateForm select").each(function() {
		$(this).val($(this).find("option[selected='selected']").val());
	});
	$("#generateModal").modal("show");
}

function generateBatchContract(type) {
	displayBtn(true);
	if (pcg_fun.isEmpty(type)) {
		displayBtn(false);
		return;
	}
	
	var productId = $("#productId").val();
	var force = $("#force").val();
	if (pcg_fun.isEmpty(productId)) {
		alert("请先选择产品！");
		displayBtn(false);
		return;
	}
	
	jQuery.post("/hoper/backweb/assist/generateContract", {
		"productId" : productId,
		"type" : type,
		"force" : force
	}, function(data) {
		if (1 == data.code) {
			$("#generateModal").modal("hide");
			$("#list").bootstrapTable("refresh");
			alert("回款计划已生成，签章合同正在生成！");
		} else if (0 == data.code) {
			alert("合同生成失败：" + data.msg);
		} else {
			alert(data);
		}
		displayBtn(false);
	}, "json");
}

function displayBtn(flag) {
	$("button.bt_generate").attr("disabled", flag);
}
