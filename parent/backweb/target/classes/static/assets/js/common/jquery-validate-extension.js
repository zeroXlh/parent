/**
 * 
 */
 
 $.validator.addMethod("positive",function(value,element) {
	 return this.optional( element ) || (/^\d+$/.test( value ) && value > 0);
},"只能输入正整数");
 
 $.validator.addMethod("cert",function(value,element) {
	 return this.optional( element ) || (/^\d{17}(\d|X)$/.test( value ));
 },"证件号格式有误");
 
 $.validator.addMethod("noLessThan",function(value,element,params) {
	 var v = $(params[1]).val();
	 if (undefined == v || '' == v)
		 return true;
	 return parseFloat(value) >= parseFloat(v);
},"只能输入不小于{0}的值");

 function getUtfLength(val) {
	 var totalLength = 0;
	 var charCode;
	 for (var i = 0; i < val.length; i++) {
		 charCode = val.charCodeAt(i);
		 if (charCode < 0x007f) {
			 totalLength = totalLength + 1;
		 } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
			 totalLength += 2;
		 } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
			 totalLength += 3;
		 }
	 }
	 return totalLength;
 }
 
 $.validator.addMethod("utfminlength", function(value,element,params) {
	 return params <= getUtfLength(value);
},"请输入一个长度最小是 {0} 的字符串"); 

 $.validator.addMethod("utfmaxlength", function(value,element,params) {
	 return getUtfLength(value) <= params;
},"请输入一个长度最多是 {0} 的字符串"); 
 
 $.validator.addMethod("utfrangelength", function(value,element,params) {
	 var length = getUtfLength(value);
	 return parseInt(params[0]) <= length && length <= parseInt(params[1]);
},"请输入一个长度介于 {0} 和 {1} 之间的字符串");
 
 $.validator.addMethod("purevalue", function(value,element,params) {
	 return this.optional( element ) || /^\d+$/.test(value);
},"此数据只能为纯数值");
 
 $.validator.addMethod("bankcode", function(value,element,params) {
	 return this.optional( element ) || /^[0-9\\*-]+$/.test(value);
},"非银行卡或存折格式（只能为数值、-和*）");