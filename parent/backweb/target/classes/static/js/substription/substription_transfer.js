/**
 * 交单文件上传功能实现
 */

// function openDialog1() {
// pcg_fun.loadCommon("#productId1", "/hoper/backweb/product/getProducts", {
//		
// }, "id", "period");
//	
// $("#myModalLabel").text("上传excel文件");
// $("#file1").val("");
// $('#myModal').modal();
// }
// function importExcel1() {
// var video_src_file = $("#file").val();
// var productId = $("#productId").val();
// if (pcg_fun.isEmpty(productId)) {
// alert('请选择产品！');
// return;
// }
// if (pcg_fun.isEmpty(video_src_file)) {
// alert('请选择文件！');
// return;
// }
// var index = video_src_file.lastIndexOf(".");
// if (index == -1) {
// alert("文件名称错误！");
// return;
// }
// var suffix = video_src_file.substring(index + 1);
// if ("xls" != suffix && "xlsx" != suffix) {
// alert('文档类型不支持，只允许xls,xlsx文档格式！');
// return;
// }
//	
// $("#btn_submit").attr("disabled", true);
// $.ajaxFileUpload({
// url : '/hoper/backweb/upload',
// type : 'post',
// secureuri : false, // 一般设置为false
// fileElementId : 'file1', // 上传文件的id、name属性名
// dataType : 'json', // 返回值类型，一般设置为json、application/json
// data : {
// "productId" : productId
// },
// success : function(data, status) {
// $("#btn_submit").attr("disabled", false);
// $("#file").val("");
// if (1 == data.code) {
// $("#list").bootstrapTable('refresh');
// $('#myModal').modal('hide');
//				
// var notMatch = data.data;
// if (notMatch.length > 0) {
// loadTable();
// $('#no_match_tb').bootstrapTable("load", notMatch);
// $("#no_match_Div").show();
// document.getElementById("no_match_Div").scrollIntoView(true);
// }
// alert(data.msg);
// } else if (0 == data.code) {
// alert(data.msg);
// } else {
// alert(data);
// }
// },
// error : function(data, status, e) {
// $("#btn_submit").attr("disabled", false);
// alert(e);
// }
// });
// }
$(function(){
	
//	$("#transfer_bank_div").show();
	$("#transfer_cert").change(function() {
		var certNo = $(this).val();
		if (!(tran_validator).element("#transfer_cert"))
			return;
		
		$.get("/hoper/backweb/jjsuser/getCustomerByCert", {
			certNo : certNo
		}, function(data) {
//			console.log(data);
			if (1 == data.code) {
				var customer = data.data;
				if (pcg_fun.isEmpty(customer)) {
					trafficSignal(false);
					$("#trsansfer_form .transfer_clear").each(function() {
						$(this).val("");
					});
					
				} else {
					trafficSignal(true);
					customer["userId"] = customer["id"];
					delete customer["id"];
					
					tran_validator.resetForm();
					$("#trsansfer_form").populateForm(customer);
				}
			} else {
				alert(data.msg);
			}
		}, "json");
	}); 
});

function trafficSignal(isDis) {
	$("#trsansfer_form [name='custName']").attr("readonly", isDis);
	$("#trsansfer_form [name='phoneNo']").attr("readonly", isDis);
}

//function fidd() {
//	$("#trsansfer_form").populateForm({
//		bankCode : "40000115683335689",
//		bankInfo :　"深圳工商银行香蜜湖支行",
//		accountType : "BC",
//		establishProvince : "广东",
//		establishCity : "深圳"
//	});
//}
var tran_validator = $("#trsansfer_form").validate({
	rules : {
		id : "required",
		certNo : {
			"required" : true,
			"idCardCheck_area" : ["#transfer_cert_area"]
		},
		certArea : "required",
		custType : "required",
		phoneNo : {
			"required" : true,
			"mobile" : true
		},
		custName : "required",
		bankCode : {
			"required" : true,
			"bankcode" : true // 银行卡、存折格式
//			"purevalue" : true // 纯数值
		},
		bankInfo : "required",
		accountType : "required",
		establishProvince : "required",
		establishCity : "required",
//		introducer : {
//			"required" : true,
//			"mobile" : true
//		},
		remark : "required"
	}
});

function opentransferDialog() {
	var selections = $("#list").bootstrapTable('getSelections');
	if (selections.length < 1) {
		alert("请先选择一条记录");
		return;
	}
	if (selections.length > 1) {
		alert("只能选择一条记录");
		return;
	}
	var row = selections[0];
	jQuery.get("/hoper/backweb/getSubscription", {
		"id" : row.id
	}, function(data) {
		if (1 == data.code) {
			if (pcg_fun.isEmpty(data.data)) {
				alert("该订单记录不存在！");
			} else {
//				subValidator.resetForm();
				$("#trsansfer_form").clearForm();
				var order = {};
				order["id"] = data.data.id;
				order["introducer"] = data.data.introducer;
				
				$("#trsansfer_form").populateForm(order);
				$('#tran_modal').modal();
			}
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

function transfer() {
	if (!tran_validator.form()) {
		return;
	}
	
	var json = $("#trsansfer_form").serializeJson();
	jQuery.post("/hoper/backweb/order/transfer", json, function(data) {
		if (1 == data.code) {
			$("#list").bootstrapTable("refresh");
			$("#tran_modal").modal("hide");
			alert("订单转让成功");
		} else if (0 == data.code) {
			alert("订单转让失败：" + data.msg);
		} else {
			alert(data);
		}
	}, "json");
}
