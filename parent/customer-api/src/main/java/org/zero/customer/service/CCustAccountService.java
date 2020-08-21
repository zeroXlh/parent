package org.zero.customer.service;

import java.util.List;
import java.util.Objects;

import org.zero.customer.model.CCustAccount;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

public interface CCustAccountService {
	int add(CCustAccount custAccount) throws Exception;

	CCustAccount findByPrimaryKey(Integer accountId);

	default CCustAccount obtainByPrimaryKey(Integer accountId) {
		return Objects.requireNonNull(findByPrimaryKey(accountId), "账户信息不存在,账户编号：" + accountId);
	}

	CCustAccount findByPhone(String phoneNo);

	List<CCustAccount> findByColumn(CCustAccount custAccount);

	default PageInfo<CCustAccount> page(CCustAccount custAccount, Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize, "");
		
		return new PageInfo<>(findByColumn(custAccount));
	}

	int updateByPrimaryKeySelective(Integer accountId, CCustAccount custAccount) throws Exception;

}
