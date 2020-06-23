/**
 * 
 */

//
$(function () {
	loadCustTypeCombo("#custType");
	
	loadTable();
});

var columns = [
    {
        field: 'custId',
        title: '客户编号',
        align : 'center'
    }, {
    	field: 'custAccount.phoneNo',
    	title: '客户手机号',
        align : 'center'
    }, {
        field: 'realName',
        title: '客户名称',
        align : 'center'
    }, {
    	field: 'certNo',
    	title: '客户证件号',
        align : 'center'
    }, {
    	field: 'certArea',
    	title: '证件区域',
    	align : 'center',
    	formatter : certAreaFormat
    }, {
    	field: 'custType',
    	title: '客户类型',
        align : 'center',
    	formatter : custTypeFormat
    }, {
    	field: 'gender',
    	title: '性别',
    	align : 'center',
    	formatter : genderFormat
    }, {
    	field: 'birth',
    	title: '生日',
    	align : 'center'
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
    	field: 'void',
    	title: '操作',
        align : 'center',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#cust_tb').bootstrapTable({
		url : "http://localhost:8091/customer/page",
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
		$("#cust_tb tr").click(function(){
			$("#cust_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

var checkUpd = checkAuth("CUSTOMER:UPDATE_CUSTOMER");
function operateFormat(value, row, index) {
	var s = '';
	// 修改
	if (checkUpd)
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog('
				+ row.id + ')">修改</button>';
	if (row.userType == 1) {
		s += '&emsp;<button type="button" class="btn btn-info btn-sm" onClick="toRegister('
			+ row.id + ')">查看注册信息</button>';
	}
	return s;
}

function toRegister(userId) {
	refreshto("/hoper/backweb/customer/register?userId=" + userId);
//	openNewTab("", "/hoper/backweb/customer/register?userId=" + userId, "产品管理");
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/jjsuser/getCustomer", {
		"custId" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#cust_form").clearForm();
			
			var falg = ("Y" == data.data.alreadyAuth);
			// 已认证的客户不可再修改姓名和身份证号
			$("#certNo").attr("disabled", falg);
			$("#custName").attr("disabled", falg);
			$("#certArea").attr("disabled", falg);
			$("#custType").attr("disabled", falg);
			
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

function saveCustomer() {
	if (!$("#cust_form").valid()) {
		return;
	}
	var json = $("#cust_form").serializeJson();
	jQuery.post("/hoper/backweb/jjsuser/updateCustomer", json, function(data) {
		if (1 == data.code) {
			alert("success");
			$('#custModal').modal('hide');
			$("#cust_tb").bootstrapTable('refresh');
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#cust_form").validate({
	ignore: "",
	rules : {
		custName : {
			"required" : true,
			utfmaxlength : 60
		},
		userType : "required",
		phoneNo : {
			"required" : true,
			"mobile" : true
		},
		certArea : "required",
		certNo : {
			"required" : true,
			"idCardCheck_area" : ["#certArea"],
			utfmaxlength : 32
		},
		remark : {
			"required" : true,
			utfmaxlength : 500
		}
	}
});

function certAreaFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return "L" == value ? "中国大陆" : "O" == value ? "港澳台地区" : value;
}