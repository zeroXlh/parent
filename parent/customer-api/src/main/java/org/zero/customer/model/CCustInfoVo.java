package org.zero.customer.model;

public class CCustInfoVo extends CCustInfo {
	private CCustAccount custAccount;

	private Integer pageNum;
	
	private Integer pageSize;
	
	public CCustAccount getCustAccount() {
		return custAccount;
	}

	public void setCustAccount(CCustAccount custAccount) {
		this.custAccount = custAccount;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	@Override
	public String toString() {
		return "CCustInfoVo [custAccount=" + custAccount + "]";
	}
	
}
