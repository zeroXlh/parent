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
function openUploadDialog() {
	$("#file").val("");
	$('#upload_modal').modal(); // uploadModalLabel
}

function importDailyExcel() {
	buttonSync(true);
	if (!filePreCheck(false)) {
		buttonSync(false);
		return;
	}

	$.ajaxFileUpload({
		url : '/hoper/backweb/uploadDaily',
		type : 'post',
		secureuri : false, // 一般设置为false
		fileElementId : 'file', // 上传文件的id、name属性名
		dataType : 'json', // 返回值类型，一般设置为json、application/json
//		data : {
//			"company" : $("#company").val()
//		},
		success : function(data, status) {
			buttonSync(false);
			if (1 == data.code) {
				$("#list").bootstrapTable('refresh');
				$('#upload_modal').modal('hide');
				alert("每日交单上传成功！" + data.msg);
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		},
		error : function(data, status, e) {
			buttonSync(false);
			alert(e);
		}
	});
}

function buttonSync(flag) {
	$("button.upload-bt-sync").attr("disabled", flag);
}

function checkExcel() {
	buttonSync(true);
	var productId = $("#upload_product_id").val();
	if (!filePreCheck(true)) {
		buttonSync(false);
		return;
	}

	$.ajaxFileUpload({
		url : '/hoper/backweb/checkResult',
		type : 'post',
		secureuri : false, // 一般设置为false
		fileElementId : 'file', // 上传文件的id、name属性名
		dataType : 'json', // 返回值类型，一般设置为json、application/json
		data : {
			"productId" : productId
//					"company" : $("#company").val()
		},
		success : function(data, status) {
			buttonSync(false);
			if (1 == data.code) {
				$("#list").bootstrapTable('refresh');
				$('#upload_modal').modal('hide');
				if (pcg_fun.isEmpty(data.data)) {
					alert("检查完成，没有异常数据");
				} else
					window
							.open("/hoper/backweb/jjsUploadLog/downloadFailFile?batchNo="
									+ data.data);
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		},
		error : function(data, status, e) {
			buttonSync(false);
			alert(e);
		}
	});
}

function importFinalExcel() {
	buttonSync(true);
	var productId = $("#upload_product_id").val();
	if (!filePreCheck(true)) {
		buttonSync(false);
		return;
	}
	$.ajaxFileUpload({
		url : '/hoper/backweb/uploadFinal',
		type : 'post',
		secureuri : false, // 一般设置为false
		fileElementId : 'file', // 上传文件的id、name属性名
		dataType : 'json', // 返回值类型，一般设置为json、application/json
		data : {
			"productId" : productId
//			"company" : $("#company").val()
		},
		success : function(data, status) {
			buttonSync(false);
			if (1 == data.code) {
				$("#list").bootstrapTable('refresh');
				$('#upload_modal').modal('hide');
				alert("最终交单上传成功！" + data.msg);
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		},
		error : function(data, status, e) {
			buttonSync(false);
			alert(e);
		}
	});
}

function filePreCheck(checkProduct) {
	if (checkProduct && pcg_fun.isEmpty($("#upload_product_id").val())) {
		alert('请选择产品！');
		return false;
	}

//	if (pcg_fun.isEmpty($("#company").val())) {
//		alert('请选择公司！');
//		return false;
//	}
	var video_src_file = $("#file").val();
	var productId = $("#upload_product_id").val();
	if (pcg_fun.isEmpty(video_src_file)) {
		alert('请选择文件！');
		return false;
	}
	var index = video_src_file.lastIndexOf(".");
	if (index == -1) {
		alert("文件名称错误！");
		return false;
	}
	var suffix = video_src_file.substring(index + 1);
	if ("xls" != suffix && "xlsx" != suffix) {
		alert('文档类型不支持，只允许xls,xlsx文档格式！');
		return false;
	}
	return true;
}

function importMissingExcel() {
	buttonSync(true);
	var productId = $("#upload_product_id").val();
	if (pcg_fun.isEmpty(productId)) {
		alert('请选择产品！');
		return;
	}
	if (!filePreCheck(true)) {
		buttonSync(false);
		return;
	}
	$.ajaxFileUpload({
		url : '/hoper/backweb/uploadMissing',
		type : 'post',
		secureuri : false, // 一般设置为false
		fileElementId : 'file', // 上传文件的id、name属性名
		dataType : 'json', // 返回值类型，一般设置为json、application/json
		data : {
			"productId" : productId
//			"company" : $("#company").val()
		},
		success : function(data, status) {
			buttonSync(false);
			if (1 == data.code) {
				$("#list").bootstrapTable('refresh');
				$('#upload_modal').modal('hide');
				alert("遗漏文件上传成功！" + data.msg);
			} else if (0 == data.code) {
				alert(data.msg);
			} else {
				alert(data);
			}
		},
		error : function(data, status, e) {
			buttonSync(false);
			alert(e);
		}
	});
}
