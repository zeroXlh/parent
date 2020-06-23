/**
 * 
 */
$(function() {
});

function openAddRemarkModal(id) {
	var selections = $("#list").bootstrapTable('getSelections');
	if (selections.length < 1) {
		alert("请先选择一条记录");
		return;
	}
	var row = selections[0];
	
	jQuery.get("/hoper/backweb/getSubscription", {
		"id" : row.id
	}, function(data) {
		if (1 == data.code) {
			addRemarkValidator.resetForm();
			$("#add_remark_form [name]").val("");
			
			var rs = data.data;
			rs["subscriptionId"] = rs.id;
			rs["custId"] = rs.userId;
			
			$("#add_remark_form").populateForm(rs);
			$('#add_remark_Modal').modal();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var addRemarkValidator = $("#add_remark_form").validate({
	rules : {
		remark : {
			"required" : true,
			utfmaxlength : 500
		}
	}
});

function addRemark() {
	if (!$("#add_remark_form").valid())
		return;
	var json = $("#add_remark_form").serializeJson();
	$.ajaxFileUpload({
		 url : "/hoper/backweb/remark/add",
		 type : 'post',
		 secureuri : false, // 一般设置为false
		 fileElementId : 'authFile', // 上传文件的id、name属性名
		 dataType : 'json', // 返回值类型，一般设置为json、application/json
		 data : json,
		 success : function(data, status) {
			 if (1 == data.code) {
				$('#add_remark_Modal').modal('hide');
//				$("#pro_sub_tb").bootstrapTable('refresh');
				alert("客户认购备注创建成功");
			 } else if (0 == data.code) {
				 alert("客户认购备注创建失败：" + data.msg);
			 } else {
				 alert(data);
			 }
		 },
		 error : function(data, status, e) {
			 alert(e);
		}
	});
	
}
