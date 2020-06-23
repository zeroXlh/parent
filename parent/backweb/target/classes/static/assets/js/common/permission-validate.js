/**
 * 判断用户是否有相关操作权限，有权限则显示按钮，没权限则不显示按钮
 * 该方法适用于全部页面，使用时，需要先引入当前js，然后给需要进行校验的元素加上LOSAccess属性
 */

$(function(){
	//获取全部需要校验的元素，拿到其权限标志
	var totalAccess = $('*[LOSAccess]');
	$('*[LOSAccess]').each(function(){
		if (accessPermission.indexOf($(this).attr('LOSAccess')) != -1)
			$(this).show();
		else
			$(this).hide();
	});
	
	/**
	 * LOSAccessList中有一个匹配就显示按钮
	 */
	$('*[LOSAccessList]').each(function(){
		var strs= new Array();
		var LOSAccessList=$(this).attr('LOSAccessList');
		strs=LOSAccessList.split(",");
		var showFlg=false;
		for (i=0;i<strs.length ;i++ ){
			if (accessPermission.indexOf(strs[i]) != -1){
				showFlg=true;
				break;
			}else
				showFlg=false;
		}
		if(showFlg){
			$(this).show();
		}else{
			$(this).hide();
		}
	})
	
	
})

/**
 * 适用于table加载操作按钮时的情况，调用该方法，传入操作按钮对应的权限编码，返回true，则显示按钮，否则隐藏按钮
 * @param permissionIdentification
 * @returns
 */
function checkAccess(permissionIdentification) {
	return accessPermission.indexOf(permissionIdentification) != -1;
}

function checkAccessAndShow(id, permissionIdentification) {
	var v = checkAccess(permissionIdentification);
	$(id).attr("disabled", !v);
	return v;
}