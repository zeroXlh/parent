$(function(){
	jQuery.validator.addMethod("idCardCheck", function(value, element) { 
		// 校验长度和类型
		if (!reg.test(value)) {
			return false;
		}
		// 校验省份
		if (!vcity[value.substr(0, 2)]) {
			return false;
		}
		// 校验生日
		if (!verifyBirthday(value)) {
			return false;
		} 
		// 校验校验位
		return checkParity(value);
	}, "证件号码不正确");
	
	// 此验证方法只供客户管理页面使用
	jQuery.validator.addMethod("idCardCheck_area", function(value, element, params) {
//		var certArea = $("#certArea").val();
		var certArea = $(params[0]).val();
		if ("O" == certArea) { // 港澳台通过身份证校验
			return true;
		}
		
		// 校验长度和类型
		if (!reg.test(value)) {
			return false;
		}
		// 校验省份
		if (!vcity[value.substr(0, 2)]) {
			return false;
		}
		// 校验生日
		if (!verifyBirthday(value)) {
			return false;
		} 
		// 校验校验位
		return checkParity(value);
	}, "证件号码不正确");
})

/**
 * 校验是否是正确的身份证号
 * @param v
 * @returns
 */
function checkIsId(value){
	// 校验长度和类型
	if (!reg.test(value)) {
		return false;
	}
	// 校验省份
	if (!vcity[value.substr(0, 2)]) {
		return false;
	}
	// 校验生日
	if (!verifyBirthday(value)) {
		return false;
	} 
	// 校验校验位
	return checkParity(value);
}
/**
 * 校验身份证号码
 */
// 省份串
var vcity = {
	11 : "北京",
	12 : "天津",
	13 : "河北",
	14 : "山西",
	15 : "内蒙古",
	21 : "辽宁",
	22 : "吉林",
	23 : "黑龙江",
	31 : "上海",
	32 : "江苏",
	33 : "浙江",
	34 : "安徽",
	35 : "福建",
	36 : "江西",
	37 : "山东",
	41 : "河南",
	42 : "湖北",
	43 : "湖南",
	44 : "广东",
	45 : "广西",
	46 : "海南",
	50 : "重庆",
	51 : "四川",
	52 : "贵州",
	53 : "云南",
	54 : "西藏",
	61 : "陕西",
	62 : "甘肃",
	63 : "青海",
	64 : "宁夏",
	65 : "新疆",
	71 : "台湾",
	81 : "香港",
	82 : "澳门",
	91 : "国外"
};
// 身份证长度和类型正则表达式
var reg = /(^\d{15}$)|(^\d{17}(\d{1}|X)$)/;
// 身份证15位正则：次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
var reg_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
// 18位正则：次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
var reg_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
// 身份证校验位数组
var arr_valid = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
// 身份证计算校验位的加权因子数组
var weighting = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
// 校验输入的身份证号码
/*$.extend($.fn.validatebox.defaults.rules, {
	identityCardValid : {
		validator : function(value) {
			// 校验长度和类型
			if (!reg.test(value)) {
				// alert("身份证格式不准确");
				// message = "身份证格式不准确";
				return false;
			}
			// 校验省份
			if (!vcity[value.substr(0, 2)]) {
				// alert("省份代码错误");
				// message = "省份代码错误";
				return false;
			}
			// 校验生日
			if (!verifyBirthday(value)) {
				// alert("出生年月不合理");
				return false;
			}
			// 校验校验位
			return checkParity(value);
		},
		message : '请输入有效格式的身份证号码.'
	}
});*/

// 校验身份证
checkCard = function() {
	var certCode = $("#certCode").textbox("getValue");
	// 是否为空
	/*
	 * if (!certCode) { alert('请输入身份证号，身份证号不能为空');
	 * $('#certCode').textbox('textbox').focus(); return false; }
	 */
	// 检查号码是否符合规范，包括长度，类型
	if (!reg.test(certCode)) {
		alert('您输入的身份证号码长度或类型不正确，请重新输入');
		$('#certCode').textbox('textbox').focus();
		return false;
	}
	// 检查省份
	if (!vcity[certCode.substr(0, 2)]) {
		alert('您输入的身份证号码不正确,请重新输入');
		$('#certCode').textbox('textbox').focus();
		return false;
	}
	// 校验生日
	if (!verifyBirthday(certCode)) {
		alert('您输入的身份证号码出生日期不合理,请重新输入');
		$('#certCode').textbox('textbox').focus();
		return false;
	}
	// 检验位的检测
	if (!checkParity(certCode)) {
		alert('您的身份证校验位不正确,请重新输入');
		$('#certCode').textbox('textbox').focus();
		return false;
	}
	return true;
};

// 检验出生日期
function verifyBirthday(value) {
	var arr_data, year, month, day, birthday;
	if (15 == value.length) {
		/*
		 * stringObject.match(param) param : searchString or regex对象
		 * 返回值为null或者数组；数组第一个为stringObject
		 */
		arr_data = value.match(reg_fifteen);
		if (arr_data) {
			year = arr_data[2];
			month = arr_data[3];
			day = arr_data[4];
			birthday = new Date("19" + year + "/" + month + "/" + day);
		}
	} else if (18 == value.length) {
		var arr_data = value.match(reg_eighteen);
		if (arr_data) {
			year = arr_data[2];
			month = arr_data[3];
			day = arr_data[4];
			birthday = new Date(year + "/" + month + "/" + day);
		}
	}
	if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month
			&& birthday.getDate() == day) {
		var now = new Date();
		var now_year = now.getFullYear();
		var age = now_year - age;
		if (age > 150 || age < 0) {
			// alert("年龄小于0或者大于150");
			return false;
		}
	} else {
		// alert("出生年月日不合理");
		return false;
	}
	return true;
}

// 校验校验位
function checkParity(value) {
	// 如果身份证长度为15位就转换为18位
	value = changeFivteenToEighteen(value);
	var length = value.length;
	var sum = 0, valid, i;
	if (18 == length) {
		for (i = 0; i < length - 1; i++) {
			sum += value.substr(i, 1) * weighting[i];
		}
		valid = arr_valid[sum % 11];
		if (valid == value.substr(17, 1)) {
			return true;
		} else {
			// alert("你输入的校验位不正确");
			return false;
		}
	} else {
		return false;
	}
}

// 15位转18位身份证号
function changeFivteenToEighteen(value) {
	if (15 == value.length) {
		var sum = 0, i;
		value = value.substr(0, 6) + "19" + value.substr(6, value.length - 6);
		for (i = 0; i < value.length; i++) {
			sum += value.substr(i, 1) * weighting[i];
		}
		value += arr_valid[sum % 11];
	}
	return value;
}
