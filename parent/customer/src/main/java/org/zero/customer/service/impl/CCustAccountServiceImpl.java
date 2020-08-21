package org.zero.customer.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.component.utils.StringUtils;
import org.zero.customer.model.CCustAccount;
import org.zero.customer.service.CCustAccountService;
import org.zero.customer.service.mapper.CCustAccountMapper;

@Service
public class CCustAccountServiceImpl implements CCustAccountService {

	@Autowired
	private CCustAccountMapper mapper;

	@Override
	@Transactional
	public int add(CCustAccount custAccount) throws Exception {
		Objects.requireNonNull(custAccount);

		if (Objects.nonNull(findByPhone(custAccount.getPhoneNo())))
			throw new RuntimeException("手机号已注册：" + custAccount.getPhoneNo());

		return mapper.insertSelective(custAccount);
	}

	@Override
	public CCustAccount findByPrimaryKey(Integer accountId) {
		Objects.requireNonNull(accountId);
		return mapper.selectByPrimaryKey(accountId);
	}

	@Override
	public CCustAccount findByPhone(String phoneNo) {
		StringUtils.requireNonEmpty(phoneNo);

		return mapper.selectByPhone(phoneNo);
	}

	@Override
	public List<CCustAccount> findByColumn(CCustAccount custAccount) {
		throw new UnsupportedOperationException("方法未实现");
	}

	@Override
	@Transactional
	public int updateByPrimaryKeySelective(Integer accountId, CCustAccount custAccount) throws Exception {
		Objects.requireNonNull(accountId);
		Objects.requireNonNull(custAccount);
		custAccount.setCustId(accountId);

		return mapper.updateByPrimaryKey(custAccount);
	}

}
