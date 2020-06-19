package org.zero.customer.model;

public class CCustInfoVo extends CCustInfo {
	private CCustAccount custAccount;

	public CCustAccount getCustAccount() {
		return custAccount;
	}

	public void setCustAccount(CCustAccount custAccount) {
		this.custAccount = custAccount;
	}

	@Override
	public String toString() {
		return "CCustInfoVo [custAccount=" + custAccount + "]";
	}
	
}
