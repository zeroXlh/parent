
layui.define(['form', 'layer','upload'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	
	form.render();
	form.on('submit(edit)', function(data){
  		var params = $("#editForm").serializeObject();
  		new RZAjax().postJson("/hoper/backweb/website/branchAddress/edit","post",params,"json",function(data){
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
	
	exports('branchAddress_edit', {});
});
