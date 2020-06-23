/**
 * 
 */
//var weburl = "http://localhost:8888";

//var backWeburl = "http://localhost:9997";

var statusJson = {
	"EN" : "正常",
	"DISA": "失效"
};
/**
 *  状态格式化
 * @param value
 * @param row
 * @param index
 * @returns
 */
function statusForamt(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	var rs = statusJson[value];
	return pcg_fun.isEmpty(rs) ? value : rs;
}

function annualizedIncomeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	if (isNaN(value))
		return value;
	return (value * 100).toFixed(2) + "%";
	
}

function financeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "";
	var val = parseFloat(value, 10);
	
	if (isNaN(val))
		return value;
	
	var rs = "";
	val = val.toFixed(2);
	
	var t = 1000, remainder, temp;
	if (val < t) {
		return val;
	} else {
		var array = val.split(".");
		temp = array[0];
		do {
			remainder = (temp % t);
			temp = parseInt(temp/t, 10);
			rs = "," + leftPad(remainder, 3, "0") + rs;
		} while(temp >= t);
		rs = temp + rs;
		if (!pcg_fun.isEmpty(array[1]))
			rs = rs + "." + array[1];
	}
	return rs;
}

function leftPad(value, length, padding) {
	var val = "";
	if (!pcg_fun.isEmpty(value))
		val = "" + value;
	
	if (length <= 0 || length <= val.length)
		return val;
	if (pcg_fun.isEmpty(padding))
		padding = "0";
	
	for(var i = length - val.length; i > 0;i--) {
		val = "" + padding + val;
	}
	return val;
}

//var userTypeFormatJson = {
//	0 : "个人客户",
//	1 : "企业客户",
//}; 
//function userTypeFormat(value, row, index) {
//	if (pcg_fun.isEmpty(value))
//		return "";
//	var val = userTypeFormatJson[value];
//	if (pcg_fun.isEmpty(val))
//		return value;
//	return val;
//}

function myAjaxPost(url, data, success) {
	$.ajax({
		type : "post",
		contentType : "application/json",
		url : url,
		data : data,
		dataType : "json",
		success : function(data) {
			success(data);
		}
	});
}

$.ajaxSetup({ /*  ajax全局配置  */
	cache : false,
	async : false,
	headers : {
		"X-Requested-With" : "XMLHttpRequest"
	},
//	contentType : "application/json"
//	beforeSend : function(evt, request) {
//		var data = 'random_num=' + getRandom(10000);
//		if (request.url.indexOf('?') == -1) {
//			data = '?' + data;
//		} else {
//			data = '&' + data;
//		}
//		request.url += data;
//	},
	dataFilter : function(data, dataType) {
//		if ("json" == dataType) {
//			return JSON.parse(data);
//		}
		return data;
	},
	complete : function(XHR, textStatus) {
		if (XHR.getResponseHeader) {
			var sessionstatus = XHR.getResponseHeader("sessionstatus");
			if (sessionstatus == 'timeout') {
				//判定重登陆是否已经弹出
				var _rl = window.top.document.getElementById("_rl");
				if (_rl) {
					$("#rlogin_info >span").text("请输入用户名和密码");
					$("#rl_workCode").focus();
				} else {
					//显示登录弹出框
					show_relogin_page();
				}
			} else if (sessionstatus == "noPermission") {
				alert("权限受限");
			}
		}
	}
});

function search(id) {
	var options = $(id).bootstrapTable('getOptions');
	$(id).bootstrapTable('refresh', { query : queryParams({
		pageNumber : 1,
		pageSize : options.pageSize
	})});
}

$.fn.serializeNestedJson = function(flag) {
	// flag：true-表示清除空值字段
	if (pcg_fun.isEmpty(flag))
		flag = true;
	var serializeObj = {};
	var array = this.serializeArray();
	$(array).each(
			function() {
				if (this.value =='' && flag)
					return;
				if (serializeObj[this.name]) {
					if ($.isArray(serializeObj[this.name])) {
						serializeObj[this.name].push(this.value);
					} else {
						serializeObj[this.name] = [serializeObj[this.name], this.value];
					}
				} else {
					serializeObj[this.name] = this.value;
				}
			});
	return serializeObj;
};

function queryParams(params) {
	var json = $("#query_form").serializeNestedJson();
	console.log(json);
	
	if (!pcg_fun.isEmpty(params)) {
		json["pageNum"] = params.pageNumber;
		json["pageSize"] = params.pageSize;
	}
	return json;
}

function handler(result) {
	if(1 == result.code) {
		return {
			total : result.data.total,
			rows : result.data.list
		};
	} else if (0 == result.code) {
		alert(result.msg);
		return { 
			total : 0,
			rows : []
		};
	} else {
		alert(result);
		return { 
			total : 0,
			rows : []
		};
	}
}

function nonPageHandler(result) {
	if(1 == result.code) {
		return {
			rows : result.data
		};
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

function isPositive(value) {
	return /^\d+$/.test( value ) && value > 0;
}

function alreadyAuthFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return '-';
	return "Y" == value ? "是" : "N" == value ? "否" : value;
}

function indexFormat(value, row, index) {
	return index + 1;
}

function productSubjectFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var val = productSubjectMapping[value];
	return pcg_fun.isEmpty(val) ? value : val;
}

$.fn.hopu_reset = function() {
	this.find("input textarea").each(function(){
		console.log(this.val() + "----" + this.attr("value"));
	});

//	$("#generateForm select").each(function() {
//		$(this).val($(this).find("option[selected='selected']").val());
//	});
};

var deadlineFormatJson = {
		1 : "天",	
		2 : "月"	
	};
function deadlineFormat(value, row, index) {
	var str = value;
	if (!pcg_fun.isEmpty(row.deadlineType))
		str += deadlineFormatJson[row.deadlineType];
		
	return str;
}

function companyFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var v = companyMapping[value];
	if (pcg_fun.isEmpty(v))
		return value;
	return v;
}

var custTypeMapping = {
	"P" : "个人客户",
	"E" : "企业客户"
};
function custTypeFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var v = custTypeMapping[value];
	if (pcg_fun.isEmpty(v))
		return value;
	return v;
}

var genderMapping = {
		"M" : "男",
		"F" : "女"
};
function genderFormat(value, row, index) {
	if (pcg_fun.isEmpty(value))
		return "-";
	var v = genderMapping[value];
	if (pcg_fun.isEmpty(v))
		return value;
	return v;
}

