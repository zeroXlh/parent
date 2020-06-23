var t;
layui.define(['form','laypage', 'layer','table'], function(exports){
	var form = layui.form;
	var laypage = layui.laypage;
	var layer = layui.layer;
	var table = layui.table;
	
	//表格渲染
	t = table.render({
	    id: 'newslist',
	    elem: '#newslist',
	    method: 'post',
	    url: '/hoper/backweb/website/news/page',
	    toolbar: '#toolbar', //开启头部工具栏，并为其绑定左侧模板
	    defaultToolbar: [],
	    even:true,  //隔行变色
	    page: true,
	    limits: [10, 20, 30, 40, 50],
	    limit: 10,
	    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
	    cols: [[
	    	{ type:'numbers',title:'序号',width: 80},
	    	{ field: 'type', title: '分类',width:130,templet:function(d){
	    		if(d.type == 1){
	    			return "公司动态";
	    		}else if(d.type == 2){
	    			return "投客活动";
	    		}else if(d.type == 3){
	    			return "行业资讯";
	    		}else if(d.type == 4){
	    			return "投资者教育";
	    		}
	    	}},
	        { field: 'title', title: '标题',width: 180},
	        { field: 'imgUrl', title: '图片',width: 150,templet:function(d){
	        	return '<span onclick="x_admin_showImg(this)"><img src="'+d.imgUrl+'" lay-src="'+d.imgUrl+'" ></span>';
	        }},
	        { field: 'summary', title: '摘要' ,width: 180},
	        { field: 'content', title: '内容'},
	        { field: 'linkUrl', title: '来源',width: 80},
	        { field: 'reading', title: '阅读量',width: 80},
	        { field: 'status', title: '状态',width: 80,templet:function(d){
	        	if(d.status == 1){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm layui-btn-normal\">显示</button>";
	        	}else if(d.status == 0){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm\">隐藏</button>";
	        	}
	        }},
	        { field: 'top', title: '是否置顶',width: 100,templet:function(d){
	        	if(d.top == 1){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm layui-btn-normal\">已置顶</button>";
	        	}else if(d.top == 0){
	        		return "<button type=\"button\" class=\"layui-btn layui-btn-sm\">未置顶</button>";
	        	}
	        }},
	        { field: 'createTime', title: '创建时间' ,width: 180,templet : "<div>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</div>"},
	        { title: '操作', fixed: 'right' ,width: 250,  toolbar: '#tableBar'}
	    ]]
	});
	
	form.render();
	form.on('submit(sreach)', function(data){
		var type = $("#type").find("option:selected").val();
  		var status = $("#status").find("option:selected").val();
  		//执行重载
        table.reload('newslist', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            , where: {
            	type: type,
            	status: status
            }
        });
  		return false;
  	});
	
	//头工具栏事件
	table.on('toolbar(newslist)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
	    var data = checkStatus.data;
        var ids = [];
		switch(obj.event){
			case 'add':
				x_admin_show('添加文章','/hoper/backweb/website/news/addNewsInit',950,650);
		        break;
		    default:
		    	break;
	    };
	});
	
	//监听工具条
	table.on('tool(newslist)', function(obj){
	    var data = obj.data;
	    switch(obj.event){
			case 'edit':
				x_admin_show('编辑文章','/hoper/backweb/website/news/editNewsInit?newsId='+data.id+'',950,650)
		        break;
			case 'del':
				layer.confirm('确认要删除该文章吗？',function(index){
					deleteNews(data.id);
		        });
				break;
			case 'cancelTop':
				layer.confirm('确认取消该文章置顶吗？',function(index){
		        	updateTop(data.id,0);
		        });
				break;
			case 'top':
				layer.confirm('确认要将该文章置顶吗？',function(index){
					updateTop(data.id,1);
		        });
				break;
	    };
	});
	/**
	 * 删除文章
	 */
	function deleteNews(newsId){
		var param= new HashMap();
		param.put("newsId",newsId);
    	new RZAjax().param("/hoper/backweb/website/news/delete","post",param,"json",function(data){
			if(data.code == 1){
				refresh();
				layer.msg(data.msg,{icon:1,time:2000});
			}else{
				layer.msg(data.msg,{icon:5,anim:6,time:3000});
			}
    	});
	}
	/**
	 * 修改文章置顶状态
	 */
	function updateTop(newsId,top){
		var param= new HashMap();
		param.put("newsId",newsId);
		param.put("top",top);
    	new RZAjax().param("/hoper/backweb/website/news/updateTop","post",param,"json",function(data){
			if(data.code == 1){
				refresh();
				layer.msg(data.msg,{icon:1,time:2000});
			}else{
				layer.msg(data.msg,{icon:5,anim:6,time:3000});
			}
    	});
	}
	exports('news_list', {});
});

function refresh(){
	t.reload();
}