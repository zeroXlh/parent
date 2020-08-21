package org.zero.customer.model;

import java.time.LocalDate;
import java.util.Date;

import com.alibaba.fastjson.JSON;

public class CCustInfo {
    private Integer custId;

    private Integer accountId;

    private String realName;

    private String certNo;

    private String certArea;

    private String custType;

    private Boolean alreadyAuth;

    private LocalDate birth;

    private String gender;

    private Integer riskEvaluatScore;

    private Boolean isStaff;

    private String introducer;

    private Integer defaultBank;

    private Date createTime;

    public Integer getCustId() {
        return custId;
    }

    public void setCustId(Integer custId) {
        this.custId = custId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    public String getCertNo() {
        return certNo;
    }

    public void setCertNo(String certNo) {
        this.certNo = certNo == null ? null : certNo.trim();
    }

    public String getCertArea() {
        return certArea;
    }

    public void setCertArea(String certArea) {
        this.certArea = certArea == null ? null : certArea.trim();
    }

    public String getCustType() {
        return custType;
    }

    public void setCustType(String custType) {
        this.custType = custType == null ? null : custType.trim();
    }

    public Boolean getAlreadyAuth() {
        return alreadyAuth;
    }

    public void setAlreadyAuth(Boolean alreadyAuth) {
        this.alreadyAuth = alreadyAuth;
    }

    public LocalDate getBirth() {
        return birth;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    public Integer getRiskEvaluatScore() {
        return riskEvaluatScore;
    }

    public void setRiskEvaluatScore(Integer riskEvaluatScore) {
        this.riskEvaluatScore = riskEvaluatScore;
    }

    public Boolean getIsStaff() {
        return isStaff;
    }

    public void setIsStaff(Boolean isStaff) {
        this.isStaff = isStaff;
    }

    public String getIntroducer() {
        return introducer;
    }

    public void setIntroducer(String introducer) {
        this.introducer = introducer == null ? null : introducer.trim();
    }

    public Integer getDefaultBank() {
        return defaultBank;
    }

    public void setDefaultBank(Integer defaultBank) {
        this.defaultBank = defaultBank;
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