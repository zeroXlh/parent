//p_isasync:false 同步加载，默认异步;
function JqueryAjaxPost(url, data, beforeSend, callback, err) {
	$.ajax({
		url : url,
		type : "POST",
		data : data,
		dataType : "json",
		beforeSend : function() {
			beforeSend();
		},
		success : function(data) {

			callback(data);
		},
		error : function(XmlHttpRequest) {

//			err();
//			error(XmlHttpRequest);
		}
	});
}
// p_isasync:false 同步加载，默认异步
function JqueryAjaxGet(url, data, beforeSend, callback, err,async) {
	if(async==false){
		async=false;
	}else
		{
		async=true;
		}
	$.ajax({
		url : url,
		type : "GET",
		data : data,
		dataType : "json",
		 async: async,
		beforeSend : function() {
			if (beforeSend) {
				beforeSend();
			}
		},
		success : function(data) {
			callback(data);
		},
		error : function(XmlHttpRequest) {
			/*if (err) {
				err();
			}
			error(XmlHttpRequest);*/
		}
	});
}
// ajax提交 不带参数，带表单
function jqAjaxSerialize(url, data, beforeSend, callback, err) {
	$.ajax({
		url : url,
		type : "POST",
		data : data,
		dataType : "json",
		beforeSend : function() {
			beforeSend();
		},
		success : function(data) {
			callback(data);
		},
		error : function(XmlHttpRequest) {
		/*	err();
			error(XmlHttpRequest);*/
		}
	});
}
// 后来发生异常
function error(XmlHttpRequest) {
	var err = XmlHttpRequest.responseText;
	if (err.indexOf("window.parent.location") >= 0) {
		alert('登录超时，请重新登录！');
		window.parent.location = '/';
	} else {
		alert('操作失败;'+ XmlHttpRequest.responseText);
	}
	return;
}
// easyui form提交表单
function submitForm(id, url, callback) {
	$(id).form('submit', {
		url : url,
		type : "POST",
		dataType : "json",
		success : function(data) {
			callback(data)
		},
		error : function(XmlHttpRequest) {
			err();
			error(XmlHttpRequest);
		}
	});
}
// 回车事件
function keyCode(obj, calbaack) {
	$(obj).keydown(function(e) {
		if (e.keyCode == 13) {
			calbaack();
			return false;
		}

	});
}
