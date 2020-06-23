
layui.define(['form', 'layer','upload'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	var upload = layui.upload;
	
	upload.render({
        elem: '#uploadImg', //绑定元素
        url: '/hoper/backweb/website/file/uploadImagesOss', //上传接口
        data:'json',
        type: 'post',
        before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layer.load(); //上传loading
        },
        done: function(res){
        	layer.closeAll('loading');
        	if(res.code == 0){
            	var src = res.data.src;
            	$("#oldImg").remove();
            	layer.msg(res.msg,{icon:1,time:2000});
            	var str="<img style='padding: 5px;' src='"+res.data.src+"?x-oss-process=image/resize,m_lfit,h_100,w_120' />" +
            			"<input type='hidden' name='imgUrl' id='imgUrl' value='"+res.data.src+"'/>";
                 $("#newImg").html(str);
            }else{
            	layer.msg(res.msg,{icon:5,anim:6,time:3000});
            }
        },
        error: function(){
        	layer.closeAll('loading');
        	layer.msg("图片上传失败！请重试！",{icon:5,anim:6,time:3000});
        }
	});
	
	form.render();
	form.on('submit(edit)', function(data){
  		var params = $("#editForm").serialize();
  		new RZAjax().post("/hoper/backweb/website/style/edit","post",params,"json",function(data){
  			if(data.code==1){
				layer.msg(data.msg,{icon:1,time:2000},function(){
					x_admin_close();
					window.parent.refresh();
				});
			}else{
				layer.msg(data.msg,{icon:5,anim:6,time:3000});
			}
  		});
  		return false;
  	});
	
	exports('staffstyle_edit', {});
});
