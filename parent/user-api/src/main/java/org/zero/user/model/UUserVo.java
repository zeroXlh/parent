package org.zero.user.model;

import java.util.List;

public class UUserVo extends UUser {
	private List<UMenuInfo> menuInfos;
	
	private List<UOperatePermission> operatePermissions;

	public List<UMenuInfo> getMenuInfos() {
		return menuInfos;
	}

	public void setMenuInfos(List<UMenuInfo> menuInfos) {
		this.menuInfos = menuInfos;
	}

	public List<UOperatePermission> getOperatePermissions() {
		return operatePermissions;
	}

	public void setOperatePermissions(List<UOperatePermission> operatePermissions) {
		this.operatePermissions = operatePermissions;
	}
	
}
