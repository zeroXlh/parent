/**
 * 
 */
var nonCustAccount = {};
$(function () {
	
	loadProductSubjectByData("#product");
	loadProductSubjectByData("#productSubject");
	pcg_fun.loadCommonData("#contractType", contractTypes, "type", "value", null);
	pcg_fun.loadCommonData("#contractTypeQuery", contractTypes, "type", "value", null);
	
	jQuery.get("/hoper/backweb/accountRegister/obtainNonCustAccount", {}, function(data){
		if (1 == data.code) {
			for(var i =0;i< data.data.length;i++) {
				var val = data.data[i];
				nonCustAccount[val.id] = val.enterpriseName;
			}
			pcg_fun.loadCommonData("#signEnterprise", data.data,
					"id", "enterpriseName", null);
			
			loadTable();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
});

var contractTypes = [
	{type : "SIGN_CONTRACT", value : "签章合同书"},
	{type : "PROTOCOL", value : "产品协议"},
	{type : "CONFIRMATION", value : "投资确认书"}
];

var columns = [
    {
        field: 'id',
        title: '坐标编号',
        align : 'center'
    }, {
    	field: 'productSubjectId',
    	title: '产品项目',
        align : 'center',
        formatter : productSubjectFormat
    }, {
        field: 'contractType',
        title: '合同类型',
        align : 'center'
    }, {
    	field: 'signEnterprise',
    	title: '签约企业',
        align : 'center',
        formatter : signEnterpriseFormat
    }, {
    	field: 'signCoordinate',
    	title: '签约坐标组',
        align : 'center'
    }, {
    	field: 'legalCoordinate',
    	title: '法人坐标',
    	align : 'center'
    }, {
    	field: 'void',
    	title: '操作',
        align : 'left',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#coordinate_tb').bootstrapTable({
		url : "/hoper/backweb/param/coordinate/page",
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
		$("#coordinate_tb tr").click(function(){
			$("#coordinate_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

function operateFormat(value, row, index) {
	// 修改
	return '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog(\''
				+ row.id + '\')">修改</button>';
}

function openDialog() {
	validator.resetForm();
	$("#coordinate_form").clearForm();
	disInput(false);
	
	$("#myModalLabel").text("新增签章坐标");
	$('#coordinate_modal').modal();
}

function disInput(flag) {
	$("#productSubject").attr("disabled", flag);
	$("#contractType").attr("disabled", flag);
//	$("#signEnterprise").attr("disabled", flag);
}

function openUpdDialog(id) {
	jQuery.get("/hoper/backweb/param/coordinate/getById", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			validator.resetForm();
			$("#coordinate_form").clearForm();
			
			disInput(true);
			$("#coordinate_form").populateForm(data.data);
			$("#myModalLabel").text("修改签章坐标");
			$('#coordinate_modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveParam() {
	if (!$("#coordinate_form").valid()) {
		return;
	}
	var json = $("#coordinate_form").serializeJson(false);
	
	var url = "/hoper/backweb/param/coordinate/add";
	if (!pcg_fun.isEmpty(json.id))
		url = "/hoper/backweb/param/coordinate/update";
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			$('#coordinate_modal').modal('hide');
			$("#coordinate_tb").bootstrapTable('refresh');
			alert(data.msg);
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var validator = $("#coordinate_form").validate({
	ignore: "",
	rules : {
		productSubjectId : "required",
		contractType : "required",
		signEnterprise : "required",
		signCoordinate : "required"
	}
});

function signEnterpriseFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = nonCustAccount[value];
	return pcg_fun.isEmpty(val) ? value : val;
}