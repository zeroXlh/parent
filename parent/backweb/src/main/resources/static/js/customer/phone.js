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
        title: '客户编号',
        align : 'center'
    }, {
    	field: 'phoneNo',
    	title: '客户手机号',
        align : 'center'
    }, {
    	field: 'userId',
    	title: '客户编号',
    	align : 'center'
//    }, {
//        field: 'custName',
//        title: '客户名称',
//        align : 'center'
//    }, {
//    	field: 'certNo',
//    	title: '客户证件号',
//        align : 'center'
//    }, {
//    	field: 'userType',
//    	title: '用户类型',
//        align : 'center',
//    	formatter : userTypeFormat
    }, {
    	field: 'status',
    	title: '状态',
    	align : 'center'
    }, {
    	field: 'creator',
    	title: '创建者',
        align : 'center'
    }, {
    	field: 'createTime',
    	title: '创建时间',
    	align : 'center',
    	formatter : jsonTimeFormat
    }, {
    	field: 'lastUpdateUser',
    	title: '最后更新人',
    	align : 'center'
    }, {
    	field: 'lastUpdateTime',
    	title: '最后更新时间',
        align : 'center',
    	formatter : jsonTimeFormat
    }, {
    	field: 'void',
    	title: '操作',
//    	formatter : operateFormat,
        align : 'center'
    } ];

function loadTable() {
	$('#phone_tb').bootstrapTable({
		url : "/hoper/backweb/jjsCustomerPhone/page",
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
		$("#phone_tb tr").click(function(){
			$("#phone_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function search() {
	var options = $("#phone_tb").bootstrapTable('getOptions');
	$("#phone_tb").bootstrapTable('refresh', {query : queryParams(options)});
}

function operateFormat(value, row, index) {
	// 修改
	return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
				+ row.id + '\')">修改</button>';
	// 删除（逻辑）
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/jjsuser/getCustomer", {
		"userId" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#cust_form").clearForm();
			
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
			$("#phone_tb").bootstrapTable('refresh');
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
		certNo : {
			"required" : true,
			"idCardCheck" : true,
			utfmaxlength : 32
		},
		remark : {
			"required" : true,
			utfmaxlength : 500
		}/*,
		bankInfo : {
			"required" : true,
			utfmaxlength : 200
		},
		bankCode : {
			"required" : true,
			utfmaxlength : 20
		}*/
	}
});

//function userTypeFormat(value, row, index) {
//	if (pcg_fun.isEmpty(value))
//		return "";
//	if (0 == value)
//		return "个人客户";
//	else if (1 == value)
//		return "企业客户";
//	return value;
//}
