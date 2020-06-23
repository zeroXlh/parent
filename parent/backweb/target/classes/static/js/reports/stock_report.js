/**
 * 
 */

//
$(function () {
	loadTable();
	
	loadProductSubject("#productSubjectIdQuery");
//	jQuery.get("/hoper/backweb/productSubjectList", {
		
//	}, function(data) {
//    	if (1 == data.code) {
//    		$("#productSubjectId").empty();
//    		$("#productSubjectIdQuery").empty();
//    		var v = data.data;
//    		var options = "<option value='' selected='selected'>---请选择---</option>";
//    		for(var i = 0;i < v.length;i++){
//    			options += "<option value='" + v[i]["id"]+ "'>" + v[i]["productName"] + "</option>";
//    		}
//    		$("#productSubjectId").html(options);
//    		$("#productSubjectIdQuery").html(options);
//    		
//    		if (!pcg_fun.isEmpty(productSubjectIdParam)) {
//    			$("#productSubjectIdQuery").val(productSubjectIdParam);
//    			$("#productSubjectIdQuery").attr("disabled", true);
//    			$("#reback").show();
//    			search();
//    		}
//    	} else {
//    		alert("加载产品科目下拉框参数失败");
//    	}
//    },"json");
	
});

var columns = [
    {
    	field: 'month',
    	title: '月份',
    	align : "center"
    }, {
    	field: 'productSubjectId',
    	title: '产品项目',
    	align : "center",
    	formatter : productSubjectFormat
    }, {
        field: 'raiseMonthly',
        title: '单月募集金额(元)',
    	align : "center",
    	formatter : financeFormat
    }, {
    	field: 'stockAccount',
    	title: '融资余额(元)',
    	align : "center",
		formatter : financeFormat
    }, {
    	field: 'stockPeoples',
    	title: '客户数量',
    	align : "center"
    } ];

function loadTable() {
	$('#stock_tb').bootstrapTable({
//		url : "/zcthd/backweb/reports/stockReport",
        dataType: "json",
        method: "GET",
        striped: true,//是否显示行间隔色
        cache: false,
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        pagination: false, //启动分页
        paginationShowPageGo: false,//页码跳转
        sortable: false,//排序
        pageNumber:1,  //当前第几页                 
        pageSize: 10, //每页显示的记录数
        showPaginationSwitch: false,//展示页数的选择
//        pageList: [10, 25, 50, 100],//记录数可选列表
        contentType: 'application/json;charset=UTF-8',
        queryParamsType:'', // undefined (这里是根据不同的参数，选择不同的查询的条件)
        queryParams: queryParams,//设置查询时候的参数，传递参数（*）
        columns: columns,
        responseHandler: stockHandler//在ajax请求成功后，发放数据之前可以对返回的数据进行处理，渲染表格前的方法
    });
	//表格变色
//	$(function(){
//		$("#table_product tr").click(function(){
//			$("#table_product tr").css("background","#fff");	
//			$(this).css("background","#B4E4E9");
//
//		})
//	});
}

var first = true;
function searchStock() {
	if (pcg_fun.isEmpty($("#productSubjectIdQuery").val())) {
		alert("请先选择产品项目！");
		return;
	}
	var params = {query : queryParams(null)};
	if (first) {
		first = false;
		params.url = "/zcthd/backweb/reports/stockReport";
	}
	
	$("#stock_tb").bootstrapTable('refresh', params);
}

function stockHandler(result) {
	if(1 == result.code) {
		var list = [];
		list.push(result.data);
		return { 
			rows : list
		}
	} else if (0 == result.code) {
		alert(result.msg);
		return { 
			rows : []
		};
	} else {
		alert(result);
		return { 
			rows : []
		};
	}
}
