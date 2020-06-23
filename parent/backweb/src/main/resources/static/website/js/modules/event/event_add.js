
layui.define(['form', 'layer','laydate'], function(exports){
	var form = layui.form;
	var layer = layui.layer;
	var laydate = layui.laydate;
	
	//日期
	laydate.render({
		elem: '#eventTime'
	});
	
	form.render();
	form.on('submit(add)', function(data){
		//var event = $("#event").val().trim();
		//var eventTime = $("#eventTime").val();
		
  		var params = $("#addForm").serialize();
  		new RZAjax().post("/hoper/backweb/website/event/add","post",params,"json",function(data){
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
	
	exports('event_add', {});
});
