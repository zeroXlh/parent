/**
 *
 */
$(function () {
    var tempArray = [{"value": "ALL", "text": "全部"}].concat(companyCombo);
    pcg_fun.loadCommonData("#company_q", tempArray, "value", "text", null);

    var m_html = "<option value=''>---请选择月份---</option>";
    for (var i = 1; i <= 12; i++) {
        m_html += "<option value='" + i + "'>" + i + "</option>";
    }
    $("#month").html(m_html);

    loadProductCascade("#productSubjectIdQuery", "#product_id", null);

    loadTable();
});

function loadTable() {
    $('#list').bootstrapTable({
        // url : "/hoper/backweb/plan/pagePlanCalendar",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber: 1,  //当前第几页
        pageSize: 100, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [100,200, 500, 1000],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        clickToSelect: true,
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: calendarQueryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        showFooter: true,
        onPostBody: merge_footer, //onPostBody是在bootstrap table表格的body渲染之后执行的事件，该事件参数返回需要渲染的data数据
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

function merge_footer() {
    var footer_tbody = $('.fixed-table-footer table tbody');
    var footer_tr = footer_tbody.find('>tr');
    var footer_td = footer_tr.find('>td');
    // var footer_td_1 = footer_td.eq(1);
    // var footer_td_5 = footer_td.eq(5);
    footer_td.eq(2).hide();
    footer_td.eq(3).hide();
    footer_td.eq(5).hide();
    footer_td.eq(7).hide();
    footer_td.eq(8).hide();
};

function calendarQueryParams(params) {
    var json = $("#query_form").serializeJson();

    json["pageNum"] = params.pageNumber;
    json["pageSize"] = params.pageSize;
    return json;
}

var first_load = true;
function calendarSearch(id) {
    var options = $(id).bootstrapTable('getOptions');
    queryParams({
        pageNumber: 1,
        pageSize: options.pageSize
    });

    var json = $("#query_form").serializeJson();
    if (!pcg_fun.isEmpty(json.year) && !isPositive(json.year)) {
        alert("请输入正确的年份，注意不要含空格");
        return;
    }

    json["pageNum"] = 1;
    json["pageSize"] = options.pageSize;
    var params = {query: json};
    if (first_load) {
        first_load = false;
        params.url = "/hoper/backweb/plan/pagePlanCalendar";
    }
    $(id).bootstrapTable('refresh', params);
}

var columns = [
    {"field": "company", "title": "公司", "align": "center", "formatter": companyFormat},
    {"field": "productName", "title": "产品名称", "align": "center", "formatter": productFormat,
        footerFormatter: function (data) {
            var count = 0;
            var count_prin=0
            var count_int=0
            for (var i = 0; i < data.length; i++) {
                count += data[i]["payAmountAmt"];
                if(data[i]["costCode"] == '本金')
                    count_prin +=data[i]["payAmountAmt"];
                else
                    count_int +=data[i]["payAmountAmt"];
            }
            return "<b>回款总金额：</b>" + financeFormat(count) +"&nbsp;&nbsp;<b>本金：</b>"
                + financeFormat(count_prin) +"&nbsp;&nbsp;<b>利息：</b>"+ financeFormat(count_int);
        }},
    {"field": "productDeadline", "title": "产品期限", "align": "center", "formatter": deadlineFormat},
    {"field": "totalOrderAmt", "title": "产品募集总金额", "align": "center", "formatter": financeFormat},
    {"field": "payQuarter", "title": "季度", "align": "center"},
    {"field": "payAmountAmt", "title": "产品回款金额", "align": "center", "formatter": financeFormat},
    {"field": "payCount", "title": "回款笔数", "align": "center",
        footerFormatter: function (data) {
        var count = 0;
        var count_prin=0
        var count_int=0
        for (var i = 0; i < data.length; i++) {
            count += data[i]["payCount"];
            if(data[i]["costCode"] == '本金')
                count_prin +=data[i]["payCount"];
            else
                count_int +=data[i]["payCount"];
        }
        return "<b>回款总笔数：</b>" + count +"&nbsp;&nbsp;<b>本金：</b>" + count_prin +"&nbsp;&nbsp;<b>利息：</b>"+count_int;
    }},
    {"field": "costCode", "title": "回款类型", "align": "center"},
    {"field": "payDate", "title": "回款时间", "align": "center", "formatter": jsonDateFormat},
    {"field": "status", "title": "状态", "align": "center", "formatter": statusFormat}
//	{"field" : "void", title : "操作", align : "left", "formatter" : operateFormat}
];

function exoperExcel() {
//	var data = encodeURIComponent(JSON.stringify($("#query_form").serializeJson()));
    var json = $("#query_form").serializeJson();
    if (!pcg_fun.isEmpty(json.month) && pcg_fun.isEmpty(json.year)) {
        alert("选择月份后请输入年份");
        return;
    }

    if (!pcg_fun.isEmpty(json.year) && !isPositive(json.year)) {
        alert("请输入正确的年份，注意不要含空格");
        return;
    }

    var param = "?";
    for (var item in json) {
        param += item + "=" + json[item] + "&";
    }
    param = param.substring(0, param.length - 1);
    window.open("/hoper/backweb/plan/exportCalendar" + param);
}

//var checkRepay = checkAuth("PLAN:CONFIRM_REPAYMENT");
//function operateFormat(value, row, index) {
//	var s = '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
//		+ row.id + '\')">金额明细</button>';
//	var currD = dateParse(currentDate);
//	var payD = dateParse(jsonDateFormat(row.payDate, "yyyy-MM-dd"));
//	if (1 == row.status && payD <= currD && checkRepay)
//	//	if (1 == row.status && payD <= currD && currD < dateAdd(payD, 3))
//		s += '&emsp;<button type="button" class="btn btn-info btn-sm" onClick="payment('
//			+ row.id + ')">确认回款</button>';
//	return s;
//}

// 产品每期每季度的总回款状态：存在一笔客户未回款就为未回款
var statusJson = {
    1: "回款中",
    0: "已回款"
};
function statusFormat(value, row, index) {
    if (pcg_fun.isEmpty(value))
        return "";
    var rs = statusJson[value];
    return pcg_fun.isEmpty(rs) ? value : rs;
}

function productFormat(value, row, index) {
    if (pcg_fun.isEmpty(value))
        return "-";
    var s = value;
    if (pcg_fun.isEmpty(row.period))
        return s;
    return s + row.period + "期";
}
