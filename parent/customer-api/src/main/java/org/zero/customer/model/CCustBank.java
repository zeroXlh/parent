package org.zero.customer.model;

import java.util.Date;

import com.alibaba.fastjson.JSON;

public class CCustBank {
	private Integer bankId;

	private Integer custId;

	private String bankCode;

	private String bankInfo;

	private String accountType;

	private String establishProvince;

	private String establishCity;

	private Boolean enabled;

	private Boolean defaultUse;

	private Boolean alreadyAuth;

	private Date createTime;

	public Integer getBankId() {
		return bankId;
	}

	public void setBankId(Integer bankId) {
		this.bankId = bankId;
	}

	public Integer getCustId() {
		return custId;
	}

	public void setCustId(Integer custId) {
		this.custId = custId;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode == null ? null : bankCode.trim();
	}

	public String getBankInfo() {
		return bankInfo;
	}

	public void setBankInfo(String bankInfo) {
		this.bankInfo = bankInfo == null ? null : bankInfo.trim();
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType == null ? null : accountType.trim();
	}

	public String getEstablishProvince() {
		return establishProvince;
	}

	public void setEstablishProvince(String establishProvince) {
		this.establishProvince = establishProvince == null ? null : establishProvince.trim();
	}

	public String getEstablishCity() {
		return establishCity;
	}

	public void setEstablishCity(String establishCity) {
		this.establishCity = establishCity == null ? null : establishCity.trim();
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getDefaultUse() {
		return defaultUse;
	}

	public void setDefaultUse(Boolean defaultUse) {
		this.defaultUse = defaultUse;
	}

	public Boolean getAlreadyAuth() {
		return alreadyAuth;
	}

	public void setAlreadyAuth(Boolean alreadyAuth) {
		this.alreadyAuth = alreadyAuth;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}
}