/**
 * 系统主页js
 */
$(window).resize(function() {
	$("#sidebar").height($(window).height() - $("#navbar").height());
	$("div .tab-pane iframe").height($("#sidebar").height() - 60);
});

$(function() {
// 	if ("47.106.34.3" == requestHost) {
	if ("core.zcthd.com" == requestHost) {
		$('#serverHost').text('正式场');
	} else {
		$('#serverHost').text('测试场');
		
	}
	$("#sidebar").height($(window).height() - $("#navbar").height() - 40);
//	loadMenuOld();
	loadMenu();

	eval($("#menu_li_00 a").attr("href"));
	
	//设置1秒调用一次show_cur_times函数
	setInterval("show_cur_times()", 1000);
	
//	console.log(menuTree);
});

// 加载菜单树
function loadMenu() {
//	for (var i = 0; i < menuTree.length; i++) {
//		var temp = menuTree[i].menus;
//		if (temp.length > 0) {
//			for (var j = 0; j < temp.length; j++) {
//				temp[j].url = weburl + "/" + temp[j].url;
//			}
//		}
//	}

	menuTree.unshift({
		id : '0',
		text : '首页',
		icon : 'icon-cog',
		url : '',
		menus : [ {
			id : '00',
			text : '首页',
			icon : 'icon-glass',
			close : false,
			url : 'home'
		} ]
	});

	$('#menu').sidebarMenu({
		data : menuTree
	});
}

//登出
function logout() {
	location.replace("/hoper/backweb/logout");
}

//重置参数
function parametersReolad() {
	$.ajax({
		url : weburl + "/parameter/parametersReolad.do",
		data : {
			"loadType" : "ALL",
			"esbFlag" : "Y"
		},
		cache : false,
		async : true,
		dataType : "json",
		success : function(data) {
			if ("SUCC" == data) {
				alert("重置参数成功！");
			} else 
				alert("权限受限！");
		}
	});
}

function openUpdPassDialog() {
	$("#modalLabel").text("密码修改");
	$("#form input").val("");
	$('#modal').modal();
}

function updPassword() {
	if (!$("#form").valid()) {
		return;
	}
	var oldPassVal = $("#oldPassword").val();
	var passVal = $("#password").val();
	var oldPassword = hex_md5(oldPassVal).toUpperCase();
	var password = hex_md5(passVal).toUpperCase();
	jQuery.post("/hoper/backweb/jjsUserBack/updatePassword", {
		"oldPassword" : oldPassword,
		"password" : password
	}, function(data) {
		if (1 == data.code) {
			alert("密码修改成功，请重新登录");
			logout();
		} else if (0 == data.code) {
			alert(data.msg);
		} else {
			alert(data);
		}
	}, "json");
}

var updValidator = $("#form").validate({
	rules : {
		oldPassword : "required",
		password : "required",
		rePassword : {
			"required" : true,
			equalTo : "#password"
		}
	},
	messages : {
		rePassword : {
			required : "必选字段",
			equalTo : "确认密码与密码不一致"
		} 
	}
});

function getQueryString(name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var url = decodeURIComponent(window.location.href).split('?');
        var r = url[1].match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    } catch (e) {
        return null;
    }
}

function loadMenuOld() {
	
	$('#menu').sidebarMenu({
		data : [
			{
				id : '0',
				text : '首页',
				icon : 'icon-cog',
				url : '',
				menus : [ {
					id : '00',
					text : '首页',
					icon : 'icon-glass',
					close : false,
					url : 'home'
				} ]
			}, {
				id : '4',
				text : '用户系统',
				icon : 'icon-user',
				url : '',
				menus : [
					{
						id : '41',
						text : '用户管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/user/user'
					}, {
						id : '42',
						text : '角色管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/user/role'
					}, {
						id : '43',
						text : '权限管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/user/permission'
					} ]
			}, {
				id : '1',
				text : '客户管理',
				icon : 'icon-user',
				url : '',
				menus : [
					{
						id : '11',
						text : '客户管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/customer/customer'
					},{
						id : '12',
						text : '客户手机管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/customer/phone'
					}, {
						id : '13',
						text : '客户银行卡管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/customer/bank'
					} ]
			}, {
				id : '2',
				text : '产品管理',
				icon : 'icon-cog',
				url : '',
				menus : [
					{
//							id : '11',
//							text : '产品统合管理',
//							icon : 'icon-glass',
//							url : '/hoper/backweb/product/productManage'
//						}, {
						id : '21',
						text : '产品科目管理',
						icon : 'icon-glass',
						url : '/hoper/backweb/product/productSubject'
					}, {
						id : '22',
						text : '产品管理',
						icon : 'icon-glass',
						url : '/hoper/backweb/product/product'
					} ]
			}, {
				id : '3',
				text : '认购管理',
				icon : 'icon-yen',
				url : '',
				menus : [
					{
						id : '31',
						text : '认购管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/subscription/substription'
					}, {
						id : '32',
						text : '回款计划管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/plan/plan'
					}, {
						id : '33',
						text : '签章合同管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/contract/contract'
					}, {
						id : '34',
						text : '不签章合同管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/contract/nonSignContract'
					} ]
			}, {
				id : '4',
				text : '日志管理',
				icon : 'icon-yen',
				url : '',
				menus : [
					{
						id : '41',
						text : '客户信息变更日志管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/log/userLog'
					}, {
						id : '42',
						text : '银行卡信息变更日志管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/log/bankLog'
					}, {
						id : '43',
						text : '认购关联银行卡变更日志管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/log/substriptionLog'
					}, {
						id : '44',
						text : '推送数据日志管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/log/pushDataLog'
					}, {
						id : '45',
						text : '文件上传日志管理',
						icon : 'icon-glass',
						url :  '/hoper/backweb/log/uploadLog'
					} ]
// 			}, {
// 				id : '5',
// 				text : '参数管理',
// 				icon : 'icon-yen',
// 				url : '',
// 				menus : [
// 					{
// 						id : '51',
// 						text : '参数管理',
// 						icon : 'icon-glass',
// 						url :  '/hoper/backweb/param/parameter'
// 					} ]
			} 
		]
	});
}

function show_cur_times() {
	$("#showtimes").html(dateTimeFormat(new Date()));
}