/**
 * 
 */

//
$(function () {
	loadTable();
	if (!pcg_fun.isEmpty(userIdParams) && userIdParams.length > 0) {
		$("#userId_query").val(userIdParams[0]);
		$("#back_bt").show();
	}
	
	$("#identificationType").change(function() {
		var identificationType = $("#identificationType").val();
		if (pcg_fun.isEmpty(identificationType))
			return;
		
		if (1 == identificationType) {
			$("#org_div").hide();
			$("#organizationCode").attr("disabled", true);
			$("#org_img_div").hide();
			$("#organizationCodeImgFile").attr("disabled", true);
		} else if (0 == identificationType) {
			$("#org_div").show();
			$("#organizationCode").attr("disabled", false);
			$("#org_img_div").show();
			$("#organizationCodeImgFile").attr("disabled", false);
		}
	});
});

var columns = [
    {
        field: 'id',
        title: '编号',
        align : 'center'
    }, {
    	field: 'userId',
    	title: '客户编号',
        align : 'center'
    }, {
        field: 'email',
        title: '注册邮箱',
        align : 'center'
    }, {
    	field: 'enterpriseName',
    	title: '企业名称',
        align : 'center'
    }, {
    	field: 'legalMobile',
    	title: '法人手机号',
        align : 'center'
    }, {
    	field: 'legalName',
    	title: '法人姓名',
        align : 'center'
    }, {
    	field: 'legalIdentityCard',
    	title: '法人身份证',
        align : 'center'
    }, {
    	field: 'identificationType',
    	title: '认证方式',
        align : 'center',
        formatter : identificationTypeFormat
    }, {
    	field: 'organizationRegno',
    	title: '营业执照号',
    	align : 'center'
//    }, {
//    	field: 'organizationRegImgUrl',
//    	title: '营业执照复印件',
//    	align : 'center',
//    	formatter : imgUrlFormat
    }, {
    	field: 'organizationCode',
    	title: '组织结构代码',
    	align : 'center'
    }, {
    	field: 'status',
    	title: '状态',
    	align : 'center',
    	formatter : statusFormat
//    }, {
//    	field: 'isInside',
//    	title: '是否内部企业',
//    	align : 'center'
    }, {
    	field: 'void',
    	title: '操作',
        align : 'center',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#register_tb').bootstrapTable({
		url : "/hoper/backweb/accountRegister/page",
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
		$("#register_tb tr").click(function(){
			$("#register_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

var checkUpd = checkAuth("CUSTOMER:UPDATE_ENTERPRISE_REGISTER");
var checkUpload = checkAuth("CUSTOMER:UPLOAD_ENTERPRISE_REGISTER");
function operateFormat(value, row, index) {
	var s = '';
	if (!pcg_fun.isEmpty(row.organizationRegImgUrl)) {
		s +=  '<button type="button" class="btn btn-info btn-sm" onClick="viewImg(\''
			+ row.organizationRegImgUrl + '\')">营业执照复印件</button>&nbsp;';
	}
	
	if (!pcg_fun.isEmpty(row.organizationCodeImgUrl)) {
		s +=  '<button type="button" class="btn btn-info btn-sm" onClick="viewImg(\''
			+ row.organizationCodeImgUrl + '\')">组织机构复印件</button>&nbsp;';
	}
	
	// 修改
	if (checkUpd && ("NONREG" == row.status || "FAIL" == row.status))
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog('
				+ row.id + ')">修改</button>';
	if (checkUpload) {
		// 注册
		if ("NONREG" == row.status) {
			s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="register('
				+ row.id + ')">注册</button>';
		}
		
		// 重新注册
		if ("FAIL" == row.status) {
			s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="re_register('
				+ row.id + ')">重新注册</button>';
		}
		
		// 手动请求结果
		if ("EXAM" == row.status) {
			s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="applyResult('
				+ row.id + ')">请求注册结果</button>';
		}
	}
	
	return s;
}

function register(id) {
	jQuery.post("/hoper/backweb/accountRegister/register", {
		"accountRegisterId" : id
	}, function(data) {
		if (1 == data.code) {
			$("#register_tb").bootstrapTable('refresh');
			alert(data.msg);
		 } else if (0 == data.code) {
			 alert(data.msg);
		 } else {
			 alert(data);
		 }
	}, "json");
}

function re_register(id) {
	jQuery.post("/hoper/backweb/accountRegister/reRegister", {
		"accountRegisterId" : id
	}, function(data) {
		if (1 == data.code) {
			$("#register_tb").bootstrapTable('refresh');
			alert(data.msg);
		 } else if (0 == data.code) {
			 alert(data.msg);
		 } else {
			 alert(data);
		 }
	}, "json");
}

function applyResult(id) {
	jQuery.post("/hoper/backweb/accountRegister/applyResult", {
		"accountRegisterId" : id
	}, function(data) {
		if (1 == data.code) {
			$("#register_tb").bootstrapTable('refresh');
			alert(data.msg);
		 } else if (0 == data.code) {
			 alert(data.msg);
		 } else {
			 alert(data);
		 }
	}, "json");
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/accountRegister/obtainAccountRegister", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#register_form").clearForm();
			
			$("#register_form").populateForm(data.data);
			$("#myModalLabel").text("修改企业账户注册信息");
			$('#registerModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveRegister() {
	if (!$("#register_form").valid()) {
		return;
	}
	var json = $("#register_form").serializeJson();
	
	$("#save_bt").attr("disabled", true);
	 $.ajaxFileUpload({
		 url : "/hoper/backweb/accountRegister/update",
		 type : 'post',
		 secureuri : false, // 一般设置为false
		 fileElementId : ['organizationRegImgFile', 'organizationCodeImgFile'], // 上传文件的id、name属性名
		 dataType : 'json', // 返回值类型，一般设置为json、application/json
		 data : json,
		 success : function(data, status) {
			 $("#save_bt").attr("disabled", false);
			 if (1 == data.code) {
				$('#registerModal').modal('hide');
				$("#register_tb").bootstrapTable('refresh');
				alert("success");
			 } else if (0 == data.code) {
				 alert(data.msg);
			 } else {
				 alert(data);
			 }
		 },
		 error : function(data, status, e) {
			 $("#save_bt").attr("disabled", false);
			 alert("上传失败");
		}
	});
}

var validator = $("#register_form").validate({
	ignore: "",
	rules : {
		email : {
			"required" : true,
			utfmaxlength : 60
		},
		enterpriseName : {
			"required" : true,
			utfmaxlength : 150
		},
		legalMobile : {
			"required" : true,
			"mobile" : true
		},
		legalName : {
			"required" : true,
			utfmaxlength : 20
		},
		legalIdentityCard : {
			"required" : true,
			"idCardCheck" : true
		},
		identificationType : "required",
		organizationRegno : {
			"required" : true,
			utfmaxlength : 20
		},
//		organizationRegImgFile : "required",
		organizationCode : {
			"required" : true,
			utfmaxlength : 20
		},
//		organizationCodeImgFile : "required"
	}
});

var identificationTypeFormatJson = {
	1 : "多证合一",
	0 : "传统多证"
};
function identificationTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return '-';
	var val = identificationTypeFormatJson[value];
	if (pcg_fun.isEmpty(val))
		return value;
	return val;
}

var statusFormatJson = {
	'NONREG' : "未注册",
	'EXAM' : "审核中",
	'SUCC' : "注册成功",
	'FAIL' : "注册失败"
};
function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return '-';
	var val = statusFormatJson[value];
	if (pcg_fun.isEmpty(val))
		return value;
	return val;
}

function imgUrlFormat(value, row, index) {
	if (pcg_fun.isEmpty(value)) {
		return '-';
	}
	return '<button type="button" class="btn btn-info btn-sm" onClick="viewImg(\''
		+ value + '\')">查看</button>';
}

function viewImg(url) {
	window.open(url);
}

function back() {
	refreshto("/hoper/backweb/customer/customer");
}
