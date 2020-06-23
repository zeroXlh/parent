/**
 * auth权限扫描
 */

$(document).ready(function() {
	  // 在这里写你的代码...
//	console.log(authPermissions);
	scan();
});

function scan() {
	$("button[auth_permission]").each(function() {
//		console.log(this);
		var val = $(this).attr("auth_permission");
//		console.log(val);
		if (checkAuth(val))
			$(this).show();
		else
			$(this).hide();
	});
}

function checkAuth(val) {
	if (pcg_fun.isEmpty(val))
		return true;
	for (var i = 0; i < authPermissions.length; i++) {
		if (authPermissions[i] == val)
			return true;
	}
	return false;
}