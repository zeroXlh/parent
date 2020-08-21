package org.zero.user.model;

public class URoleAuthVo extends URoleAuth {
	private UMenuInfo menuInfo;
	
	private UOperatePermission operateAuth;

	public UMenuInfo getMenuInfo() {
		return menuInfo;
	}

	public void setMenuInfo(UMenuInfo menuInfo) {
		this.menuInfo = menuInfo;
	}

	public UOperatePermission getOperateAuth() {
		return operateAuth;
	}

	public void setOperateAuth(UOperatePermission operateAuth) {
		this.operateAuth = operateAuth;
	}

}
