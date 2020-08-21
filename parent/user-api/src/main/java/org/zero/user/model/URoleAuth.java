package org.zero.user.model;

import com.alibaba.fastjson.JSON;

public class URoleAuth extends URoleAuthKey {
    private Boolean enabled;

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