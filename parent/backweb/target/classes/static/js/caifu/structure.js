/**
 * 
 */

//
$(function () {
	loadCustTypeCombo("#custType");
	loadTable();
    document.getElementById("treepage").style.height =  "2200px";
	
});

var columns = [
    {
        field: 'groupName',
        title: '名称',
        align : 'center'
    }, {
        field: 'groupFullName',
        title: '组织全称',
        align : 'center'
    }, {
    	field: 'status',
    	title: '状态',
        align : 'center',
        formatter : statusFormat
    },{
    	field: 'id',
    	title: '操作',
        align : 'center',
    	formatter : operateFormat
    }
    
    ];

function loadTable() {
	$('#cust_tb').bootstrapTable({
		url : "/hoper/backweb/caifu/pageSubStructure",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: true, //启动分页
        paginationShowPageGo: true,//页码跳转
        sortable: true,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 20, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
        pageList: [25,50, 100],//记录数可选列表
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

//状态判断
function statusFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return "-1" == value ? "已解散" : "正常";
}

//操作
function operateFormat(value, row, index) {
	var s = '';
	// 修改
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog('
				+ row.id + ')">编辑</button>';
	
		s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="toDelete('
			+ row.id + ')">删除</button>';
	
	return s;
}

//弹出新增或者修改信息页面
function openUpdDialog(id) {
	$("#type").val("1"); //修改
	jQuery.get("/hoper/backweb/caifu/getStructInfo", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			$("#structure_form").clearForm(); //清空数据
			$("#structure_form").populateForm(data.data);  //填充数据
			$("#id").val(data.data.id); //单独设置组织id
			
			$("#myModalLabel").text("修改组织名称");
			$('#structureModal').modal(); //弹出窗口
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function saveStructure() {
	var json = $("#structure_form").serializeJson();
	if(json.groupName==null||""==json.groupName){
		alert("组织名称不能为空");
		return;
	}
	var url = "/hoper/backweb/caifu/structure/updateTree"; //修改
	var test = $("#myModalLabel").text();
	
	if(test=='新增组织机构'){  //新增
		url = "/hoper/backweb/caifu/structure/addSubTree"; //新增
	}
	if(json.fatherName==null||""==json.fatherName){
		alert("请选择上级组织！");
		return;
	}
	
	
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			alert("success");
			$('#structureModal').modal('hide');
			$("#cust_tb").bootstrapTable('refresh');
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

//弹出新增组织窗口
function add(){
	//新增组织前需要先选择上一级组织
	//为上级id赋值
	$("#groupName").val("");//先清空组织名称
	$("#myModalLabel").text("新增组织机构");
	$('#structureModal').modal(); //弹出窗口
	
}


//删除员工按钮
function toDelete(id) {
	jQuery.get("/hoper/backweb/caifu/structure/deleteTree", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			alert("成功删除！");
			location.reload();
		}else {
			alert(data.msg);
		}
	}, "json");
}

