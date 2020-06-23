var columns = [
    {
        field: 'mobile',
        title: '手机号',
        align: 'center'
    }, {
        field: 'realName',
        title: '姓名',
        align: 'center'
    }, {
        field: 'idNo',
        title: '身份证号',
        align: 'center'
    }, {
        field: 'sex',
        title: '性别',
        align: 'center',
        formatter: certSexFormat
    }, {
        field: 'joinTime',
        title: '加入时间',
        align: 'center'
    }, {
        field: 'status',
        title: '状态',
        align: 'center',
        formatter: statusFormat
    }, {
        field: 'leaveTime',
        title: '离职时间',
        align: 'center'
    }, {
        field: 'groupName',
        title: '所属组织',
        align: 'center'
    }, {
        field: 'positionName',
        title: '职务',
        align: 'center'
    }, {
        field: 'id',
        title: '操作',
        align: 'center',
        formatter: operateFormat
    }];

function loadTable() {
    $('#tabEmployee').bootstrapTable({
        url: "/hoper/backweb/caifu/pageEmployee",
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
        contentType: 'application/json;charset=UTF-8',
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
    //表格变色
    $(function () {
        $("#tabEmployee tr").click(function () {
            $("#tabEmployee tr").css("background", "#fff");
            $(this).css("background", "#B4E4E9");
        })
    });
}

function getQueryParams() {
    var params = {};

    //if($("#"))
};

//var checkUpd = checkAuth("CUSTOMER:UPDATE_CUSTOMER");
function operateFormat(value, row, index) {
    var s = '';
    // 修改
    //s += '<button type="button" class="btn btn-info btn-sm" onClick="openViewDialog('+ row.id + ')">查看</button>';
    s += "<button type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" "
        + "data-target=\"#customerModal\" onClick=\"openViewDialog(" + row.id + ");\">查看</button>&nbsp;&nbsp;";
    if (row["status"] == 0 || row["status"] == 1) {
        s += "<button type=\"button\" class=\"btn btn-info btn-sm\" onClick=\"openUpdDialog("
            + row.id + ");\">编辑</button>&nbsp;&nbsp;";
        s += "<button type=\"button\" class=\"btn btn-info btn-sm\" onClick=\"openLeaveDialog("
            + row.id + ",'" + row.realName + "');\">离职</button>";
    }

    return s;
};

//弹出新增或者修改员工信息页面
function openUpdDialog(id) {
    jQuery.get("/hoper/backweb/caifu/getEmployee", {
        "id": id
    }, function (data) {
        if (1 == data.code) {
            $("#employee_form").clearForm(); //清空数据
            $("#employee_form").populateForm(data.data);  //填充数据
            $("#groupName").val(data.data.groupName); //单独设置组织名
            $("#groupId").val(data.data.groupId); //单独设置组织id

            $("#myModalLabel").text("修改员工信息");
            $('#employeeModal').modal(); //弹出窗口
        } else if (0 == data.code) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
}

//弹出离职员工信息页面
function openLeaveDialog(id, realName) {
    $("#leave_form").clearForm(); //清空数据
    var employeeData = {id: id, realName: realName};
    $("#leave_form").populateForm(employeeData);  //填充数据

    $("#leaveModalLabel").text("员工离职");
    $('#leaveModal').modal(); //弹出窗口
}

function saveEmployee() {
    if (!$("#employee_form").valid()) {
        return;
    }

    var json = $("#employee_form").serializeJson();
    var url = "/hoper/backweb/caifu/updateEmployee"; //修改
    var employeeId = json.id;
    if (employeeId == null) {
        url = "/hoper/backweb/caifu/addEmployee"; //新增
    }
    jQuery.post(url, json, function (data) {
        if (1 == data.code) {
            $('#employeeModal').modal('hide');
            $("#tabEmployee").bootstrapTable('refresh');
        } else if (data.code == 0) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");
}

function leaveEmployee() {
    if (!$("#leave_form").valid()) {
        return;
    }

    var json = $("#leave_form").serializeJson();
    var employeeId = json.id;
    if (!employeeId) {
        alert('请选中要离职的员工!')
        return;
    }

    if (!$("#handover").val()) {
        $("#handover").val(0);
    }

    console.info("leaveEmployee==" + json);
    jQuery.post("/hoper/backweb/caifu/leaveEmployee", json, function (data) {
        if (1 == data.code) {
            $('#leaveModal').modal('hide');
            $("#tabEmployee").bootstrapTable('refresh');
        } else if (data.code == 0) {
            alert(data.msg);
        } else {
            alert(data);
        }
    }, "json");

}

var validator = $("#employee_form").validate({
    ignore: "",
    onfocusout: false,
    onkeyup: false,
    onclick: false,
    rules: {
        realName: {
            "required": true,
            utfmaxlength: 60
        },
        mobile: {
            "required": true,
            "mobile": true
        },
        joinTime: "required",
        idNo: {
            "required": true,
            utfmaxlength: 32
        },
        groupName: {
            "required": true,
            utfmaxlength: 500
        },
        positionId: "required"
    }, showErrors: function (errorMap, errorList) {
        this.defaultShowErrors();
        for (var i = 0; i < errorList.length; i++) {
            $(errorList[i].element).one("blur", function () {
                $("label.error[for='" + (this.id ? this.id : this.name) + "']").remove();
            });
        }
    }
});

//性别判断
function certSexFormat(value, row, index) {
    if (pcg_fun.isEmpty(value))
        return "-";
    return "0" == value ? "女" : "男";
}

//状态判断
function statusFormat(value, row, index) {
    if (pcg_fun.isEmpty(value))
        return "-";
    return "-1" == value ? "离职" : "0" == value ? "居间" : "-2" == value ? "删除" : "在职"
}

//加载职位权限
function loadEmployeePosition() {
    jQuery.get("/hoper/backweb/caifu/getEmployeePosition", function (data) {
        if (1 == data.code) {
            var dataList = data.data;
            for (var i = 0; i < dataList.length; i++) {
                $("#positionId").append("<option value='" + dataList[i].id + "'>" + dataList[i].positionName + "</option>");
            }

        } else {
            alert("加载职位失败");
        }
    }, "json");
}

//初始化就加载树形架构
function add() {
    $("#employee_form").clearForm(); //清空数据
    $("#myModalLabel").text("新增客户信息");
    $('#employeeModal').modal(); //弹出窗口
}

//弹出导入框
function openImportDialog() {
    $("#file").val("");
    $('#upload_modal').modal();
}

function openDeleteDialog() {
    $("#file").val("");
    $('#delete_modal').modal();
}

//文件上传
function importExcel() {
    buttonSync(true);
    if (!filePreCheck(false, 0)) {
        buttonSync(false);
        return;
    }
    $.ajaxFileUpload({
        url: '/hoper/backweb/caifu/employee/uploadEmployees',
        type: 'post',
        secureuri: false, // 一般设置为false
        fileElementId: 'file', // 上传文件的id、name属性名
        dataType: 'json', // 返回值类型，一般设置为json、application/json
        success: function (data, status) {
            buttonSync(false);
            if (1 == data.code) {
                $("#list").bootstrapTable('refresh');
                $('#upload_modal').modal('hide');
                alert("上传成功！" + data.msg);
                //获取batchNo
                if (pcg_fun.isEmpty(data.data)) {
                    location.reload(); //重新查询一次
                } else {
                    window
                        .open("/hoper/backweb/jjsUploadLog/downloadFailFile?batchNo="
                            + data.data);
                    loadTable(); //表格重新加载
                }

            } else if (0 == data.code) {
                alert(data.msg);
            } else {
                alert(data);
            }
        },
        error: function (data, status, e) {
            buttonSync(false);
            alert(e);
        }
    });
}

//批量离职
function leaveExcel() {
    buttonSync(true);
    if (!filePreCheck(false, 1)) {
        buttonSync(false);
        return;
    }
    $.ajaxFileUpload({
        url: '/hoper/backweb/caifu/employee/leaveEmployees',
        type: 'post',
        secureuri: false, // 一般设置为false
        fileElementId: 'leaveFile', // 上传文件的id、name属性名
        dataType: 'json', // 返回值类型，一般设置为json、application/json
        success: function (data, status) {
            buttonSync(false);
            if (1 == data.code) {
                $("#list").bootstrapTable('refresh');
                $('#delete_modal').modal('hide');
                alert("上传成功！" + data.msg);
                //获取batchNo
                if (pcg_fun.isEmpty(data.data)) {
                    location.reload(); //重新查询一次
                } else {
                    window
                        .open("/hoper/backweb/jjsUploadLog/downloadFailFile?batchNo="
                            + data.data);
                    loadTable(); //表格重新加载
                }

            } else if (0 == data.code) {
                alert(data.msg);
            } else {
                alert(data);
            }
        },
        error: function (data, status, e) {
            buttonSync(false);
            alert(e);
        }
    });
}


function filePreCheck(checkProduct, type) {
    var video_src_file = null;
    if (type == 0) {
        video_src_file = $("#file").val();
    } else {
        video_src_file = $("#leaveFile").val();
    }
    if (pcg_fun.isEmpty(video_src_file)) {
        alert('请选择文件！');
        return false;
    }
    var index = video_src_file.lastIndexOf(".");
    if (index == -1) {
        alert("文件名称错误！");
        return false;
    }
    var suffix = video_src_file.substring(index + 1);
    if ("xls" != suffix && "xlsx" != suffix) {
        alert('文档类型不支持，只允许xls,xlsx文档格式！');
        return false;
    }
    return true;
}

function buttonSync(flag) {
    $("button.upload-bt-sync").attr("disabled", flag);
}

var customerColumns = [
    {
        field: 'mobile',
        title: '客户手机号',
        align: 'center'
    }, {
        field: 'realName',
        title: '客户姓名',
        align: 'center'
    },
    {
        field: 'sex',
        title: '性别',
        align: 'center'
    },
    {
        field: 'idNo',
        title: '身份证号',
        align: 'center'
    }];

//查看理财经理名下客户
function openViewDialog(id) {
    //首先销毁表格
    $('#tabCustomer').bootstrapTable('destroy');
    $('#tabCustomer').bootstrapTable({
        url: "/hoper/backweb/caifu/pageCustomer?employeeId=" + id,
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
        contentType: 'application/json;charset=UTF-8',
        queryParamsType: '', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: customerColumns,
        responseHandler: handler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
}

function groupClick() {
    //$("#treepage").style.display = "block";
    if ($("#treepage").css('display') == 'none') {
        $("#treepage").css('display', 'block');
    } else {
        $("#treepage").css('display', 'none');
    }
}

function groupBlur() {
    if ($("#treepage").css('display') == 'block') {
        $("#treepage").css('display', 'none');
    }
}
function handoverClick() {
    //$("#treepage").style.display = "block";
    if ($("#treeLeave").css('display') == 'none') {
        $("#treeLeave").css('display', 'block');
    } else {
        $("#treeLeave").css('display', 'none');
    }
}

function handoverBlur() {
    if ($("#treeLeave").css('display') == 'block') {
        $("#treeLeave").css('display', 'none');
    }
}

$(function () {
    loadCustTypeCombo("#custType");
    loadTable();

    loadEmployeePosition(); //加载职位权限表

    //initTree(); //初始化加载树形结构
});



