package org.zero.customer.service.impl.business;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zero.customer.business.CustomerBusinessService;
import org.zero.customer.model.CCustAccount;
import org.zero.customer.model.CCustInfoVo;
import org.zero.customer.service.CCustAccountService;
import org.zero.customer.service.CCustInfoService;

@Service
public class CustomerBusinessServiceImpl implements CustomerBusinessService {

	private static Logger logger = LoggerFactory.getLogger(CustomerBusinessServiceImpl.class);

	@Autowired
	private CCustInfoService cCustInfoService;
	@Autowired
	private CCustAccountService cCustAccountService;
	// @Autowired private CCustBankService cCustInfoService;

	@Override
	@Transactional
	public int certification(CCustInfoVo custInfoVo) throws Exception {
		logger.info("custInfoVo：[{}]", custInfoVo);

		// 1、插入客户信息
		cCustInfoService.add(custInfoVo);

		// TODO
		// 2、插入银行卡信息
		
		// 3、更新客户账户信息保绑定客户
		CCustAccount account = new CCustAccount();
		// account.setAccountId();
		account.setCustId(custInfoVo.getCustId());

		return cCustAccountService.updateByPrimaryKeySelective(custInfoVo.getAccountId(), account);
	}

}
