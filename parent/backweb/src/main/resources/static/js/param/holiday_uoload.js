
function importDialog() {
//	$("#file").val("");
	$("#upload_modal").modal();
}

function importHoliday() {
	buttonSync(true);

	$.ajaxFileUpload({
		url : '/zcthd/backweb/param/holiday/importHoliday',
		type : 'post',
		secureuri : false, // 一般设置为false
		fileElementId : 'file', // 上传文件的id、name属性名
		dataType : 'json', // 返回值类型，一般设置为json、application/json
		success : function(data, status) {
			buttonSync(false);
			$("#file").val("");
			if (1 == data.code) {
				$("#holiday_tb").bootstrapTable('refresh');
				$('#upload_modal').modal('hide');
				if (pcg_fun.isEmpty(data.data)) {
					alert("成功导入");
				} else
					window.open("/hoper/backweb/jjsUploadLog/downloadFailFile?batchNo="
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

function downloadTemplate() {
	window.open("/zcthd/backweb/param/holiday/holidayDefaultFile");
}

function buttonSync(flag) {
	$(".upload-bt-sync").attr("disabled", flag);
}
