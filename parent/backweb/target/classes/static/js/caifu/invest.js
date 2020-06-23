/**
 *
 */

//
$(function () {
    loadTable();
    //document.getElementById("treepage").style.height = (window.innerHeight-100) + "px";
    document.getElementById("treepage").style.height = "1650px";

    jQuery.get("/hoper/backweb/productSubjectList", {}, function (data) {
        if (1 == data.code) {
            $("#productSubjectIdQuery").empty();
            var v = data.data;
            var options = "<option value='' selected='selected'>---请选择---</option>";
            for (var i = 0; i < v.length; i++) {
                options += "<option value='" + v[i]["id"] + "'>" + v[i]["productName"] + "</option>";
            }
            $("#productSubjectIdQuery").html(options);


        } else {
            alert("加载产品科目下拉框参数失败");
        }
    }, "json");

});

var columns = [
    {
        field: 'orderId',
        title: '投资编号',
        align: 'center',
        formatter: rowDataFormat
    }, {
        field: 'empoyeeName',
        title: '员工',
        align: 'center'
    }, {
        field: 'introducer',
        title: '手机号',
        align: 'center'
    }, {
        field: 'userRealName',
        title: '投资人',
        align: 'center'
    }, {
        field: 'userMobile',
        title: '手机号码',
        align: 'center',
        footerFormatter: function (data) {
            return "合计年化：";
        }
    }, {
        field: 'yearMoney',
        title: '年化业绩(元)',
        align: 'center',
        formatter: financeFormat,
        footerFormatter: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count += data[i]["yearMoney"];
            }
            return financeFormat(count);
        }
    }, {
        field: 'productName',
        title: '投资项目',
        width: '120px',
        align: 'center'
        //formatter:rowDataFormat
    }, {
        field: 'cycle',
        title: '投资期数',
        align: 'center'
    }, {
        field: 'productRate',
        title: '年利率(%)',
        align: 'center',
        footerFormatter: function (data) {
            return "合计入金：";
        }
    }, {
        field: 'userInvestMoney',
        title: '投资金额(元)',
        align: 'center',
        footerFormatter: function (data) {
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                count += data[i]["userInvestMoney"];
            }
            return financeFormat(count);
        }
    }, {
        field: 'userInvestTime',
        title: '投资时间',
        align: 'center'
    }, {
        field: 'productValueTime',
        title: '起息时间',
        align: 'center'
    }, {
        field: 'expire_day',
        title: '尾款时间',
        align: 'center'
    },
    {
        field: 'lastMoney',
        title: '尾款金额',
        align: 'center'
    },
    {
        field: 'incomeAmt',
        title: '收益金额',
        align: 'center'
    },
    {
        field: 'teamName',
        title: '团 队',
        align: 'center'
    },
    {
        field: 'salesDepartmentName',
        title: '营业部',
        align: 'center'
    },
    {
        field: 'branchOfficeName',
        title: '分公司',
        align: 'center'
    },
    {
        field: 'businessName',
        title: '事业部',
        align: 'center'
    }

];
function rowDataFormat(value, row, index) {
    var span = document.createElement('span');
    span.setAttribute('title', value);
    if (value.length > 7) {
        span.innerHTML = value.substr(0, 5) + "...";
    } else {
        span.innerHTML = value;
    }
    return span.outerHTML;
};

function inventsQuery(tabId) {
    if (!$('#structureId').val()) {
        alert("请选择要查询的组织机构或个人!");
        return;
    } else {
        search(tabId);
    }
};

function loadTable() {
    $('#cust_tb').bootstrapTable({
        url: "/hoper/backweb/caifu/pageInvest",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber: 1,  //当前第几页
        pageSize: 25, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [25, 50, 100, 200],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        showExport: true, //是否显示导出
        showFooter: true,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
    //表格变色
    $(function () {
        $("#cust_tb tr").click(function () {
            $("#cust_tb tr").css("background", "#fff");
            $(this).css("background", "#B4E4E9");
        })
    });
}

$("#productSubjectIdQuery").change(function () {
    var productSubjectId = $("#productSubjectIdQuery").val();
    console.log("productSubjectId=" + productSubjectId);
    jQuery.get("/hoper/backweb/product/getProducts?productSubjectId=" + productSubjectId, {}, function (data) {
        if (1 == data.code) {
            $("#period").empty();
            var v = data.data;
            var options = "<option value='' selected='selected'>---请选择---</option>";
            for (var i = 0; i < v.length; i++) {
                options += "<option value='" + v[i]["period"] + "'>" + v[i]["period"] + "</option>";
            }
            $("#period").html(options);
        } else {
            alert("加载产品期数下拉框参数失败");
        }
    }, "json");
})

//导出方法
function exportSubscription() {
    var json = $("#query_form").serializeJson();
    console.log(json);
    var param = "";
    for (var item in json) {
        if (param.length == 0)
            param = "?";
        param += item + "=" + json[item] + "&";
    }
    param = param.substring(0, param.length - 1);
    window.open("/hoper/backweb/caifu/export" + param);
}

function complete() {
    var url = "/hoper/backweb/caifu/completeOrder";
    jQuery.post(url, function (data) {
        if (1 == data.code) {
            alert("success");
            $('#employeeModal').modal('hide');
            $("#cust_tb").bootstrapTable('refresh');
        } else if (0 == data.code) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
}
