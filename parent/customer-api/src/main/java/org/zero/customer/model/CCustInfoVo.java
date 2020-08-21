package org.zero.customer.model;

public class CCustInfoVo extends CCustInfo {
	private CCustAccount custAccount;
	
	private CCustBank custBank;

	public CCustAccount getCustAccount() {
		return custAccount;
	}

	public void setCustAccount(CCustAccount custAccount) {
		this.custAccount = custAccount;
	}

	public CCustBank getCustBank() {
		return custBank;
	}

	public void setCustBank(CCustBank custBank) {
		this.custBank = custBank;
	}
	
}
