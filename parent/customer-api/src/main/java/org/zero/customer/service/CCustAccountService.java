package org.zero.customer.service;

import java.util.List;
import java.util.Objects;

import org.zero.customer.model.CCustAccount;

public interface CCustAccountService {
	int add(CCustAccount custAccount) throws Exception;

	CCustAccount findByPrimaryKey(Integer accountId);

	default CCustAccount obtainByPrimaryKey(Integer accountId) {
		return Objects.requireNonNull(findByPrimaryKey(accountId), "账户信息不存在,账户编号：" + accountId);
	}

	CCustAccount findByPhone(String phoneNo);
	
	List<CCustAccount> findByColumn(CCustAccount custAccount);

	int updateByPrimaryKey(Integer accountId, CCustAccount custAccount) throws Exception;

}
