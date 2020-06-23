/**
 *
 */

//
$(function () {
    loadTable();
    //document.getElementById("treepage").style.height = (window.innerHeight-100) + "px";
    document.getElementById("treepage").style.height = "2200px";

});

var columns = [
    {
        field: 'empoyeeName',
        title: '员工',
        align: 'center',
        formatter: function (value, row, index) {
            var a = "";
            a = '<span style="color:#fa9f00">' + value + '</span>';
            return a;
        }
    }, {
        field: 'introducer',
        title: '手机号码',
        align: 'center'
    }, {
        field: 'userRealName',
        title: '客户',
        align: 'center'
    }, {
        field: 'userMobile',
        title: '客户手机号',
        align: 'center'
    }, {
        field: 'investCount',
        title: '投资次数',
        align: 'center'
    }, {
        field: 'firstInvestTime',
        title: '首次投资时间',
        align: 'center'
    }, {
        field: 'teamName',
        title: '团队名称',
        align: 'center'
    },
    {
        field: 'id',
        title: '投资明细',
        align: 'center',
        formatter: operateFormat
    }

];

function loadTable() {
    $('#cust_tb').bootstrapTable({
        url: "/hoper/backweb/caifu/pageInvite",
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
        pageList: [25, 50, 100],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
    //表格变色
    $(function () {
        $("#cust_tb tr").click(function () {
            $("#cust_tb tr").css("background", "#fff");
            $(this).css("background", "#B4E4E9");
        })
    });
};

function inviteQuery(tabId) {
    if (!$('#structureId').val()) {
        alert("请选择要查询的组织机构或个人!");
        return;
    } else {
        search(tabId);
    }
};
//导出方法
function exportSubscription(id) {
    jQuery.get("/hoper/backweb/caifu/addOrder", {
        "custId": id
    }, function (data) {
        if (1 == data.code) {
            validator.resetForm();
            $("#cust_form").clearForm();

            var falg = ("Y" == data.data.alreadyAuth);
            // 已认证的客户不可再修改姓名和身份证号
            $("#certNo").attr("disabled", falg);
            $("#custName").attr("disabled", falg);
            $("#certArea").attr("disabled", falg);

            $("#cust_form").populateForm(data.data);
            $("#myModalLabel").text("修改客户信息");
            $('#custModal').modal();
        } else if (0 == data.code) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
}

//查看
function operateFormat(value, row, index) {
    var s = ' ';
    s += '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"' +
        ' onClick="openViewDialog(' + row.customerId + ')">投资明细</button>';
    return s;
}

var customerColumns = [
    {
        field: 'userMobile',
        title: '客户手机号',
        align: 'center'
    }, {
        field: 'userRealName',
        title: '客户姓名',
        align: 'center'
    },
    {
        field: 'productName',
        title: '产品全称',
        align: 'center'
    },
    {
        field: 'userInvestTime',
        title: '投资时间',
        align: 'center'
    },
    {
        field: 'userInvestMoney',
        title: '投资金额',
        align: 'center'
    },
    {
        field: 'expire_day',
        title: '最后回款时间',
        align: 'center'
    }
    ,
    {
        field: 'lastMoney',
        title: '最后回款金额',
        align: 'center'
    }
];

//查看理财经理名下客户的投资记录
function openViewDialog(customerId) {
    //首先销毁表格
    $('#customer_tb').bootstrapTable('destroy');
    $('#customer_tb').bootstrapTable({
        url: "/hoper/backweb/caifu/pageInvestRecord?customerId=" + customerId,
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
        pageList: [10, 25, 50,100],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: customerColumns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
};

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
    window.open("/hoper/backweb/caifu/exportInvite" + param);
};


