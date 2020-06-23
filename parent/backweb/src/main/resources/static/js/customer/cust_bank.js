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
    	title: '银行卡编号',
    	align : "center"
    }, {
    	field: 'userId',
    	title: '用户编号',
    	align : "center"
    }, {
    	field: 'bankCode',
    	title: '银行卡号',
    	align : 'center'
    }, {
    	field: 'bankInfo',
    	title: '银行卡信息',
    	align : 'center'
    }, {
        field: 'phoneNo',
        title: '客户手机号',
        align : 'center'
    }, {
        field: 'custName',
        title: '客户名称',
        align : 'center'
    }, {
    	field: 'certNo',
    	title: '客户证件号',
        align : 'center'
    }, {
    	field: 'status',
    	title: '状态',
    	align : "center",
    	formatter : statusFormat
    }, {
    	field: 'defaultUse',
    	title: '默认使用',
    	align : "center",
    	formatter : defaultUseFormat
    }, {
    	field: 'alreadyAuth',
    	title: '已认证',
    	align : 'center',
    	formatter : alreadyAuthFormat
    }, {
    	field: 'createTime',
    	title: '创建时间',
        align : 'center',
    	formatter : jsonTimeFormat
    }, {
    	field: 'creator',
    	title: '创建人',
        align : 'center'
//    }, {
//    	field: 'lastUpdateTime',
//    	title: '最后更新时间',
//        align : 'center',
//    	formatter : jsonTimeFormat
//    }, {
//    	field: 'lastUpdateUser',
//    	title: '最后更新人',
//        align : 'center'
    }, {
    	field: 'void',
    	title: '操作',
        align : 'left',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#bank_tb').bootstrapTable({
		url : "/hoper/backweb/jjsUser/pageCustBank",
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
		$("#bank_tb tr").click(function(){
			$("#bank_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

var checkUpd = checkAuth("CUSTOMER:UPDATE_BANK");
var checkActive = checkAuth("CUSTOMER:ENABLE_OR_DISABLE_BANK");
var checkDef = checkAuth("CUSTOMER:SETUP_DEFAULT");
function operateFormat(value, row, index) {
	// 修改
	var s = '';
	if (checkUpd)
		s += '<button type="button" class="btn btn-success btn-sm" onClick="openUpdDialog('
			+ row.id + ')">修改</button>';
	
	if (checkActive) {
		if (2 == row.status) {
			s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="active('
				+ row.id + ', 1)">激活</button>';
		} else if (1 == row.status) {
			if (1 != row.defaultUse)
				s += '&nbsp;<button type="button" class="btn btn-danger btn-sm" onClick="active('
					+ row.id + ', 2)">注销</button>';
		}
	}
	
	if (2 == row.defaultUse && checkDef)
		s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="setDefault('
			+ row.id + ')">设为默认</button>';
	
	return s;		
}

function active(id, status) {
	jQuery.post("/hoper/backweb/jjsUser/active", {
		"id" : id,
		"status" : status
	}, function(data) {
		var pto = 1 == status ? "激活" : "注销";
		if (1 == data.code) {
			$('#bank_tb').bootstrapTable("refresh");
			alert(pto + "成功");
		} else if (0 == data.code) {
			alert(pto + "失败：" + data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function setDefault(id) {
	jQuery.post("/hoper/backweb/jjsUser/setupDefault", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			$('#bank_tb').bootstrapTable("refresh");
			alert("设置默认成功");
		} else if (0 == data.code) {
			alert("设置默认失败：" + data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/jjsUser/getBank", {
		"bankId" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#bank_form").clearForm();
			
			var falg = ("Y" == data.data.alreadyAuth);
			// 已认证的银行卡号不可再修改
			$("#bankCode").attr("disabled", falg);
			
			$("#bank_form").populateForm(data.data);
			$("#myModalLabel").text("修改客户银行卡信息");
			$('#updModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveBank() {
	if (!$("#bank_form").valid()) {
		return;
	}
	var json = $("#bank_form").serializeJson();
	jQuery.post("/hoper/backweb/jjsUser/updateBank", json, function(data) {
		if (1 == data.code) {
			alert("修改成功");
			$('#updModal').modal('hide');
			$("#bank_tb").bootstrapTable('refresh');
		} else if (0 == data.code) {
			alert("修改客户银行卡信息失败：" + data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#bank_form").validate({
	ignore: "",
	rules : {
		bankInfo : {
			"required" : true,
			utfmaxlength : 200
		},
		bankCode : "required",
		remark : {
			"required" : true,
			utfmaxlength : 500
		}
	}
});

function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	if (2 == value)
		return "注销";
	else if (1 == value)
		return "正常";
	return value;
}

function defaultUseFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	if (2 == value)
		return "否";
	else if (1 == value)
		return "是";
	return value;
}
