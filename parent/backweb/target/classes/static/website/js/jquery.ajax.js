
var RZAjax = function (){
	
	/**
	 * jquery ajax提交
	 * url:地址
	 * type:post/text
	 * data:serialize类型对象
	 * dataType:返回值类型  json/text
	 * callBack:成功能回调方法
	 * async:同步true,异步false
	 */
	this.post = function(url,type,data,dataType,callBack){
		var loading = layer.load(1,{shadeClose: true});
		$.ajax({
			url: url,
			async:true,
			type: type,
			data: data,
			dataType: dataType,
			timeout: 10000,
			error:function(jqXHR, textStatus, errorThrown){
				layer.close(loading);
	            if(textStatus=="timeout"){  
	  	    	  	layer.msg("服务器请求超时，请稍后再试",{icon:5,anim:6,time:3000});
	            }else{
	  	    	  	layer.msg("服务器请求失败",{icon:5,anim:6,time:3000});
	            }
	        },   
			success: function(data)
			{
				layer.close(loading);
				if(dataType == "json"){
					if(callBack!=null || callBack!=undefined)
		        	{
		        		callBack(data);
		        	}
				}else{
					if(callBack!=null || callBack!=undefined)
		        	{
		        		callBack(data);
		        	}
				}	
			}
		});
	};
	
	/**
	 * jquery ajax提交
	 * url:地址
	 * type:post/text
	 * data:hasMap类型对象
	 * dataType:返回值类型  json/text
	 * callBack:成功能回调方法
	 * async:同步true,异步false
	 */
	this.param = function(url,type,data,dataType,callBack){
		var loading = layer.load(1,{shadeClose: true});
		var param = "";
		if(data!=null && data.size()>0)
		{
			  var size = data.size();
			  for(var i=0;i<size;i++)
			  {
				  param += data.keySet()[i]+"="+data.values()[i];
				  if(i<size-1)
				  {
					  param+="&";
				  }
			  }
		}
		$.ajax({
			url: url,
			async:true,
			type: type,
			data: param,
			dataType: dataType,
			timeout: 10000,
			error:function(jqXHR, textStatus, errorThrown){
				layer.close(loading);
	            if(textStatus=="timeout"){  
	  	    	  	layer.msg("服务器请求超时，请稍后再试",{icon:5,anim:6,time:3000});
	            }else{
	  	    	  	layer.msg("服务器请求失败",{icon:5,anim:6,time:3000});
	            }
	        },   
			success: function(data)
			{
				layer.close(loading);
				if(dataType == "json"){
					if(callBack!=null || callBack!=undefined)
		        	{
		        		callBack(data);
		        	}
				}else{
					if(callBack!=null || callBack!=undefined)
		        	{
		        		callBack(data);
		        	}
				}	
			}
		});
	};
	
	this.postJson = function(url,type,data,dataType,callBack){
		var loading = layer.load(1,{shadeClose: true});
		$.ajax({
			url: url,
			async:true,
			type: type,
			data: JSON.stringify(data),
			dataType: dataType,
			contentType : 'application/json;charset=UTF-8',
			timeout: 10000,
			error:function(jqXHR, textStatus, errorThrown){
				layer.close(loading);
	            if(textStatus=="timeout"){  
	  	    	  	layer.msg("服务器请求超时，请稍后再试",{icon:5,anim:6,time:3000});
	            }else{
	  	    	  	layer.msg("服务器请求失败",{icon:5,anim:6,time:3000});
	            }
	        },   
			success: function(data)
			{
				layer.close(loading);
				if(dataType == "json"){
					if(callBack!=null || callBack!=undefined)
		        	{
		        		callBack(data);
		        	}
				}else{
					if(callBack!=null || callBack!=undefined)
		        	{
		        		callBack(data);
		        	}
				}	
			}
		});
	};
}

/**
 * 自动将form表单封装成json对象
 * data:JSON.stringify($('form').serializeObject()),
 */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function HashMap(){  
    //定义长度  
    var length = 0;  
    //创建一个对象  
    var obj = new Object();  
  
    /** 
    * 判断Map是否为空 
    */  
    this.isEmpty = function(){  
        return length == 0;  
    };  
  
    /** 
    * 判断对象中是否包含给定Key 
    */  
    this.containsKey=function(key){  
        return (key in obj);  
    };  
  
    /** 
    * 判断对象中是否包含给定的Value 
    */  
    this.containsValue=function(value){  
        for(var key in obj){  
            if(obj[key] == value){  
                return true;  
            }  
        }  
        return false;  
    };  
  
    /** 
    *向map中添加数据 
    */  
    this.put=function(key,value){  
        if(!this.containsKey(key)){  
            length++;  
        }  
        obj[key] = value;  
    };  
  
    /** 
    * 根据给定的Key获得Value 
    */  
    this.get=function(key){  
        return this.containsKey(key)?obj[key]:null;  
    };  
  
    /** 
    * 根据给定的Key删除一个值 
    */  
    this.remove=function(key){  
        if(this.containsKey(key)&&(delete obj[key])){  
            length--;  
        }  
    };  
  
    /** 
    * 获得Map中的所有Value 
    */  
    this.values=function(){  
        var _values= new Array();  
        for(var key in obj){  
            _values.push(obj[key]);  
        }  
        return _values;  
    };  
  
    /** 
    * 获得Map中的所有Key 
    */  
    this.keySet=function(){  
        var _keys = new Array();  
        for(var key in obj){  
            _keys.push(key);  
        }  
        return _keys;  
    };  
  
    /** 
    * 获得Map的长度 
    */  
    this.size = function(){  
        return length;  
    };  
  
    /** 
    * 清空Map 
    */  
    this.clear = function(){  
        length = 0;  
        obj = new Object();  
    };  
}


