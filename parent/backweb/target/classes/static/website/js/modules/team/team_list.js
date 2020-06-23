var t;
layui.define(['form','laypage', 'layer','table'], function(exports){
	var form = layui.form;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	
	//表格渲染
	t = table.render({
	    id: 'teamlist',
	    elem: '#teamlist',
	    method: 'post',
	    url: '/hoper/backweb/website/team/page',
	    toolbar: '#toolbar', //开启头部工具栏，并为其绑定左侧模板
	    defaultToolbar: [],
	    even:true,  //隔行变色
	    page: true,
	    limits: [10, 20, 30, 40, 50],
	    limit: 10,
	    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
	    cols: [[
	    	{ type:'numbers',title:'序号',width: 80},
	        { field: 'teamType', title: '类型',width: 130,sort: true,templet:function(d){
	        	if(d.teamType == 1){
	        		return "总裁";
	        	}else if(d.teamType == 2){
	        		return "区域总经理";
	        	}else if(d.teamType == 3){
	        		return "分公司总经理";
	        	}
	        }},
	        { field: 'name', title: '姓名',width: 130},
	        { field: 'position', title: '职位',width: 200},
	        { field: 'photoUrl', title: '图像',width: 80,templet:function(d){
	        	return '<span onclick="x_admin_showImg(this)"><img src="'+d.photoUrl+'" lay-src="'+d.photoUrl+'" style="width: 30px;height: 30px"></span>';
	        }},
	        { field: 'profile', title: '人物简介'},
	        { field: 'order', title: '排序',width: 80},
	        { field: 'status', title: '状态',width: 100,templet:function(d){
	        	if(d.status == 1){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm layui-btn-normal\">在职</button>";
	        	}else if(d.status == 0){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm\">离职</button>";
	        	}
	        }},
	        { field: 'createTime', title: '创建时间' ,width: 200,sort: true,templet : "<div>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</div>"},
	        { title: '操作', fixed: 'right' ,width: 200,  toolbar: '#tableBar'}
	    ]]
	});
	
	
	
	//头工具栏事件
	table.on('toolbar(teamlist)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
	    var data = checkStatus.data;
        var ids = [];
		switch(obj.event){
			case 'add':
				x_admin_show('添加管理团队','/hoper/backweb/website/team/addTeamInit',680,680);
		        break;
		    default:
		    	break;
	    };
	});
	
	//监听工具条
	table.on('tool(teamlist)', function(obj){
	    var data = obj.data;
	    if(obj.event === 'edit'){
	    	x_admin_show('编辑管理团队','/hoper/backweb/website/team/editTeamInit?teamId='+data.id+'',680,700);
	    }else if(obj.event === 'del'){
	    	layer.confirm('确认要删除吗？',function(index){
	        	var param= new HashMap();
	    		param.put("teamId",data.id);
	        	new RZAjax().param("/hoper/backweb/website/team/delete","post",param,"json",function(data){
	    			if(data.code == 1){
	    				refresh();
	    				layer.msg(data.msg,{icon:1,time:2000});
	    			}else{
	    				layer.msg(data.msg,{icon:5,anim:6,time:3000});
	    			}
	        	});
	        });
	    }
	});
	exports('team_list', {});
});

function refresh(){
	t.reload();
}