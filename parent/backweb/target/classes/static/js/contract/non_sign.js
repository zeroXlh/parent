/**
 *
 */
$(function () {
//    loadProductSubject("#productSubjectIdQuery");
//	loadProduct("#product_id_query");
    loadProductCascade("#productSubjectIdQuery", "#productIdQuery", null);

    loadTable();
});


function loadTable() {
    $('#list').bootstrapTable({
        url: "/hoper/backweb/pageSubscription",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber: 1,  //当前第几页
        pageSize: 10, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [10, 25, 50, 100],//记录数可选列表
        clickToSelect: true,
        singleSelect: true,
        contentType: 'application/json;charset=UTF-8',
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: orderQueryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
    //表格变色
    $(function () {
        $("#list tr").click(function () {
            $("#list tr").css("background", "#fff");
            $(this).css("background", "#B4E4E9");

        })
    });
}

var columns = [
    {
        field: "custName",
        title: "投资人",
        align: "center"
    }, {
        field: "phoneNo",
        title: "投资人手机",
        align: "center"
    }, {
        field: "reservationTime",
        title: "预约时间",
        align: "center",
        formatter: jsonTimeFormat
    }, {
        field: "preOrderAmt",
        title: "预约金额",
        align: "center",
        formatter: financeFormat
    }, {
        field: "bankInfo",
        title: "银行名称",
        align: "center"
    }, {
        field: "bankCode",
        title: "银行卡号",
        align: "center"
    }, {
        field: "actualOrderAmt",
        title: "认购金额",
        align: "center",
        formatter: financeFormat
    }, {
        field: "repaymentStatus",
        title: "状态",
        align: "center",
        formatter: repaymentStatusFormat
    }, {
        field: "productSubjectId",
        title: "产品",
        align: "center",
        formatter: productFormat
    }, {
        field: "productDeadline",
        title: "期限",
        align: "center",
        formatter: productDeadlineFormat
    }, {
        field: "annualizedIncome",
        title: "利率",
        align: "center",
        formatter: annualizedIncomeFormat
    }, {
        field: "void",
        title: "操作",
        align: "left",
        formatter: nonSignOperateFormat
    }
];

function orderQueryParams(params) {
	var json = $("#query_form").serializeJson();
	json["pageNum"] = params.pageNumber;
	json["pageSize"] = params.pageSize;
	return {"param" : JSON.stringify(json)};
}

function noSignContractZip(isRegenerate) {
    var productId = $('#productIdQuery').val();
    if (pcg_fun.isEmpty(productId)) {
        alert('请选择产品和期数!');
        return;
    }

    jQuery.get("/hoper/backweb/assist/contractZip", {
    	"productId" : productId,
    	"isRegenerate" : isRegenerate
    },function(result){
    	if (1 == result.code) {
            window.open(result.data);
        } else if (0 == result.code) {
            alert(result.msg);
        } else {
        	alert(result);
        }
    }, "json");
};

var check = checkAuth("CONCACT:PAPER_CAPA_CITOR");
function nonSignOperateFormat(value, row, index) {
    var s = '';
    if (2 == row.repaymentStatus && check) {
        s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="generateNonSignContract(\''
            + row.id + '\')">合同书</button>';
        s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="generateCover(\''
            + row.id + '\')">封皮</button>';
    }
    return s;
}

function generateNonSignContract(id) {
    window.open("/hoper/backweb/assist/generateNonSignContract?subscriptionId=" + id);
}

function generateCover(id) {
    window.open("/hoper/backweb/assist/genrateCover?subscriptionId=" + id);
}

function productDeadlineFormat(value, row, index) {
    var s = value;
    if (0 == row.deadlineType) {
        s += "天";
    } else if (1 == row.deadlineType) {
        s += "月";
    }
    return s;
}

var repaymentStatusJson = {
    0: "未付款",
    1: "待起息",
    2: "回款中",
    3: "已完成",
    4: "已退款"
};
function repaymentStatusFormat(value, row, index) {
    if (pcg_fun.isEmpty(value))
        return "";
    var rs = repaymentStatusJson[value];
    return pcg_fun.isEmpty(rs) ? value : rs;
}

function productFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = productSubjectMapping[value];
	if (pcg_fun.isEmpty(val))
		return value;
	if (pcg_fun.isEmpty(row.period))
		return val;
	val += row.period + "期";
	return val;
}
