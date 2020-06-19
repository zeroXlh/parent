package org.zero.customer.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.zero.customer.model.CCustAccount;
import org.zero.customer.service.CCustAccountService;
import org.zero.customer.service.mapper.CCustAccountMapper;

@Service
public class CCustAccountServiceImpl implements CCustAccountService {

	@Autowired
	private CCustAccountMapper mapper;

	@Override
	public int add(CCustAccount custAccount) throws Exception {
		Objects.requireNonNull(custAccount);

		Optional.ofNullable(findByPhone(custAccount.getPhoneNo()))
				.orElseThrow(() -> new RuntimeException("手机号已注册：" + custAccount.getPhoneNo()));

		return mapper.insert(custAccount);
	}

	@Override
	public CCustAccount findByPrimaryKey(Integer accountId) {
		Objects.requireNonNull(accountId);
		return mapper.selectByPrimaryKey(accountId);
	}

	@Override
	public CCustAccount findByPhone(String phoneNo) {
		if (StringUtils.isEmpty(phoneNo))
			throw new NullPointerException("phoneNo为空");

		return mapper.selectByPhone(phoneNo);
	}

	@Override
	public List<CCustAccount> findByColumn(CCustAccount custAccount) {
		throw new UnsupportedOperationException("方法未实现");
	}

	@Override
	public int updateByPrimaryKey(Integer accountId, CCustAccount custAccount) throws Exception {
		Objects.requireNonNull(accountId);
		Objects.requireNonNull(custAccount);
		custAccount.setCustId(accountId);

		Optional.ofNullable(custAccount.getPhoneNo()).ifPresent((p) -> {
			Optional.ofNullable(findByPhone(p)).orElseThrow(() -> new RuntimeException("手机号已注册：" + p));
		});

		return mapper.updateByPrimaryKey(custAccount);
	}

}
