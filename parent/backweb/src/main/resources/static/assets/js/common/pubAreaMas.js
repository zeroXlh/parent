//加载省市区信息
var proviceArray=[],cityArray=[],areaArray=[];

function _initAddrInfo(){
	//加载全部省市区信息
	$.ajax({
		url: weburl + "/parameter/provinceCityArea/queryPubAreaMas.do",
		data: {
			pageNumber : 1,
			pageSize : 10,
			pageFlag : "N"
		},
		type: "POST",
		async: false,
		dataType: "json",
		success: function (data) {
			if(data.RESULT == "SUCC"){
				//将省市区信息区分开分别放入三个对象中
				var json = eval(data.DATA)
				for(var i=0; i<json.length; i++){
					if(json[i].levelCode == "1"){
						var proviceMap = {};
						proviceMap["areaCode"]=json[i].areaCode;
						proviceMap["areaDesc"]=json[i].areaDesc;
						proviceMap["levelCode"]=json[i].levelCode;
						proviceMap["parentCode"]=json[i].parentCode;
						
						proviceArray.push(proviceMap);
					}else if(json[i].levelCode == "2"){
						var cityMap = {};
						cityMap["areaCode"]=json[i].areaCode;
						cityMap["areaDesc"]=json[i].areaDesc;
						cityMap["levelCode"]=json[i].levelCode;
						cityMap["parentCode"]=json[i].parentCode;
						
						cityArray.push(cityMap);
					}else if(json[i].levelCode == "3"){
						var areaMap = {};
						areaMap["areaCode"]=json[i].areaCode;
						areaMap["areaDesc"]=json[i].areaDesc;
						areaMap["levelCode"]=json[i].levelCode;
						areaMap["parentCode"]=json[i].parentCode;
						
						areaArray.push(areaMap);
					}
				}
				
				/*$.cookie('proviceArray', $(proviceArray).stringify(), { path: "/"});
				$.cookie('cityArray', $(cityArray).stringify(), { path: "/"});
				$.cookie('areaArray', $(areaArray).stringify(), { path: "/"});*/
			}
		}
	});
}

function _loadAddrInfo(pid,cid,aid){
	
	//先判断全局变量中是否存在
	if(proviceArray.length == 0){
		/* //从cookie中获取
		if($.cookie('proviceArray') == undefined || $.cookie('proviceArray') == 'undefined'){
			//从后台获取
			_initAddrInfo()
		}else{
			proviceArray = JSON.parse($.cookie('proviceArray'));
			
			//防止有人手动清除缓存
			if(proviceArray == undefined || proviceArray.length == 0){
				_initAddrInfo();
			}
		} */
		_initAddrInfo();
	}
	//省级赋值
	$(pid).empty();
	var provOption = "<option></option>";
	$.each(proviceArray, function (k, p) {
		provOption += "<option value='" + p.areaCode + "'>" + p.areaDesc + "</option>";
	});
	$(pid).append(provOption);
	
	
	//省级选择
	$(pid).change(function () {
		if(cityArray.length == 0){
			/* //从cookie中获取
			if($.cookie('cityArray') == undefined || $.cookie('cityArray') == 'undefined'){
				//从后台获取
				_initAddrInfo();
			}else{
				cityArray = JSON.parse($.cookie('cityArray'));
				//防止有人手动清除缓存
				if(cityArray == undefined || cityArray.length == 0){
					_initAddrInfo();
				}
			} */
			_initAddrInfo();
		}
		
		var selValue = $(this).val();
		$(cid).empty();
		var cityOption = "<option></option>";
		$.each(cityArray, function (k, p) {
			if (p.parentCode == selValue) {
				cityOption += "<option value='" + p.areaCode + "'>" + p.areaDesc + "</option>";
			}
		});
		$(cid).append(cityOption);
		
		//同时将区的值也设置为空
		if(aid != null && aid != undefined){
			$(aid).empty();
		}
	});

	//市级选择
	$(cid).change(function () {
		if(areaArray.length == 0){
			/* //从cookie中获取
			if($.cookie('areaArray') == undefined || $.cookie('areaArray') == 'undefined'){
				//从后台获取
				_initAddrInfo();
			}else{
				areaArray = JSON.parse($.cookie('areaArray'));
				//防止有人手动清除缓存
				if(areaArray == undefined || areaArray.length == 0){
					_initAddrInfo();
				}
			} */
			_initAddrInfo();
		}
		var selValue = $(this).val();
		$(aid).empty();
		var areaOption = "<option></option>";
		$.each(areaArray, function (k, p) {
			if (p.parentCode == selValue) {
				areaOption += "<option value='" + p.areaCode + "'>" + p.areaDesc + "</option>";
			}
		});
		$(aid).append(areaOption);
	});
}

//地址编码转换地址描述
function _addrFormat(areaCode){
	
	var addr;
	var endFlg = false;
	
	if(proviceArray.length == 0){
		/*//从session中获取
		if($.cookie('proviceArray') == undefined || $.cookie('proviceArray') == 'undefined'){
			//从后台获取
			_initAddrInfo()
		}else{
			proviceArray = JSON.parse($.cookie('proviceArray'));
			
			//防止有人手动清除缓存
			if(proviceArray == undefined || proviceArray.length == 0){
				_initAddrInfo();
			}
		}*/
		_initAddrInfo();
	}
	
	$.each(proviceArray, function (k, p) {
		if(p.areaCode == areaCode){
			addr = p.areaDesc;
			endFlg = true;
			return false;
		}
	});
	
	if(endFlg){
		return addr;
	}
	
	if(cityArray.length == 0){
		/* //从session中获取
		if($.cookie('cityArray') == undefined || $.cookie('cityArray') == 'undefined'){
			//从后台获取
			_initAddrInfo()
		}else{
			cityArray = JSON.parse($.cookie('cityArray'));
			
			//防止有人手动清除缓存
			if(cityArray == undefined || cityArray.length == 0){
				_initAddrInfo();
			}
		} */
		_initAddrInfo();
	}
	
	$.each(cityArray, function (k, p) {
		if(p.areaCode == areaCode){
			addr = p.areaDesc;
			endFlg = true;
			return false;
		}
	});
	
	
	if(endFlg){
		return addr;
	}
	
	if(areaArray.length == 0){
		/* //从session中获取
		if($.cookie('areaArray') == undefined || $.cookie('areaArray') == 'undefined'){
			//从后台获取
			_initAddrInfo()
		}else{
			areaArray = JSON.parse($.cookie('areaArray'));
			
			//防止有人手动清除缓存
			if(areaArray == undefined || areaArray.length == 0){
				_initAddrInfo();
			}
		} */
		_initAddrInfo();
	}
	$.each(areaArray, function (k, p) {
		if(p.areaCode == areaCode){
			addr = p.areaDesc;
			endFlg = true;
			return false;
		}
	});
	
	if(endFlg){
		return addr;
	}
}