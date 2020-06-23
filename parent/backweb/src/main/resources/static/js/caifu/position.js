/**
 * 
 */

//
$(function () {
	loadTable();
	
});

var columns = [
   {
    	field: 'positionName',
    	title: '名称',
        align : 'center'
    }, {
        field: 'permission',
        title: '权限',
        align : 'center',
        formatter: certPermissionFormat
    },  {
    	field: 'id',
    	title: '操作',
        align : 'center',
    	formatter : operateFormat
    } ];

function loadTable() {
	$('#position_tb').bootstrapTable({
		url : "/hoper/backweb/caifu/pagePosition",
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
		$("#position_tb tr").click(function(){
			$("#position_tb tr").css("background","#fff");	
			$(this).css("background","#B4E4E9");
		})
	});
}

//var checkUpd = checkAuth("CUSTOMER:UPDATE_CUSTOMER");
function operateFormat(value, row, index) {
	var s = '';
	// 修改
		s += '<button type="button" class="btn btn-info btn-sm" onClick="openUpdDialog('
				+ row.id+ ')">编辑</button>';
	
		s += '&nbsp;<button type="button" class="btn btn-info btn-sm" onClick="toDelete('
			+ row.id + ')">删除</button>';
	
	return s;
}

//权限判断
function certPermissionFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	return "1" == value ? "可以查看该组织下业绩" : "<span style='color:red'>只能查看自己业绩</span>";
}


//删除职务按钮
function toDelete(id) {
	jQuery.get("/hoper/backweb/caifu/deletePosition", {
		"id" : id
	}, function(data) {
		if (1 == data.code) {
			alert("成功删除！");
			location.reload();
		}else {
			alert("失败");
		}
	}, "json");
}


//弹出新增或者修改职位信息页面
function openUpdDialog(id) {
	if(id==0){  //新增
		$("#position_form").clearForm(); //清空数据
		$("#myModalLabel").text("新增职位信息");
		$('#positionModal').modal(); //弹出窗口
	}else{
		jQuery.get("/hoper/backweb/caifu/getPosition", {
			"id" : id
		}, function(data) {
			if (1 == data.code) {
				$("#position_form").clearForm(); //清空数据
				$("#position_form").populateForm(data.data);  //填充数据
				$("#myModalLabel").text("修改职位信息");
				$("#id").val(id);
				
				$('#positionModal').modal(); //弹出窗口
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		}, "json");
		
	}
	
}

function savePosition() {
	var json = $("#position_form").serializeJson();
	var id = json.id;
	var url = "/hoper/backweb/caifu/updatePosition"; //修改
	if(id==null||""==id){
		url = "/hoper/backweb/caifu/addPosition"; //新增
	}
	jQuery.post(url, json, function(data) {
		if (1 == data.code) {
			alert("success");
			$('#positionModal').modal('hide');
			$("#position_tb").bootstrapTable('refresh');
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}


