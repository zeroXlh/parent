var t;
layui.define(['form','laypage', 'layer','table'], function(exports){
	var form = layui.form;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	
	//表格渲染
	t = table.render({
	    id: 'branchAddresslist',
	    elem: '#branchAddresslist',
	    method: 'post',
	    url: '/hoper/backweb/website/branchAddress/page',
	    toolbar: '#toolbar', //开启头部工具栏，并为其绑定左侧模板
	    defaultToolbar: [],
	    even:true,  //隔行变色
	    page: true,
	    limits: [10, 20, 30, 40, 50],
	    limit: 10,
	    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
	    cols: [[
	    	{ type:'numbers',title:'序号',width: 80},
	        { field: 'branch', title: '分公司',width: 200},
	        { field: 'address', title: '地址'},
	        { field: 'telephone', title: '联系电话',width: 200},
	        { field: 'order', title: '排序',width: 80},
	        { field: 'status', title: '状态',width: 100,templet:function(d){
	        	if(d.status == 1){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm layui-btn-normal\">显示</button>";
	        	}else if(d.status == 0){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm\">隐藏</button>";
	        	}
	        }},
	        { field: 'createTime', title: '创建时间' ,width: 200,sort: true,templet : "<div>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</div>"},
	        { title: '操作', fixed: 'right' ,width: 200,  toolbar: '#tableBar'}
	    ]]
	});
	
	
	
	//头工具栏事件
	table.on('toolbar(branchAddresslist)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
	    var data = checkStatus.data;
        var ids = [];
		switch(obj.event){
			case 'add':
				x_admin_show('添加分支机构','/hoper/backweb/website/branchAddress/addBranchAddressInit',650,550);
		        break;
		    default:
		    	break;
	    };
	});
	
	//监听工具条
	table.on('tool(branchAddresslist)', function(obj){
	    var data = obj.data;
	    if(obj.event === 'edit'){
	    	x_admin_show('编辑添加分支机构','/hoper/backweb/website/branchAddress/editBranchAddressInit?addressId='+data.id+'',650,550);
	    }else if(obj.event === 'del'){
	    	layer.confirm('确认要删除吗？',function(index){
	        	var param= new HashMap();
	    		param.put("addressId",data.id);
	        	new RZAjax().param("/hoper/backweb/website/branchAddress/delete","post",param,"json",function(data){
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