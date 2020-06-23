// 页面刷新跳转
function refreshto(url) {
	location.replace(url);// 跳转指定的页面
}

// 主页打开新标签页
function openNewTab(id,url,title) {
	window.parent.addTabs({
		id: id,
        url: url,
        title: title,
        close:true
    });
}

//关闭当前窗口，并打开新的窗口
function seamlessJump(closeTabId,openTabId,url,title){
	//先关闭当前窗口
	openNewTab(openTabId,url,title);
	window.parent.closeTab(closeTabId);
}

// json时间格式化
function jsonTimeFormat(value) {
	if(!pcg_fun.isEmpty(value)){
		return pcg_fun_pub.jsonDateFormat(value, "yyyy-MM-DD hh:mm:ss");
	}
	return "";
}
// json日期格式化
function jsonDateFormat(value) {
	if(!pcg_fun.isEmpty(value)){
		return pcg_fun_pub.jsonDateFormat(value, "yyyy-MM-DD");
	}
	return "";
}

//bootstrapTable序列号
function numberFormatter(value, row, index){
	return index+1;  
}
/**
 * 格式化日期
 * 
 * @param date
 *            日期
 * @returns 格式化后的日期字符串（yyyy-mm-dd）
 */
function dateFormat(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

function dateTimeFormat(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var minutes = date.getMinutes();
	var s = date.getSeconds();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + " "
			+ (h < 10 ? ("0" + h) : h) + ":"
			+ (minutes < 10 ? ("0" + minutes) : minutes) + ":"
			+ (s < 10 ? ("0" + s) : s);
}

/**
 * 将日期字符串转化成日期
 * 
 * @param dateStr
 *            日期字符串
 * @returns 转化后的日期
 */
function dateParse(dateStr){
	if(dateStr){
		var temp = [];
		temp = dateStr.split("-");
		return new Date(temp[0],temp[1]-1,temp[2]);
	} else {
		return new Date();
	}
}

/**
 * 计算相隔多少天数的日期
 * 
 * @param date
 *            需计算的日期
 * @param num
 *            相隔的天数
 * @returns 计算出来的日期
 */
function dateAdd(date,num){
	if (typeof date == 'string' )// 如果是字符串转换为日期型
	{   
		date = dateParse(date);
	}
	return new Date(Date.parse(date) + 86400000 * num);
}

/**
 * 计算两个日期之间相隔的天数（参数接受日期格式和string格式），结果取绝对值
 * 
 * @param after
 *            指定日期1
 * @param before
 *            指定日期2
 * @returns 相隔天数
 */
function dateDiff(after, before) {
	var iDays = 0;
	if (after && before) {
		if (typeof after == 'string' )// 如果是字符串转换为日期型
		{   
			after = dateParse(after);
		}
		if (typeof before == 'string' )// 如果是字符串转换为日期型
		{   
			before = dateParse(before);
		}
		iDays = parseInt((Math.abs(after - before) / 86400000), 10); // 把相差的毫秒数转换为天数
	}
	return iDays;
}

function floatFormat(value,row,index){
	if(value){
		var num = parseFloat(value, 10);
		if(!isNaN(num))
			return num.toFixed(2);
	} else if (0 == value){
		return value;
	}
	return "";
}

/**
 * 清除表单元素的值
 * 
 * @param id
 *            form表单ID
 * @returns
 */
function clearForm(id) {
	$(id).form("clear");
}

/**
 * 重置表单元素
 * 
 * @param id
 *            form表单ID
 * @returns
 */
function resetForm(id) {
	$(id).form("reset");
}

// 获取被选中的值
function getChecked(input_name) {
	var isc = "";
	$("input[name='" + input_name + "']:checked").each(function() { // 遍历全部checkbox
		isc += $(this).val() + ","; // 获取被选中的值
	});

	if (isc.length > 0) {// 如果获取到
		isc = isc.substring(0, isc.length - 1); // 把最后一个逗号去掉,string isc就是值串
	}
	// alert(isc);
	return isc;
}

// ==========定义js公共函数 对象 ==========
var pcg_fun_pub = {
	// json日期格式转换为正常格式(yyyy-MM-DD hh:mm:ss)
	jsonDateFormat : function(jsonDate, dateFormat) {
		jsonDate = '' + jsonDate;
		try {
			var patternA = /^([1-2][0-9]{3})-(([0]?[0-9])|(1[0-2]))-(([0]?[0-9])|([1-2][0-9])|(3[0-1]))(\s(([0]?[0-9])|(1[0-9])|(2[0-3]))(\:(([0]?[0-9])|([1-5][0-9]))){2})?/;

            var date ;
            if(patternA.test(jsonDate)){
            	var splitDate = jsonDate.split(/\s/);

				var leftDate = splitDate[0].split("-");
				var rightDate ;

				date = new Date(parseInt(leftDate[0]), parseInt(leftDate[1]) - 1, parseInt(leftDate[2]));

				if(splitDate.length == 2) {
                    rightDate = splitDate[1].split(":");
                    date.setHours(parseInt(rightDate[0]), parseInt(rightDate[1]), parseInt(rightDate[2]));
                }
			}else{
				date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
			}

			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1;
			var day = date.getDate() < 10 ? "0" + date.getDate() : date
					.getDate();
			var hours = date.getHours() < 10 ? "0" + date.getHours() : date
					.getHours();
			var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes()
					: date.getMinutes();
			var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds()
					: date.getSeconds();
			var milliseconds = date.getMilliseconds();

			var txt = '';
			if (dateFormat.indexOf("-") >= 0) {
				txt = date.getFullYear() + "-" + month + "-" + day
			} else if (dateFormat.indexOf("/") >= 0) {
				txt = date.getFullYear() + "/" + month + "/" + day
			}
			if (dateFormat.indexOf("hh") >= 0 || dateFormat.indexOf("HH") >= 0) {
				txt += " " + hours;
			}
			if (dateFormat.indexOf("mm") >= 0) {
				txt += ":" + minutes;
			}
			if (dateFormat.indexOf("ss") >= 0) {
				txt += ":" + seconds;// + "." +milliseconds;
			}
			return txt;
		} catch (ex) {// 出自http://www.cnblogs.com/ahjesus
			// 尊重作者辛苦劳动成果,转载请注明出处,谢谢!
			return "";
		}
	},
	// 遍历json的key和val并且给输入模型赋值
	forEachKeyVal : function(json, formId) {
		if (json == null || json == "") {
			return;
		}
		// 循环赋值
		for ( var item in json) {
			var id = $('#' + item);
			if (formId != null && formId != "") {
				id = $('#' + formId).find('#' + item);
			}
			if (id.size()) {
				if (id[0].nodeName == "SCLECT") {
					id.combobox('select', json[item]);
				} else {
					var attr = id.attr("class");
					if (attr.indexOf('easyui-datebox') >= 0) {
						id.textbox('setValue', pcg_fun_pub.jsonDateFormat(
								json[item], "yyyy/MM/dd"));
					} else if (attr.indexOf('easyui-') >= 0) {
						id.textbox('setValue', json[item]);
					} else if (attr == "Wdate") {
						id.val(pcg_fun_pub.jsonDateFormat(json[item],
								"yyyy/MM/dd"));
					} else {
						id.val(json[item]);
					}
				}
			}
		}
	},
	// json数组转字符串
	forEachKeyValToStr : function(json) {
		var txt = "["
		for (var i = 0; i < json.length; i++) {
			txt += "{"
			var jsn = json[i];
			var tx = "";
			for ( var item in jsn) {
				tx += "\"" + item + "\":\"" + jsn[item] + "\"";
				tx += ","
			}
			txt += tx.substr(0, tx.length - 1);
			txt += "}"
			if (i < json.length - 1) {
				txt += ","
			}
		}
		txt += "]"
		return txt;
	}
};

// ==========定义js加载下拉框 对象 ==========

var pcg_fun = {
	loadCommonData : function(id, data, valueField, textField, callback) {
		$(id).empty();
		var data_copy = data;
		var options = "<option value='' selected='selected'>---请选择---</option>";
		for(var i = 0;i < data_copy.length; i++){
			options += "<option value='" + data_copy[i][valueField]+ "'>" + data_copy[i][textField] + "</option>";
		}
		$(id).html(options);
		if (null != callback) {
			callback();
		}
	},
	loadCommon : function(id,url,param,valueField,textField, hasPlease){
		if (pcg_fun.isEmpty(hasPlease))
			hasPlease = true;
		jQuery.get(url, param,
		    function(data) {
		    	if (1 == data.code) {
		    		$(id).empty();
//		    	var v = JSON.parse(data.data);
		    		var v = data.data;
		    		var options = "";
		    		if (hasPlease)
		    			options += "<option value='' selected='selected'>---请选择---</option>";
		    		for(var i = 0;i < v.length;i++){
//		    			options += "<option value='" + v[i][valueField]+ "'>" + v[i][valueField]+"-"+v[i][textField] + "</option>";
		    			options += "<option value='" + v[i][valueField]+ "'>" + v[i][textField] + "</option>";
		    		}
		    		$(id).html(options);
//		    	$(id).append(options);
		    	} else {
		    		alert(id + "加载下拉框参数失败");
		    	}
		    },"json");
	},
	loadCommonSplicing : function(id,url,param,splicing,callback){
		jQuery.get(url, param,
				function(data) {
			if (1 == data.code) {
				$(id).empty();
				$(id).html(splicing(data.data));
				if (null != callback && undefined != callback)
					callback(data.data);
			} else {
				alert(id + "加载下拉框参数失败");
			}
		},"json");
	},
	// 扣款渠道
	loadChannelByPdCity : function(pid,cityCode,pdCode) {
    	var url = weburl + "/parameter/pubCascadeParametersMas/getCascadebyPdCityLists.do";
//		if(!partnerCode)
//			partnerCode = "";
		var param = {"cityCode" : cityCode, "pdCode" : pdCode};
		jQuery.get(
		    url,
		    param,
		    function(data) {
		    	$(pid).empty();
		    	var v = data;
//		    	var options = "<option></option>";
		    	var options = undefined;
		    	for(var i = 0;i < v.length;i++){
		    		options += "<option value='" + v[i].paraCode+ "'>" + v[i].paraCode+"-"+v[i].paraValue + "</option>";
		    	}
		    	
		    	$(pid).append(options);
		    		
		    },"json"
		);
		 
	},
	// 加载级联参数 上级id 下级id
	loadCascade : function(pid, id, type) {
		var url = weburl + "/parameter/pubCascadeParametersMas/pubCascadeParametersMas.do";
		var param = {
				"status" : "Y",
				"paraType" : type,
				"parentParaCode" : "",
				"pageNumber" : 1,
				"pageSize" : 10,
				"pageFlag" : "N"
		};
		_loadSelectOptions(pid,url,param);
		
		if(id){
			$(pid).change(function(){
				param.parentParaCode = $(pid).val();
				_loadSelectOptions(id,url,param);
			});
		}
	},
	// 计算工作日（ 区域编号、 起始日期、计算天数、方向 F:往前算（历史日期），B:往后算（未来日期））
	getPROGETWORKDATE : function(areaCode, beginDate, days, direction, callback) {
		if (areaCode == "" || beginDate == "" || days == null
				|| direction == "") {
			return;
		}
		JqueryAjaxGet(weburl + "/apply/getPROGETWORKDATE.do", {
			areaCode : areaCode,
			beginDate : beginDate,
			days : days,
			direction : direction
		}, function() {
		}, function(data) {
			callback(data);
		}, function() {
		});
	},
	// 获取某个合同号指定日期内未处理扣款记录数（合同号）
	getPlanAcctNoAndDateCount : function(acctNo, callback) {
		if (acctNo == "") {
			return;
		}
		JqueryAjaxGet(weburl
				+ "/payment/ap_payment/getPlanAcctNoAndDateCount.do", {
			acctNo : acctNo
		}, function() {
		}, function(data) {
			callback(data);
		}, function() {
		});
	},
	getUnhandledAcctInfo : function(acctNo, callback) {
		if (acctNo == "") {
			return;
		}
		JqueryAjaxGet(weburl + "/repaymentAccount/getUnhandledAcctInfo.do", {
			acctNo : acctNo
		}, function() {
		}, function(data) {
			callback(data);
		}, function() {
		});
	},
	isEmpty : function(val) {
		if (undefined == val || null == val || val.length == 0)
			return true;
		return false;
	}
}

// 填充表格
$.fn.populateForm = function(data){
    return this.each(function(){
        var formElem, name;
        if(data == null){this.reset(); return; }
        for(var i = 0; i < this.length; i++){  
            formElem = this.elements[i];
            // checkbox的name可能是name[]数组形式
            name = (formElem.type == "checkbox")? formElem.name.replace(/(.+)\[\]$/, "$1") : formElem.name;
            if(pcg_fun.isEmpty(data[name])) continue;
            switch(formElem.type){
                case "checkbox":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else{
                        // 数组查找元素
                        if(data[name].indexOf(formElem.value) > -1){
                            formElem.checked = true;
                        }else{
                            formElem.checked = false;
                        }
                    }
                break;
                case "radio":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else if(formElem.value == data[name]){
                        formElem.checked = true;
                    }
                break;
                case "button": break;
                case "select-one":
                	if(!pcg_fun.isEmpty(data[name])){
                		formElem.value = data[name];
                		$("#"+formElem.id).trigger("change");
                	}
                break;	
                default: formElem.value = data[name];
            }
        }
    });
};

/**
 * 部门下拉框
 */
function loadDept(id) {
	$(id).empty();
	$.ajax({
		url : weburl + "/department/getAllUDepartments.do",
		data : {
			pageFlag : "N",
			status: "N"
		},
		cache : false,
		async : false,
		dataType : "json",
		success : function(result) {
			var data = $.parseJSON(result.DATA);
			$(id).append("<option value=' ' selected> </option>");
			for (var i = 0; i < data.dataList.length; i++) {
				$(id).append(
						"<option value=" + data.dataList[i].deptCode + ">"
								+ data.dataList[i].deptName + "</option>");
			}
		},
		error : function(data) {
			alert('查询部门下拉框失败');
		}
	});
}

/**
 * 用户下拉框
 */
function loadUsers(id) {
	$(id).empty();
	$.ajax({
		url : weburl + "/user/getAllUserMas.do",
		data : {
			pageFlag : "N",
			status: "N"
		},
		cache : false,// false是不缓存，true为缓存
		async : true,// true为异步，false为同步
		dataType : "json",
		success : function(result) {
			var data = $.parseJSON(result.DATA);
			$(id).append("<option value=' ' selected> </option>");
			for (var i = 0; i < data.dataList.length; i++) {
				var workCode=data.dataList[i].workCode;
				var realname=data.dataList[i].realname;
				if(workCode){
					$(id).append("<option value=" + workCode + ">" + realname+"("+workCode+")" + "</option>");
				}
			}
		},
		error : function(data) {
			alert('查询用户下拉框失败');
		}
	});
}

/**
 * 表单JSON序列化依赖方法
 * 
 * @param jsonStr
 *            字符串
 * @param isWipe
 *            是否去除空值字段
 * @returns JSON对象
 */
function parseSerializeJson(jsonStr, isWipe) {
	if (!isWipe)
		isWipe = false;
	var json = {};
	var split = jsonStr.split("&");
	for (var i = 0; i < split.length; i++) {
		var temp = split[i];
		var fieldEndIndex = temp.indexOf("=");
		var field = temp.substring(0, fieldEndIndex);
		if (isWipe)
			if ((fieldEndIndex + 1) == temp.length)
				continue;
		var value = temp.substring(fieldEndIndex + 1, temp.length);
		
		//时间控件，内容格式为“yyyy-MM-dd hh:mm:ss”的，因为做去空格操作，导致日期和时间中间的空格被去掉，在映射bean的时候出现异常，这里把空格加上
		if(value.indexOf("-") != -1 && value.indexOf(":") != -1){
			var ymd = value.substring(0, 10);
			var hms = value.substring(10, value.length);
			value = ymd+" "+hms;
		}
		
		if (json[field])
			json[field] = json[field].concat("," + value);
		else
			json[field] = value;
	}
	return json;
}

/**
 * 表单JSON序列化
 * 
 * @param isWipe
 *            是否去除空值字段，默认false
 * @returns JSON对象
 */
$.fn._localSerializeObject = function(isWipe) {
	return parseSerializeJson(decodeURIComponent(this.serialize().replace(/\+/g," ")), isWipe);
}

/**
 * 表单序列化（已解码）
 * 
 * @returns JSON对象
 */
$.fn._localSerialize = function() {
	return decodeURIComponent(this.serialize());
}

function _loadSelectOptions(id,url,param){
	jQuery.get(
	    url,
	    param,
	    function(data) {
	    	$(id).empty();
	    	var v = eval(data.DATA);
	    	var options = "<option></option>";
	    	for(var i = 0;i < v.length;i++){
	    		options += "<option value='" + v[i].paraCode+ "'>" + v[i].paraCode+"-"+v[i].paraValue + "</option>";
	    	}
	    	
	    	$(id).append(options);
	    		
	    },"json"
	);
}

//日期控件使用bootatrap校验时，注册onfocus="_dateWithValidate(this)"事件，则bootstrap校验可以生效
//flg为Y：设置控件最大可选日期不能超过当前日期，N则不做控制
function _dateWithValidate(element,flg){ 
	var onpickedFunc = function(){
        var name = element.name;
        $('#submitForm').data('bootstrapValidator')
        .updateStatus(name, 'NOT_VALIDATED', null)
        .validateField(name);
	}

	if(flg == 'Y'){
		WdatePicker({    
			el: element,    
			autoPickDate: true,    
			dateFmt:"yyyy-MM-dd",  
			maxDate:'#F{\'%y-%M-%d\'}',
			onpicked:onpickedFunc
		}); 
	}else{
		WdatePicker({el:element,onpicked:onpickedFunc});
	}
}

//判断元素是否为空或者为undefined
function _trimValue(value){
	if($.trim(value) == '' || value == 'undefined' || value == undefined){
		return "";
	}else{
		return value;
	}
}

//序号
function indexFormatter(value, row, index) {  
	return index+1;  
}

//获取账户锁
//获取或释放用户锁（合同号,锁类型 加锁或释放锁，业务类型 ACCT，返回结果）
function _getAcctLock(acctNo,type,channel,callback){
	if (acctNo == "" || type == "" || channel == "") {
		return false;
	}
	
	JqueryAjaxGet(weburl + "/repaymentAccount/getAcctLock.do", {
		acctNo : acctNo,
		type : type,
		channel : channel
	}, function() {
	}, function(data) {
		callback(data);
	}, function() {
	});
}

//解析 将秒数解析成相关的时间格式yyyy/MM/dd 公共方法
function DateFormatter(value) {
	if (value != undefined) {
		var v = '' + value;
		return pcg_fun_pub.jsonDateFormat(v, "yyyy-MM-dd")
	}
}

//将数字转成钱的格式
function MoneyFormatter(value) {
	if (value != undefined&&value.toString().indexOf(".")==-1) {
		return '￥'+value+'.00';
	}else if(value==undefined){
		return '￥'+0+'.00';
	}else{
		return '￥'+value;
	}
}

function toDecimal(x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
} 

//计算工作日（ 区域编号、 起始日期、计算天数、方向 F:往前算（历史日期），B:往后算（未来日期））
function getPROGETWORKDATENEW(holidayArea, holidayDate, dayi, callback) {
	if (holidayArea == "" || holidayDate == "" || dayi == null
			|| dayi == "") {
		return false;
	}
	JqueryAjaxGet(weburl + "/parameter/holiday/getWorkDay.do", {
		holidayArea : holidayArea,
		holidayDate : holidayDate,
		i : dayi
	}, function() {
	}, function(data) {
		callback(data);
	}, function() {
	});
}

//将时间去掉后面的时分秒 公共方法
function DateToFormatter(value) {
	if (value != undefined) {
		return value.substring(0,10);
	}
}


$.fn.serializeJson = function(flag) {
	if (pcg_fun.isEmpty(flag))
		flag = true;
	var serializeObj = {};
	var array = this.serializeArray();
	var str = this.serialize();
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

function validateLength(str,length){
	var totalLength = 0;
	var charCode;
	for (var i = 0; i < str.length; i++) {
		charCode = str.charCodeAt(i);
		if (charCode < 0x007f) {
			totalLength = totalLength + 1;
		} else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
			totalLength += 2;
		} else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
			totalLength += 3;
		}
	}
	return totalLength <= length;
}

Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

$.fn.clearForm = function() {
//	this.find("input").each(function() {
//		$(this).val("");
//	});
	this.find("input").val("");
	this.find("select").val("");
	this.find("textarea").val("");
}

/**
 * 根据合同编号加载客户手机号码下拉框
 * @param domId
 * @param param
 * @returns
 */
function _loadCustMobiles(id,param){
	$.ajax({
		url:weburl + "/protocol/loadCustMobiles.do",
		data:{
			"contractNbr":param
		},
		type:"POST",
		cache:false,// 不缓存
		async:false,// 异步
		dataType: "json",
		success:function(data){
			if(data.RESULT == "SUCC"){
				$(id).empty();
		    	var v = eval(data.DATA);
		    	var options = "";
		    	for(var i = 0;i < v.length;i++){
		    		options += "<option value='" + v[i].contactNum+ "'>" + v[i].contactNum + "</option>";
		    	}
		    	
		    	$(id).append(options);
			}else{
				alert(data.MSG);
			}
		}
	});
}