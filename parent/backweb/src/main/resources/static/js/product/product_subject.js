/**
 * 
 */

//
$(function () {
	loadTable();
	
});

var loadRiskPullDownFlag = false;
var columns = [ 
    {
        field: 'productName',
        title: '产品名称',
        align : "center"
    }, {
    	field: 'matchValue',
    	title: '项目名匹配值',
    	align : "center"
    }, {
        field: 'sumRaiseAmt',
        title: '产品总募集额（元）',
        align : "center"
    }, {
    	field: 'factoring',
    	title: '挂牌方',
    	align : "center"
    }, {
    	field: 'partners',
    	title: '摘牌方',
    	align : "center"
    }, {
    	field: 'organization',
    	title: '挂牌机构',
    	align : "center"
    }, {
    	field: 'orgDesc',
    	title: '挂牌机构描述',
    	align : "center"
    }, {
    	field: 'orderNum',
    	title: '排序号',
    	align : "center"
    }, {
    	field: 'createTime',
    	title: '添加时间',
    	formatter : jsonTimeFormat,
    	align : "center"
    }, {
    	field: 'creator',
    	title: '添加人',
    	align : "center"
    }, {
    	field: 'lastUpdateUser',
    	title: '最后更新人',
    	align : "center"
    }, {
    	field: 'lastUpdateTime',
    	title: '最后更新时间',
    	formatter : jsonTimeFormat,
    	align : "center"
    }, {
    	field: 'void',
    	title: '操作',
    	formatter : operateFormat
    }, ];

function loadTable() {
	$('#pro_sub_tb').bootstrapTable({
		url : "/hoper/backweb/pageProductSubject",
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
		$("#pro_sub_tb tr").click(function(){
			$("#pro_sub_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");

		})
	});
}

var checkUpd = checkAuth("PRODUCT:UPDATE_PRODUCT_SUBJECT"); 
function operateFormat(value, row, index) {
	// 修改
	var s = '';
	if (checkUpd) {
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
			+ row.id + '\')">修改</button>';
	}
	// 删除（逻辑）
//	s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="openProductTab(\''
//		+ row.id + '\', \'' + row.productName +'\')">查看产品</button>';
	
	// 查看流程图
	if (!pcg_fun.isEmpty(row.flowChart))
		s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="window.open(\''
            + row.flowChart + '\')">查看流程图</button><br>';
    // 查看流程图
    if (!pcg_fun.isEmpty(row.protocolPath))
        s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="window.open(\''
            + row.protocolPath + '\')">查看合同</button>';
	return s;
}

function openProductTab(productSubjectId, productName) {
	refreshto("/hoper/backweb/product/product?productSubjectId=" + productSubjectId + "&productName=" + productName);
//	openNewTab("product", "/hoper/backweb/product/product?productSubjectId=" + productSubjectId, "产品管理");
}

function openDialog() {
	loadRiskPullDown();
	proSubValidator.resetForm();
	$("#pro_sub_form input,select,textarea").val("");
	$("#myModalLabel").text("添加产品项目");
	$('#myModal').modal();
}



function loadRiskPullDown() {
	if (!loadRiskPullDownFlag) {
		loadParamCombo("#riskLevel");
	}
}

function openUpdDialog(id) {
	loadRiskPullDown();
	$("#pro_sub_form input").val("");
	jQuery.get("/hoper/backweb/getProductSubject", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			proSubValidator.resetForm();
			$("#pro_sub_form input,select,textarea").val("");
			$("#pro_sub_form").populateForm(data.data);
			
			$("#myModalLabel").text("修改产品项目");
			$('#myModal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveProductSubject() {
	if (!$("#pro_sub_form").valid()) {
		return;
	}
	var json = $("#pro_sub_form").serializeJson();
	var url = "/hoper/backweb/addProductSubject";
	if (!pcg_fun.isEmpty(json.id)) {
		url = "/hoper/backweb/updateProductSubject";
	}
	
	$.ajaxFileUpload({
		 url : url,
		 type : 'post',
		 secureuri : false, // 一般设置为false
		 fileElementId : ['fileFlow','fileProtocol'], // 上传文件的id、name属性名
		 dataType : 'json', // 返回值类型，一般设置为json、application/json
		 data : json,
		 success : function(data, status) {
			 if (1 == data.code) {
				$('#myModal').modal('hide');
				$("#pro_sub_tb").bootstrapTable('refresh');
				alert("success");
			 } else if (0 == data.code) {
				 alert(data.msg);
			 } else {
				 alert(data);
			 }
		 },
		 error : function(data, status, e) {
			 alert(e);
		}
	});
}

var proSubValidator = $("#pro_sub_form").validate({
	rules : {
		productName : {
			required : true,
			utfmaxlength : 200
		},
		matchValue : {
			required : true,
			utfmaxlength : 150
		},
		sumRaiseAmt : {
			required : true,
			number : true
		},
		partners : {
			utfmaxlength : 200
		},
		factoring : {
			utfmaxlength : 200
		},
		organization : {
			utfmaxlength : 300
		},
		orgDesc : {
			utfmaxlength : 300
		},
		folderPath : {
			required : true,
			utfmaxlength : 100
		},
		protocolPrefix : {
			required : true,
			utfmaxlength : 20
		},
		custCoordinate : {
			utfmaxlength : 150
		}
	}
});
