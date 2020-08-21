package org.zero.user.model;

import java.util.Date;

import com.alibaba.fastjson.JSON;

public class URole {
    private String roleCode;

    private String roleName;

    private Date createTime;

    private Boolean enabled;

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode == null ? null : roleCode.trim();
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}
}